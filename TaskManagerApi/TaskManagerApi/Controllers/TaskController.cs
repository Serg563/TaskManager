using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using TaskManagerApi.Models;
using System.Net;
using TaskManagerApi.Data;
using TaskManagerApi.Entities;
using TaskManagerApi.Models;
using TaskManagerApi.Models.DevTask;
using Microsoft.EntityFrameworkCore;

namespace TaskManagerApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly TaskManagerContext _context;
        private readonly ApiResponse _apiResponse;
        private readonly IMapper _mapper;
        public TaskController(TaskManagerContext context, ApiResponse apiResponse, IMapper mapper)
        {
            _context = context;
            _apiResponse = apiResponse;
            _mapper = mapper;
        }

        [HttpGet("GetDevTasksPagination")]
        public async Task<IActionResult> GetProductsPagination(int page = 1, int pageSize = 5)
        {
            var allproducts = await _context.DevTasks.ToListAsync();

            var totalItems = allproducts.Count();
            var totalPages = (int)Math.Ceiling(totalItems / (double)pageSize);

            var products = allproducts
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                Products = products,
                Pagination = new
                {
                    Page = page,
                    PageSize = pageSize,
                    TotalItems = totalItems,
                    TotalPages = totalPages
                }
            };

            return Ok(response);
        }

        [HttpGet("GetAllDevTask")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllDevTask()
        {
            return Ok(_context.DevTasks.ToList());
        }

        [HttpGet("GetAllDevTaskByUserId/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> GetAllDevTaskByUserId(string userId)
        {
            var res = await _context.DevTasks.Where(x => x.UserId == userId).ToListAsync();
            return Ok(res);
        }

        [HttpPost("AddDevTask/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> AddDevTask(string userId,[FromBody] AddDevTaskDTO addTask)
        {
            ApplicationUser user = _context.ApplicationUsers
              .FirstOrDefault(x => x.Id.ToLower() == userId.ToLower());
            if (user == null)
            {
                _apiResponse.StatusCode = HttpStatusCode.NotFound;
                _apiResponse.IsSuccess = false;
                return NotFound(_apiResponse);
            }
            //DevTask devTask = new DevTask();
            var mapper = _mapper.Map<DevTask>(addTask);
            mapper.UserId = user.Id;
            var res = await _context.DevTasks.AddAsync(mapper);
            await _context.SaveChangesAsync();
            if (res == null)
            {
                _apiResponse.StatusCode = HttpStatusCode.BadRequest;
                _apiResponse.IsSuccess = false;
                return BadRequest(_apiResponse);
            }
            _apiResponse.StatusCode = HttpStatusCode.OK;
            _apiResponse.IsSuccess = true;
            return Ok(_apiResponse);
        }


        [HttpPut("UpdateDevTask/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> UpdateDevTask(int id, [FromBody] UpdateDevTaskDTO updateDTO)
        {
            var task = await _context.DevTasks.FindAsync(id);

            if(task == null)
            {
                _apiResponse.StatusCode = HttpStatusCode.NotFound;
                _apiResponse.IsSuccess = false;
                return NotFound(_apiResponse);
            }

            if (!string.IsNullOrEmpty(updateDTO.Title))
            {
                task.Title = updateDTO.Title;
            }
            if (!string.IsNullOrEmpty(updateDTO.Description))
            {
                task.Description = updateDTO.Description;
            }
            if (updateDTO.Duration != null && updateDTO.Duration != 0)
            {
                task.Duration = updateDTO.Duration;
            }
            _context.DevTasks.Update(task);
            await _context.SaveChangesAsync();

            _apiResponse.StatusCode = HttpStatusCode.OK;
            _apiResponse.IsSuccess = true;
            return Ok(_apiResponse);
        }

        [HttpDelete("DeleteDevTask/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> DeleteDevTask(int id)
        {
            var res = await _context.DevTasks.FindAsync(id);
            if(res == null)
            {
                _apiResponse.StatusCode = HttpStatusCode.NotFound;
                _apiResponse.IsSuccess = false;
                return NotFound(_apiResponse);
            }

            var remove = _context.DevTasks.Remove(res);
            await _context.SaveChangesAsync();
            _apiResponse.StatusCode = HttpStatusCode.OK;
            _apiResponse.IsSuccess = true;
            return Ok(_apiResponse);
        }
    }
}
