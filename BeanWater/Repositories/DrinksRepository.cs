using Microsoft.Extensions.Hosting;
using BeanWater.Models;
using BeanWater.Utils;

namespace BeanWater.Repositories
{
    public class DrinksRepository : BaseRepository, IDrinksRepository
    {
        public DrinksRepository(IConfiguration configuration) : base(configuration) { }

        public List<Drinks> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                    drinks.Id as Id, 
                    drinksImg as Img, 
                    Name, 
                    Recipe, 
                    DT.Type as Type
                    FROM drinks
                    join drinkTypes as DT on DT.Id = drinks.drinkTypesId";
                    var reader = cmd.ExecuteReader();

                    var drinks = new List<Drinks>();
                    while (reader.Read())
                    {
                        drinks.Add(new Drinks()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DrinksImg = DbUtils.GetString(reader, "Img"),
                            Recipe = DbUtils.GetString(reader, "Recipe"),
                            DrinkType = DbUtils.GetString(reader, "Type"),
                        });
                    }
                    reader.Close();
                    return drinks;
                }
            }
        }

        public List<Drinks> GetAllDrinksByType(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                    drinks.Id as Id, 
                    drinksImg as Img, 
                    Name, 
                    Recipe, 
                    DT.Type as Type
                    FROM drinks
                    join drinkTypes as DT on DT.Id = drinks.drinkTypesId
                    WHERE DT.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var drinksTypes = new List<Drinks>();
                    while (reader.Read())
                    {
                        drinksTypes.Add(new Drinks()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DrinksImg = DbUtils.GetString(reader, "Img"),
                            Recipe = DbUtils.GetString(reader, "Recipe"),
                            DrinkType = DbUtils.GetString(reader, "Type"),
                        });
                    }
                    reader.Close();
                    return drinksTypes;
                }
            }
        }
        public Drinks GetDrinkById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                    drinks.Id as Id, 
                    drinksImg as Img, 
                    Name, 
                    Recipe, 
                    DT.Type as Type
                    FROM drinks
                    join drinkTypes as DT on DT.Id = drinks.drinkTypesId
                    WHERE drinks.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    Drinks drink = null;
                    if (reader.Read())
                    {
                        drink = new Drinks()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            DrinksImg = DbUtils.GetString(reader, "Img"),
                            Recipe = DbUtils.GetString(reader, "Recipe"),
                            DrinkType = DbUtils.GetString(reader, "Type"),
                        };
                    }
                    reader.Close();
                    return drink;
                }
            }
        }

        public void Add(Drinks drink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Drinks (Name, Img, Recipe, Type)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Img, @Recipe, @Type";
                    DbUtils.AddParameter(cmd, "@Name", drink.Name);
                    DbUtils.AddParameter(cmd, "@Img", drink.DrinksImg);
                    DbUtils.AddParameter(cmd, "@Recipe", drink.Recipe);
                    DbUtils.AddParameter(cmd, "@Type", drink.DrinkType);

                    drink.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Drinks drink)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Drinks
                           SET Name = @Name,
                               Recipe = @Recipe,
                               Img = @Img,
                               Type = @Type,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", drink.Name);
                    DbUtils.AddParameter(cmd, "@Img", drink.DrinksImg);
                    DbUtils.AddParameter(cmd, "@Recipe", drink.Recipe);
                    DbUtils.AddParameter(cmd, "@Type", drink.DrinkType);

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
                    cmd.CommandText = "DELETE FROM Drinks WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
