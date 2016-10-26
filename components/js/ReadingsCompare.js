var React = require('react'),
    _ = require('lodash');

var ReadingsCompare = React.createClass({
    render: function(){

        var key = 0;

        var readingsHTML = _.map(this.props.witnesses, function(item,index){

            key += 1;
            var witID = _.keys(item);
            return (<li key = { key }>{ item[witID] }: { this.props.readings[witID] }</li>);

        }.bind(this));

        return (
            <div className="col-md-4 pull-right">
                <h1>Compare Readings</h1>
                <ul className="dl-horizontal table-striped">
                { _.isEmpty(this.props.readings) ? "" : readingsHTML }
                </ul>
            </div>
        );
    }
});


module.exports = ReadingsCompare;