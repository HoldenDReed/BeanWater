using Microsoft.Extensions.Hosting;
using BeanWater.Models;
using BeanWater.Utils;

namespace BeanWater.Repositories
{
    public class UsersRepository : BaseRepository, IUsersRepository
    {
        public UsersRepository(IConfiguration configuration) : base(configuration) { }

        public List<Users> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id,
                    Email, 
                    displayName, 
                    uid
                    FROM users";
                    var reader = cmd.ExecuteReader();

                    var users = new List<Users>();
                    while (reader.Read())
                    {
                        users.Add(new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            displayName = DbUtils.GetString(reader, "displayName"),
                            Uid = DbUtils.GetString(reader, "uid"),
                            Email = DbUtils.GetString(reader, "Email")
                        });
                    }
                    reader.Close();
                    return users;
                }
            }
        }

        public Users GetUserById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id,
                    Email, 
                    displayName, 
                    uid
                    FROM users
                    WHERE users.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Users user = null;
                    if (reader.Read())
                    {
                        user = new Users()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            displayName = DbUtils.GetString(reader, "displayName"),
                            Uid = DbUtils.GetString(reader, "uid"),
                            Email = DbUtils.GetString(reader, "Email")
                        };
                    }
                    reader.Close();
                    return user;
                }
            }
        }
        public void Add(Users users)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Users (displayName, uid, Email)
                        OUTPUT INSERTED.ID
                        VALUES (@displayName, @uid, @Email)";
                    DbUtils.AddParameter(cmd, "@displayName", users.displayName);
                    DbUtils.AddParameter(cmd, "@uid", users.Uid);
                    DbUtils.AddParameter(cmd, "@Email", users.Email);

                    users.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Users user)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Drinks
                           SET displayName = @displayName,
                               uid = @uid,
                               Email = @Email,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@displayName", user.displayName);
                    DbUtils.AddParameter(cmd, "@uid", user.Uid);
                    DbUtils.AddParameter(cmd, "@Email", user.Email);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Users WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
