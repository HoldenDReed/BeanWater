using Microsoft.AspNetCore.Mvc;
using BeanWater.Repositories;
using BeanWater.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeanWater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_usersRepository.GetAll());
        }

        // GET api/<UsersController>/5
        [HttpGet("id/{id}")]
        public IActionResult GetUserById(int id)
        {
            var user = _usersRepository.GetUserById(id);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }
        [HttpGet("uid/{uid}")]
        public IActionResult GetUserByUid(string uid)
        {
            var user = _usersRepository.GetUserByUid(uid);
            if (user == null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post(Users user)
        {
            _usersRepository.Add(user);
            return CreatedAtAction("Get", new { id = user.Id }, user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Users user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }
            _usersRepository.Update(user);
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _usersRepository.Delete(id);
            return NoContent();
        }
    }
}
