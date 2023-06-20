using BeanWater.Models;

namespace BeanWater.Repositories
{
    public interface IUsersRepository
    {
        void Add(Users users);
        void Delete(int id);
        List<Users> GetAll();
        Users GetUserById(int id);
        Users GetUserByUid(string uid);
        void Update(Users user);
    }
}