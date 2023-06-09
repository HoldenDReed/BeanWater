using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IDrinksRepository
    {
        void Add(Drinks drink);
        void Delete(int id);
        List<Drinks> GetAll();
        List<Drinks> GetAllDrinksByType(int id);
        Drinks GetDrinkById(int id);
        void Update(Drinks drink);
    }
}