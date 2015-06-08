if (Meteor.isClient) {

  Template.nvd3.helpers({
    doc: function () {
      return Session.get('serverSimpleResponse');
    }
  });
  
  Template.nvd3.onRendered(function () {

  });

  Template.nvd3.events({
    'click button': function () {
      Meteor.call('getTopCities',function(err, response) {
        var map = _.map(response, function(doc) {
          return {city: doc._id.city, pop: doc.popsum};
        });
	      Session.set('serverSimpleResponse', map);
		   BarChart = [{ values: Session.get('serverSimpleResponse') }];
        console.log(BarChart); 

        nv.addGraph(function() {
        var chart = nv.models.discreteBarChart()
          .x(function(d) {console.log(d); return d.city })
          .y(function(d) { return d.pop })
          .staggerLabels(true)
          .staggerLabels(BarChart[0].values.length > 20)
          .tooltips(false)
          .showValues(true)
          .duration(250)
          ;

          d3.select('#chart1 svg')
            .datum(BarChart)
            .call(chart);

          nv.utils.windowResize(chart.update);
          return chart;
        });   
            
		 });
    }
  });

}
