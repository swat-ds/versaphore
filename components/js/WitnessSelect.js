var React = require('react'),
    _ = require('lodash');

var WitnessSelect = React.createClass({

    handleWorkspaceSelect: function(e){
        e.preventDefault();
        return this.props.onWorkspaceSelect(e.target.value);
    },

    handleBaseSelect: function(e){
        e.preventDefault();
        return this.props.onBaseSelect(e.target.value);
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

        var baseOptions = _.map(this.props.witnesses, function(item,index){

            var witID = _.keys(item)[0];

            return(
                <option value = { witID } key = { index }>{ item[witID] }</option>
            );
        });

        return (

            <div className="row">

            <div className="form-inline pull-left col-md-4">
                <div className="form-group"><label className="text-muted" htmlFor=" workspaceSelect">
                        base witness
                    </label>
                <select name="baseSelect" id=" baseSelect" className="form-control" onChange={ this.handleBaseSelect }>
                    { baseOptions }
                </select>

                </div>
            </div>
            <div className="form-inline text-right pull-right col-md-4">
            <div className="form-group">

            <label className="text-muted" htmlFor="workspaceSelect">workspace</label>
            <select name="workspaceSelect" id="workspaceSelect" className="form-control" onChange={ this.handleWorkspaceSelect }>
            <option></option>
            { workspaceOptions }
            </select>

            <div className="form-group">
            <button className="btn btn-primary btn-success"><span className="glyphicon glyphicon-plus" onClick = { this.handleAdd }></span></button>
            <button className="btn btn-primary btn-danger"><span className="glyphicon glyphicon-remove" onClick = { this.handleDelete }></span></button>
            </div>

            </div>        
            </div>

            </div>
        );
    }
});


module.exports = WitnessSelect;