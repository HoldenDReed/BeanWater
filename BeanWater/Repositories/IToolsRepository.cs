using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IToolsRepository
    {
        void Add(Tools tool);
        void Delete(int id);
        List<Tools> GetAll();
        List<Tools> GetToolsByDrinkId(int id);
        void Update(Tools tool);
    }
}