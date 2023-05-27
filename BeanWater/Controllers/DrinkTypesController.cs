using Microsoft.AspNetCore.Mvc;
using BeanWater.Models;
using BeanWater.Repositories;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BeanWater.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DrinkTypesController : ControllerBase
    {
        private readonly IDrinkTypesRepository _drinkTypesRepository;
        public DrinkTypesController(IDrinkTypesRepository drinkTypesRepository)
        {
            _drinkTypesRepository = drinkTypesRepository;
        }
        // GET: api/<DrinkTypesController>
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_drinkTypesRepository.GetAll());
        }

    }
}