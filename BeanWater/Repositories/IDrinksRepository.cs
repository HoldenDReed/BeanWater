using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IDrinksRepository
    {
        void Add(Drinks drink);
        void Delete(int id);
        List<Drinks> GetAll();
        Drinks GetDrinkById(int id);
        void Update(Drinks drink);
    }
}