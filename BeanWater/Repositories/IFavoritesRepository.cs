using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IFavoritesRepository
    {
        void Add(AddFavorite favorites);
        void Delete(int id);
        List<Favorites> GetAll(string uId);
    }
}