var React = require('react');
var Apparatus = require('./Apparatus');

var Witness = React.createClass({
    render: function(){

        for(var i=0; i < 10; i++){

        var words = [];

        for(var i=0; i<10; i++){
            words.push(<Apparatus key = { i }/>);
        }



        return (
            <div className="col-md-8">
                { words }
            </div>
        );
        }
    }
});


module.exports = Witness;