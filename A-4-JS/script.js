const ratingData = [
    { restaurant: 'KFC', rating: 5 },
    { restaurant: 'Burger King', rating: 4 },
    { restaurant: 'KFC', rating: 3 },
    { restaurant: 'Domino', rating: 2 },
    { restaurant: 'Subway', rating: 3 },
    { restaurant: 'Domino', rating: 1 },
    { restaurant: 'Subway', rating: 4 },
    { restaurant: 'Pizza Hut', rating: 5 },
  ];
  
  // Calculate the average rating for all restaurants
  const averageRatings = ratingData.reduce((acc, rating) => {
  
    const restaurant = rating.restaurant;
    const ratingCount = acc[restaurant]?.count || 0;
    const ratingSum = acc[restaurant]?.sum || 0;
  
    acc[restaurant] = {
      count: ratingCount + 1,
      sum: ratingSum + rating.rating,
    };
  
    return acc;
  }, {});

  
  
  // Convert the averageRatings object to an array of { restaurant, averageRating }
  const averageRatingsArray = Object.entries(averageRatings).map(([restaurant, { count, sum }]) => ({
    restaurant,
    averageRating: sum / count,
  }));
  
  console.log("The AverageRating of All the Restaurants is:" , averageRatingsArray);
  
  // Filter restaurants with an averasge rating greater than or equal to 4
  const highRatedRestaurants = averageRatingsArray.filter(({ averageRating }) => averageRating >= 4);
  
  console.log(" All the Restaurants with an AverageRating greater than or equal to 4 i:" , highRatedRestaurants);