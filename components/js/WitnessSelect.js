var React = require('react');
var _ = require('lodash');

var WitnessSelect = React.createClass({

    handleSelect: function(e){
        e.preventDefault();
        return this.props.onSelect(e.target.value);
    },

    handleAdd: function(){
        return this.props.onAdd();
    },

    handleDelete: function(){
        return this.props.onDelete();
    },

    render: function(){

        var workspaceOptions = _.map(this.props.workspaces, function(item,index) {

            return(
                <option value = { item.workspaceName } key = { index }>{ item.workspaceName }</option>
            );
        });

        return (

            <div className="row">

            <div className="form-inline pull-left col-md-4 col-md-offset-1">
            <div className="form-group">
            <label htmlFor="baseSelect"></label>
            <select id="baseSelect" className="form-control" onChange={ this.handleSelect }>
            <option></option>
            { workspaceOptions }
            </select>
            </div>        
            </div>

            <div className="pull-right col-md-4">
            <button className="btn btn-primary btn-success"><span className="glyphicon glyphicon-plus" onClick = { this.handleAdd }></span></button>
            <button className="btn btn-primary btn-danger"><span className="glyphicon glyphicon-remove" onClick = { this.handleDelete }></span></button>
            </div>

            </div>
        );
    }
});


module.exports = WitnessSelect;