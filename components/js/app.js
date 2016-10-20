var React = require('react'),
    ReactDOM = require('react-dom'),
    Series = require('async-series'),
    _ = require('lodash');

var WitnessSelect = require('./WitnessSelect'),
    Witness = require('./Witness'),
    Apparatus = require('./Apparatus'),
    ReadingsCompare = require('./ReadingsCompare');

var MainInterface = React.createClass({

    getInitialState: function() {
        return {

            workspaces: [],
            currentBase: "",

            // { "workspaceName":"","sheetKey":""}
            currentWorkspace: {},

            // {{ "witnessID":"", "creator":""}}
            witnesses: {},

            // {"appID": 
                    // { str witID: str reading  },
                    // { str witID: str reading  },
                    // { str witID: str reading  }
                    
            apparatus: {},

            googleAPI: {
                scope: 'https://sheets.googleapis.com/v4/spreadsheets',
                key: `${googleAPIKey}`            }
            }
    }, // getInitialState

    componentDidMount: function(){
        this.serverRequest = $.get('./js/data.json',function(d){

            var data = d;
            this.setState({
                workspaces: data
            });
        }.bind(this));

    }, // componentDidMount

    componentWillUnmount: function(){
        this.serverRequest.abort();
    }, // componentWillUnmount

    handleWorkspaceUpdate: function(workspaceName){

        var currentWorkspace = this.getCurrentWorkspace(workspaceName);
        this.setCurrentWorkspace(currentWorkspace);
        this.setCurrentWitnesses(currentWorkspace);

        var currentBase = _.isEmpty(currentWorkspace) ? "" : "wit-0";
        this.setState({ currentBase: currentBase });

    }, // handleWorkspaceUpdate

    getCurrentWorkspace: function(workspaceName){
 
        var currentWorkspace = _.find(this.state.workspaces,function(o){
            return o.workspaceName == workspaceName;
        });

        return currentWorkspace;
    }, // getCurrentWorkspace

    setCurrentWorkspace: function(currentWorkspace){

        if( this.state.currentWorkspace == ""){
            $('#workspaceSelect option:first-child').remove();
        }

        this.setState({ currentWorkspace: currentWorkspace });
    }, // setCurrentWorkspace

    getCurrentWitnesses: function(creatorArray){

        var currentWitnesses = {};
        _.each(creatorArray,function(v,i){
            var currentWitness = {};
            currentWitness["wit-"+i] = v;
            currentWitnesses[i] = currentWitness;
        });

        return currentWitnesses;

    }, // getCurrentWitnesses

    setCurrentWitnesses: function(currentWorkspace = this.state.currentWorkspace){

        if( _.isEmpty(currentWorkspace) ) {
            this.setState({ witnesses: {} });            
        } else {

            var url = [
                this.state.googleAPI.scope,
                currentWorkspace.sheetKey,
                'values',
                'Sheet1'
            ].join('/');

            this.serverRequest = $.ajax({
                    url: url,
                    data: {
                        key: this.state.googleAPI.key,
                        majorDimension: 'ROWS',
                    }
                }).done(function(d){


                    var rows = d.values;

                    rows.shift();
                    var creatorArray = rows.shift();
                    console.log(creatorArray);
                    var currentWitnesses = this.getCurrentWitnesses(creatorArray);
                    var currentApparatus = this.getCurrentApparatus(rows);

                    this.setState({
                        witnesses: currentWitnesses,
                        apparatus: currentApparatus
                    });

                }.bind(this));
        }
    }, // setCurrentWitnesses

    getCurrentApparatus: function(rows) {

        var currentApparatus = {};

        _.each(rows, function(v,i){

            var index = 'app-' + i;
            currentApparatus[index] = {}; 

            _.each(rows[i], function(v,i){
                currentApparatus[index]['wit-'+i] = v;
            })

        }.bind(this));

        return currentApparatus;

    }, // getCurrentApparatus

    setCurrentBase: function(witnessID){

       if( this.state.currentBase == ""){
            $('#baseSelect option:first-child').remove();
        }

        this.setState({ 
            currentBase: witnessID
        });

    }, // setCurrentBase

    addWorkspace: function(){

        // TODO post data to json php
        this.setState({});

    }, // addWorkspace

    deleteWorkspace: function(){

        var currentWorkspaces = _.filter(this.state.workspaces,function(o){
            return o.workspaceName !== this.state.currentWorkspace.workspaceName;
        }.bind(this));

        var currentWorkspace = _.isEmpty(currentWorkspaces) ? {} : currentWorkspaces[0];
        var currentBase = _.isEmpty(currentWorkspaces) ? "" : "wit-0";

        // TODO post data to json php
        this.setState({ 
                workspaces: currentWorkspaces,
                currentWorkspace: currentWorkspace,
                currentBase: currentBase
            });
        this.setCurrentWitnesses(currentWorkspace);

    }, // deleteWorkspace

    render: function(){
        return (
            <div id="interface">
            <Apparatus 
                witnesses = { this.state.witnesses }
                base = { this.state.currentBase }
                workspace = { this.state.currentWorkspace }
                onGetWitnesses = { this.setCurrentWitnesses }
            />
            <WitnessSelect 
                workspaces = { this.state.workspaces }
                witnesses = { this.state.witnesses }
                onWorkspaceSelect = { this.handleWorkspaceUpdate }
                onBaseSelect = { this.setCurrentBase }
                onSelect = { this.setCurrentWorkspace }
                onAdd = { this.addWorkspace }
                onDelete = { this.deleteWorkspace }
            />
            <div className="row">
            <Witness />
            <ReadingsCompare />
            </div>
            </div>
        ); // return
    } // render
});

ReactDOM.render(<MainInterface/>, document.getElementById('main'));