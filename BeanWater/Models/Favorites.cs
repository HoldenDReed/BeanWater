namespace BeanWater.Models
{
    public class Favorites
    {
        public int Id { get; set; }
        public int DrinkId { get; set; }
        public string Uid { get; set; }
        public Drinks Drinks { get; set; }
    }

    public class AddFavorite
    {
        public int Id { get; set; }
        public int DrinkId { get; set; }
        public int UserId { get; set; }
    }
}
