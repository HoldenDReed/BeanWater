using BeanWater.Models;
using BeanWater.Repositories;
using BeanWater.Utils;
using Microsoft.Extensions.Hosting;
using System.Buffers;

namespace BeanWater.Repositories
{
    public class FavoritesRepository : BaseRepository, IFavoritesRepository
    {
        public FavoritesRepository(IConfiguration configuration) : base(configuration) { }

        public List<Favorites> GetAll(string uId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT
                        F.id as FavoriteId,
                        F.userId,
                        D.Id as DrinkId, 
                        drinksImg as Img, 
                        Name, 
                        Recipe,
                        Uid,
                        DT.Type as Type
                        FROM favorites as F
                        JOIN drinks as D on F.drinkId = D.id
                        JOIN drinkTypes as DT on D.Id = DT.Id
                        JOIN users AS U ON F.userId = U.Id
                        WHERE uid = @uId";

                    cmd.Parameters.AddWithValue("@uId", uId);
                    var reader = cmd.ExecuteReader();

                    var favorites = new List<Favorites>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorites()
                        {
                            Id = DbUtils.GetInt(reader, "FavoriteId"),
                            DrinkId = DbUtils.GetInt(reader, "DrinkId"),
                            Uid = DbUtils.GetString(reader, "uid"),
                            Drinks = new Drinks()
                            {
                                Id = DbUtils.GetInt(reader, "DrinkId"),
                                Name = DbUtils.GetString(reader, "Name"),
                                DrinksImg = DbUtils.GetString(reader, "Img"),
                                Recipe = DbUtils.GetString(reader, "Recipe"),
                                DrinkType = DbUtils.GetString(reader, "Type"),
                            }
                        });
                    }

                    reader.Close();

                    return favorites;
                }
            }
        }

        public void Add(AddFavorite favorites)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorites (drinkId, userId)
                        OUTPUT INSERTED.ID
                        VALUES (@drinkId, @userId)";

                    DbUtils.AddParameter(cmd, "@gameId", favorites.DrinkId);
                    DbUtils.AddParameter(cmd, "@userId", favorites.UserId);

                    int id = (int)cmd.ExecuteScalar();

                    favorites.Id = id;
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
                    cmd.CommandText = "DELETE FROM favorites WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}





