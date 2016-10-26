var React = require('react'),
    _ = require('lodash');

var Reading = require('./Reading');

var Apparatus = React.createClass({

    getCurrentReadings: function(appid){

        // var currentReadings = _.map($(e.currentTarget).children(),function(item,index){

        // var currItem = $(item);
        // var witID = currItem.attr("class").split(' ')[0];
        // var currReading = currItem.html();

        var currentReadings = _.find(this.props.apparatus,appid);
        this.props.getCurrentReadings(currentReadings,appid);
    },

    render: function(){


        var reactKey = 0;
        var apparatusHTML = _.map(this.props.apparatus, function(item,index){

            var currID = _.keys(item);

            return (
                <Reading
                base = { this.props.base }
                appID = { currID }
                currApp = { item[currID] }
                key = { index }
                getCurrentReadings = { this.getCurrentReadings }
                />
                );


        }.bind(this));

        return(
            <div className = "col-md-6 pull-left">   
            { apparatusHTML }
            </div>
        );
    }
});


module.exports = Apparatus;