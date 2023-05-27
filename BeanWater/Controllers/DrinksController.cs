using Microsoft.AspNetCore.Mvc;
using BeanWater.Repositories;
using BeanWater.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeanWater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinksController : ControllerBase
    {
        private readonly IDrinksRepository _drinksRepository;
        public DrinksController(IDrinksRepository drinksRepository)
        {
            _drinksRepository = drinksRepository;
        }
        // GET: api/<DrinksController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_drinksRepository.GetAll());
        }

        // GET api/<DrinksController>/5
        [HttpGet("id/{id}")]
        public IActionResult GetDrinkById(int id)
        {
            var drink = _drinksRepository.GetDrinkById(id);
            if (drink == null)
            {
                return NotFound();
            }
            return Ok(drink);
        }

        // POST api/<DrinksController>
        [HttpPost]
        public IActionResult Post(Drinks drink)
        {
            _drinksRepository.Add(drink);
            return CreatedAtAction("Get", new { id = drink.Id }, drink);
        }

        // PUT api/<DrinksController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, Drinks drink)
        {
            if (id != drink.Id)
            {
                return BadRequest();
            }
            _drinksRepository.Update(drink);
            return NoContent();
        }

        // DELETE api/<DrinksController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _drinksRepository.Delete(id);
            return NoContent();
        }
    }
}
