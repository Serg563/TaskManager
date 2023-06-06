using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SportsStore.Models;
using SportsStore;
using System.Net;
using TaskManagerApi.Data;
using AutoMapper;
using TaskManagerApi.Models;
using TaskManagerApi.Models.Developer;

namespace TaskManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeveloperController : ControllerBase
    {
        private readonly TaskManagerContext _context;
        private readonly ApiResponse _apiResponse;
        private readonly IMapper _mapper;
        private readonly UserManager<ApplicationUser> _userManager;
        public DeveloperController(TaskManagerContext context, ApiResponse apiResponse,IMapper mapper, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _apiResponse = apiResponse;
            _mapper = mapper;
            _userManager = userManager;
        }

        [HttpGet("GetAllUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _context.ApplicationUsers.ToListAsync();
            return Ok(users);
        }

        [HttpPost("AddDeveloper")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddDeveloper([FromBody] AddDeveloperDTO developerDTO)
        {
            ApplicationUser developer = _context.ApplicationUsers
                .FirstOrDefault(x => x.UserName.ToLower() == developerDTO.DeveloperName.ToLower());
            if (developer != null) 
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Developer already exist");
                return BadRequest(_apiResponse);
            }
            try
            {
                var mapped = _mapper.Map<ApplicationUser>(developerDTO);
                var res = await _userManager.CreateAsync(mapped, developerDTO.Password);
                if (res.Succeeded)
                {                 
                    await _userManager.AddToRoleAsync(mapped, SD.Role_Developer);   
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
            _apiResponse.ErrorMessages.Add("Error");
            return BadRequest(_apiResponse);
        }

        [HttpPut("UpdateDeveloper/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateDeveloper(string id, [FromBody] UpdateDeveloperDTO updateDTO)
        {
            ApplicationUser developer = await _context.ApplicationUsers.FindAsync(id);
            
            if (developer == null)
            {
                return NotFound();
            }

            var mapped = _mapper.Map(updateDTO, developer);
            if (!string.IsNullOrEmpty(updateDTO.Password))
            {
                mapped.PasswordHash = _userManager.PasswordHasher.HashPassword(mapped, updateDTO.Password);
            }

            var result = await _userManager.UpdateAsync(mapped);

            if (!result.Succeeded)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Error");
                return BadRequest(_apiResponse);
            }
            _apiResponse.StatusCode = HttpStatusCode.OK;
            _apiResponse.IsSuccess = true;
            return Ok(_apiResponse);

        }


        [HttpDelete("DeleteDeveloper/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDeveloper(string id)
        {
            ApplicationUser developer = await _context.ApplicationUsers.FindAsync(id);

            if (developer == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(developer);

            if (!result.Succeeded)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                _apiResponse.ErrorMessages.Add("Error");
                return BadRequest(_apiResponse);
            }

            _apiResponse.StatusCode = HttpStatusCode.OK;
            _apiResponse.IsSuccess = true;
            return Ok(_apiResponse);
        }

    }
}
