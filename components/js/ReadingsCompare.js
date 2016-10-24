var React = require('react'),
    _ = require('lodash');

var ReadingsCompare = React.createClass({
    render: function(){

        var readingsHTML = _.map(this.props.apparatus, function(item,index){
            return (<li>{ item.witID }: { item.reading }</li>);
        });

        return (
            <div className="col-md-4 pull-right">
                <h1>Compare Readings</h1>
                <ul className="dl-horizontal table-striped">
                { readingsHTML }
                </ul>
            </div>
        );
    }
});


module.exports = ReadingsCompare;