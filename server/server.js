Cities = new Mongo.Collection('cities');
Meteor.methods({
  getTopCities: function() {
  	 var pipeline = [
      {$group:{_id:{city:"$city"}, popsum:{$sum:"$pop"}}},{$sort:{popsum: -1}}, { $limit : 20 }
    ];
    var cities = Cities.aggregate(pipeline);
    console.log(cities);
    return cities;
  }
});