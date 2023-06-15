using Microsoft.AspNetCore.Mvc;
using BeanWater.Repositories;
using BeanWater.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeanWater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly IFavoritesRepository _favoritesRepository;
        public FavoritesController(IFavoritesRepository favoritesRepository)
        {
            _favoritesRepository = favoritesRepository;
        }
        // GET: api/<FavoritesController>
        [HttpGet]
        public IActionResult Get(string uId)
        {
            return Ok(_favoritesRepository.GetAll(uId));
        }

        //[HttpGet]
        //public IActionResult Get(string uId, int id)
        //{
        //    return Ok(_favoritesRepository.GetByDrinkAndUid(uId, id));
        //}

        // POST api/<FavoritesController>
        [HttpPost]
        public IActionResult Post(AddFavorite drink)
        {
            _favoritesRepository.Add(drink);
            return CreatedAtAction("Get", new { id = drink.Id }, drink);
        }

        //DELETE api/<FavoritesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _favoritesRepository.Delete(id);
            return NoContent();
        }
    }
}
