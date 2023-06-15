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
                        F.uid,
                        D.Id as DrinkId, 
                        drinksImg as Img, 
                        Name, 
                        Recipe,
                        Uid,
                        DT.Type as Type
                        FROM favorites as F
                        JOIN drinks as D on F.drinkId = D.id
                        JOIN drinkTypes as DT on D.drinkTypesId = DT.Id
                        WHERE F.uid = @uId";

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

        //public Drinks GetByDrinkAndUid(string uId, int id)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT
        //                F.id as FavoriteId,
        //                F.uid,
        //                D.Id as DrinkId, 
        //                drinksImg as Img, 
        //                Name, 
        //                Recipe,
        //                Uid,
        //                DT.Type as Type
        //                FROM favorites as F
        //                JOIN drinks as D on F.drinkId = D.id
        //                JOIN drinkTypes as DT on D.Id = DT.Id
        //                WHERE F.uid = @uId AND DrinkId = @id";

        //            cmd.Parameters.AddWithValue("@uId", uId);
        //            cmd.Parameters.AddWithValue("@id", id);

        //            var reader = cmd.ExecuteReader();

        //            Favorites favorite = null;
        //            if (reader.Read())
        //            {
        //                favorite = new Favorites()
        //                {
        //                    Id = DbUtils.GetInt(reader, "FavoriteId"),
        //                    DrinkId = DbUtils.GetInt(reader, "DrinkId"),
        //                    Uid = DbUtils.GetString(reader, "uid"),
        //                    Drinks = new Drinks()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "DrinkId"),
        //                        Name = DbUtils.GetString(reader, "Name"),
        //                        DrinksImg = DbUtils.GetString(reader, "Img"),
        //                        Recipe = DbUtils.GetString(reader, "Recipe"),
        //                        DrinkType = DbUtils.GetString(reader, "Type"),
        //                    }
        //                };
        //            }

        //            reader.Close();
        //            return favorite;
        //        }
        //    }
        //}
        public void Add(AddFavorite favorites)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorites (drinkId, uId)
                        OUTPUT INSERTED.ID
                        VALUES (@drinkId, @uid)";

                    DbUtils.AddParameter(cmd, "@drinkId", favorites.DrinkId);
                    DbUtils.AddParameter(cmd, "@uid", favorites.uId);

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





