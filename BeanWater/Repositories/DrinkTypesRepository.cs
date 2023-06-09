using Microsoft.Extensions.Hosting;
using BeanWater.Models;
using BeanWater.Utils;
namespace BeanWater.Repositories
{
    public class DrinkTypesRepository : BaseRepository, IDrinkTypesRepository
    {
        public DrinkTypesRepository(IConfiguration configuration) : base(configuration) { }

        public List<DrinkTypes> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    SELECT Id, Type
                    FROM DrinkTypes";
                    var reader = cmd.ExecuteReader();

                    var type = new List<DrinkTypes>();
                    while (reader.Read())
                    {
                        type.Add(new DrinkTypes()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type")
                        });
                    }
                    reader.Close();

                    return type;
                }
            }
        }
    }
}
