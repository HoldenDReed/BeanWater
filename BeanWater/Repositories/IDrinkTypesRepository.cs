using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IDrinkTypesRepository
    {
        List<DrinkTypes> GetAll();
    }
}