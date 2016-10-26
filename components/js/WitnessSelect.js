var React = require('react'),
    _ = require('lodash');

var WorkspaceAdd = require('./WorkspaceAdd');


var WitnessSelect = React.createClass({

    getInitialState: function() {
        return {
            excludeList: {}
        };
    },

    handleWorkspaceSelect: function(e){
        e.preventDefault();
        return this.props.onWorkspaceSelect(e.target.value);
    },

    handleBaseSelect: function(e){
        e.preventDefault();
        return this.props.onBaseSelect(e.target.value);
    },

    handleExcludeSelect: function(e){
        e.preventDefault();
        console.log('fire');
        return this.props.onExcludeSelect(e.target.value);
    },

    handleAdd: function(newWorkspace){
        return this.props.onAdd(newWorkspace);
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

        var excludeOptions = _.map(this.props.witnesses, function(item,index){

                var witID = _.keys(item)[0];

                return(
                    <li key = { index }>
                        <a href="#" className="small" onClick = { this.handleExcludeSelect }><input type="checkbox" value = { witID }/>&nbsp;{ item[witID] }</a>
                    </li>
                );
         });

        return (

            <div className="row">

            <div className="form-inline pull-left col-md-8"> 
                <div className="form-group">

                <label className="text-muted" htmlFor="workspaceSelect">
                    base witness
                </label>
                <select name="baseSelect" id=" baseSelect" className="form-control" onChange={ this.handleBaseSelect }>
                    { baseOptions }
                </select>
                </div>

                <div className="form-group">
                    <label className="text-muted" htmlFor="excludeSelect">
                        exclude list
                    </label>

                    <button id="excludeList" type="button" className="btn btn-default btn-sm dropdown-toggle form-control" data-toggle="dropdown"><span className="caret"></span></button>
                    <ul className="dropdown-menu" aria-labelledby="excludeList">
                        { excludeOptions }
                    </ul>
                </div>

            </div>
            
            <div className="form-inline text-right pull-right col-md-4">
            <div className="form-group">

            <label className="text-muted" htmlFor="workspaceSelect">workspace</label>
            <select name="workspaceSelect" id="workspaceSelect" className="form-control" onClick={ this.handleWorkspaceSelect }>
            <option value=""></option>
            { workspaceOptions }
            </select>

            <div className="form-group">
            <button className="btn btn-primary btn-success" data-toggle="modal" data-target="#workspaceAdd"><span className="glyphicon glyphicon-plus"></span></button>
            <button className="btn btn-primary btn-danger"><span className="glyphicon glyphicon-remove" onClick = { this.handleDelete }></span></button>
            </div>

            </div>        
            </div>
            <WorkspaceAdd 
                addWorkspace = { this.handleAdd }
            />
            </div>
        );
    }
});


module.exports = WitnessSelect;