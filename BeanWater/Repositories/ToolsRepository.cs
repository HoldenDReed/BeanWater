using Microsoft.Extensions.Hosting;
using BeanWater.Models;
using BeanWater.Utils;

namespace BeanWater.Repositories
{
    public class ToolsRepository : BaseRepository, IToolsRepository
    {
        public ToolsRepository(IConfiguration configuration) : base(configuration) { }

        public List<Tools> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                    tools.Id as Id, 
                    tools.link as Link, 
                    Name
                    FROM tools";
                    var reader = cmd.ExecuteReader();

                    var tools = new List<Tools>();
                    while (reader.Read())
                    {
                        tools.Add(new Tools()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Link = DbUtils.GetString(reader, "Link"),
                        });
                    }
                    reader.Close();
                    return tools;
                }
            }
        }

        public List<Tools> GetToolsByDrinkId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"SELECT 
                    DT.Id as Id, 
                    DT.drinkId,
                    T.Name,
                    T.Link,
                    T.Id as ToolId
                    FROM drinkTools as DT
                    inner join tools as T on DT.toolId = T.Id
                    WHERE DT.drinkId = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    var reader = cmd.ExecuteReader();

                    var tools = new List<Tools>();
                    while (reader.Read())
                    {
                        tools.Add(new Tools()
                        {
                            Id = DbUtils.GetInt(reader, "ToolId"),
                            Name = DbUtils.GetString(reader, "Name"),
                            Link = DbUtils.GetString(reader, "Link"),
                        });
                    }
                    reader.Close();
                    return tools;
                }
            }
        }
        public void Add(Tools tool)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Tools (Name, Link)
                        OUTPUT INSERTED.ID
                        VALUES (@Name, @Link";
                    DbUtils.AddParameter(cmd, "@Name", tool.Name);
                    DbUtils.AddParameter(cmd, "@Link", tool.Link);


                    tool.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
        public void Update(Tools tool)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                    UPDATE Tools
                           SET Name = @Name,
                               Link = @Link,
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Name", tool.Name);
                    DbUtils.AddParameter(cmd, "@Link", tool.Link);

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
                    cmd.CommandText = "DELETE FROM Tools WHERE Id = @Id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
