using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IUsersRepository
    {
        void Add(Users users);
        void Delete(int id);
        List<Users> GetAll();
        Users GetUserById(int id);
        void Update(Users user);
    }
}