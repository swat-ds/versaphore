var React = require('react'),
    _ = require('lodash');

var Reading = require('./Reading');

var Apparatus = React.createClass({

    getCurrentReadings: function(appid){

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
                exclude = { this.props.excludeList }
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