using Microsoft.AspNetCore.Mvc;
using BeanWater.Repositories;
using BeanWater.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeanWater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToolsController : ControllerBase
    {
        private readonly IToolsRepository _toolsRepository;
        public ToolsController(IToolsRepository toolsRepository)
        {
            _toolsRepository = toolsRepository;
        }
        // GET: api/<ToolsController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_toolsRepository.GetAll());
        }

        // GET api/<ToolsController>/5
        [HttpGet("id/{id}")]
        public IActionResult GetToolsByDrinkId(int id)
        {
            var tools = _toolsRepository.GetToolsByDrinkId(id);
            if (tools == null)
            {
                return NotFound();
            }
            return Ok(tools);
        }

        // POST api/<ToolsController>
        [HttpPost]
        public IActionResult Post(Tools tool)
        {
            _toolsRepository.Add(tool);
            return CreatedAtAction("Get", new { id = tool.Id }, tool);
        }

        // PUT api/<ToolsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Tools tool)
        {
            if (id != tool.Id)
            {
                return BadRequest();
            }
            _toolsRepository.Update(tool);
            return NoContent();
        }

        // DELETE api/<ToolsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _toolsRepository.Delete(id);
            return NoContent();
        }
    }
}
