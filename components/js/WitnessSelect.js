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
        console.log(e.target.value);
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


        return (

            <div className="row">

            <div className="form-inline pull-left col-md-8"> 
                <div className="form-group">

                <label className="text-muted" htmlFor="baseSelect">
                    base witness
                </label>
                <select name="baseSelect" id="baseSelect" className="form-control" value="" onChange={ this.handleBaseSelect }>
                    { baseOptions }
                </select>
                </div>

                <ExcludeSelect witnesses = { this.props.witnesses } />
            </div>
            
            <div className="form-inline text-right pull-right col-md-4">
            <div className="form-group">

            <label className="text-muted" htmlFor="workspaceSelect">workspace</label>
            <select name="workspaceSelect" id="workspaceSelect" className="form-control" onChange={ this.handleWorkspaceSelect }>
            <option value="">select workspace</option>
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

var ExcludeSelect = React.createClass({

    getInitialState: function() {
        return{
            value: []
        };
    },

    handleExcludeSelect: function(e){
        e.preventDefault();

        var currSelected = this.state.value;

        if(_.indexOf(currSelected, e.target.value) == -1){
            currSelected.push(e.target.value);
        } else {
            _.remove(currSelected, function(o){
                console.log(o !== e.target.value);
                console.log(o != e.target.value);
                return o != e.target.value;
            });
        }

        console.log(e.target.value);
        console.log(currSelected);

        this.setState({ value: currSelected });
    },

    render: function(){
        var baseOptions = _.map(this.props.witnesses, function(item,index){

            var witID = _.keys(item)[0];
            return(
            <option value = { witID } key = { index }>{ item[witID] }</option>
        );
        });

        return(

            <div className="form-group">
            <label className="text-muted" htmlFor="excludeSelect">
                base witness
            </label>
            <select multiple={ true } name="excludeSelect" id="excludeSelect" className="form-control" value={ this.state.value } onChange={ this.handleExcludeSelect }>
                { baseOptions }
            </select>
            </div>

            );
    }

});

module.exports = WitnessSelect;