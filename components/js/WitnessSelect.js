var React = require('react');

var WitnessSelect = React.createClass({
    render: function(){

        return (

            <div className="row">

            <div className="form-inline pull-left col-md-4 col-md-offset-1">
            <div className="form-group">
            <label htmlFor="baseSelect"></label>
            <select id="baseSelect" className="form-control">
            <option value="akh">Akhmatova</option>
            </select>
            </div>        
            </div>

            <div className="pull-right col-md-4">
            <button className="btn btn-primary btn-success"><span className="glyphicon glyphicon-plus"></span></button>
            <button className="btn btn-primary btn-danger"><span className="glyphicon glyphicon-remove"></span></button>
            </div>

            </div>
        );
    }
});


module.exports = WitnessSelect;