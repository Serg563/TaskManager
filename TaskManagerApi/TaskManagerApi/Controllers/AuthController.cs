using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using TaskManagerApi.Models;
using TaskManagerApi;
using System.IdentityModel.Tokens.Jwt;
using System.Net;
using System.Security.Claims;
using System.Text;
using TaskManagerApi.Data;
using Microsoft.EntityFrameworkCore;
using TaskManagerApi.Entities;

namespace TaskManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        readonly RoleManager<IdentityRole> _rolemanager;
        readonly UserManager<ApplicationUser> _usermanager;
        private readonly TaskManagerContext _context;
        private readonly ApiResponse _apiResponse;
        private readonly IMapper _mapper;
        private string sercretkey;
        public AuthController(RoleManager<IdentityRole> role, UserManager<ApplicationUser> user,
            TaskManagerContext context, ApiResponse apiResponse, IMapper mapper, IConfiguration conf)
        {
            _rolemanager = role;
            _usermanager = user;
            _context = context;
            _apiResponse = apiResponse;
            _mapper = mapper;
            sercretkey = conf.GetValue<string>("ApiSettings:Secret");
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Register([FromBody] RegisterRequestDTO requestDTO)
        {
            ApplicationUser user = _context.ApplicationUsers
                .FirstOrDefault(x => x.UserName.ToLower() == requestDTO.UserName.ToLower());
            if (user != null)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("User already exist");
                return BadRequest(_apiResponse);
            }
            try
            {
                var mapped = _mapper.Map<ApplicationUser>(requestDTO);
                var res = await _usermanager.CreateAsync(mapped, requestDTO.Password);
                if (res.Succeeded)
                {
                    if (!await _rolemanager.RoleExistsAsync(SD.Role_Developer))
                    {
                        await _rolemanager.CreateAsync(new IdentityRole(SD.Role_Developer));

                    }
                    if (!await _rolemanager.RoleExistsAsync(SD.Role_Admin))
                    {
                        await _rolemanager.CreateAsync(new IdentityRole(SD.Role_Admin));
                        await _rolemanager.CreateAsync(new IdentityRole(SD.Role_Developer));
                    }
                    if (requestDTO.Role == SD.Role_Admin)
                    {
                        await _usermanager.AddToRoleAsync(mapped, SD.Role_Admin);
                    }
                    else if (requestDTO.Role == SD.Role_Developer)
                    {
                        await _usermanager.AddToRoleAsync(mapped, SD.Role_Developer);
                    }
                    _apiResponse.StatusCode = HttpStatusCode.OK;
                    _apiResponse.IsSuccess = true;
                    return Ok(_apiResponse);
                }
            }
            catch (Exception)
            {

            }
            _apiResponse.StatusCode = HttpStatusCode.BadRequest;
            _apiResponse.IsSuccess = false;
            _apiResponse.ErrorMessages.Add("Register Error");
            return BadRequest(_apiResponse);
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> Login([FromBody] LoginRequestDTO requestDTO)
        {
            ApplicationUser user = await _context.ApplicationUsers
                .FirstOrDefaultAsync(x => x.UserName.ToLower() == requestDTO.UserName.ToLower());
            bool isValid = await _usermanager.CheckPasswordAsync(user, requestDTO.Password);

            if (!isValid)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("password is wrong");
                return BadRequest(_apiResponse);
            }

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.ASCII.GetBytes(sercretkey);
            var role = await _usermanager.GetRolesAsync(user);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor()
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim("fullname",user.Name),
                    new Claim("id", user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                    new Claim(ClaimTypes.Role, role.FirstOrDefault()),
                }),
                Expires = DateTime.UtcNow.AddDays(5),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken token = tokenHandler.CreateToken(tokenDescriptor);

            LoginResponseDTO loginResponse = new LoginResponseDTO()
            {
                Email = user.Email,
                Token = tokenHandler.WriteToken(token)
            };
            if (loginResponse == null || string.IsNullOrEmpty(loginResponse.Token))
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("UserName or Password is incorrect");
                return BadRequest(_apiResponse);
            }
            _apiResponse.StatusCode = HttpStatusCode.OK;
            _apiResponse.IsSuccess = true;
            _apiResponse.Result = loginResponse;
            return Ok(_apiResponse);
        }
    }
}
