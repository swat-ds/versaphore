var React = require('react'),
    ReactDOM = require('react-dom'),
    Series = require('async-series'),
    _ = require('lodash');

var WitnessSelect = require('./WitnessSelect'),
    Apparatus = require('./Apparatus'),
    ReadingsCompare = require('./ReadingsCompare');

var MainInterface = React.createClass({

    getInitialState: function() {
        return {

            workspaces: [],
            workTitle: "",
            
            currentWorkspace: {},
            // { "workspaceName":"","sheetKey":""}

            currentBase: "",
            currentReadings: {},
            currentExludeList: [],

            apparatus: {},
            // ["appID": 
                // { str witID: str reading  },
                // { str witID: str reading  },
                // { str witID: str reading  } ]

            witnesses: {},
            // {{ "witnessID":"", "creator":""}}

            googleAPI: {
                scope: 'https://sheets.googleapis.com/v4/spreadsheets',
                key: `${googleAPIKey}`            
            },

            saveWorkspaceURL: 'http://ds.swarthmore.edu/versaphore/workspace-add.php'
            };
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
        this.setState({ currentBase: "wit-0" });    

    }, // handleWorkspaceUpdate

    getCurrentWorkspace: function(workspaceName){
 
        var currentWorkspace = _.find(this.state.workspaces,function(o){
            return o.workspaceName == workspaceName;
        });

        return currentWorkspace;
    }, // getCurrentWorkspace

    setCurrentWorkspace: function(currentWorkspace){
        console.log(currentWorkspace);
        this.setState({ currentWorkspace: currentWorkspace });
    }, // setCurrentWorkspace

    getCurrentWitnesses: function(creatorArray){

        var currentWitnesses = {};
        _.each(creatorArray,function(item,index){
            var currentWitness = {};
            currentWitness[ "wit-" + index ] = item;
            currentWitnesses[index] = currentWitness;
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
                    var title = rows.shift()[1];
                    var creatorArray = rows.shift();
                    creatorArray.shift();
                    var currentWitnesses = this.getCurrentWitnesses(creatorArray);
                    var currentApparatus = this.getCurrentApparatus(rows);

                    this.setState({
                        witnesses: currentWitnesses,
                        apparatus: currentApparatus,
                        workTitle: title
                    });

                }.bind(this));
        }
    }, // setCurrentWitnesses

    getCurrentApparatus: function(rows) {

        var allApparatus = [];
        var appID = 1;

        // console.log(rows);

        _.each(rows, function(item,index){

            var currentApparatus = {};
            var currentSpanID = _.isEmpty(item.shift()) ? "span" : "app-" + appID;
            currentApparatus[currentSpanID] = {};
            appID += 1;

            _.each(rows[index], function(item,index){

                if( !(_.isEmpty(item)) ) currentApparatus[currentSpanID]['wit-'+index] = item;

            });

            allApparatus.push(currentApparatus);

        }.bind(this));

        return allApparatus;

    }, // getCurrentApparatus

    setCurrentBase: function(witnessID){

        this.setState({ 
            currentBase: witnessID
        });

    }, // setCurrentBase

    addWorkspace: function(workspace){

        var currWorkspaces = this.state.workspaces;
        currWorkspaces.push(workspace);

        this.serverRequest = $.ajax({
                url: this.state.saveWorkspaceURL,
                data: {
                    workspaceName: workspace.workspaceName,
                    sheetKey: workspace.sheetKey
                }
            }).done(function(d){
                this.setState({ workspaces: currWorkspaces });
            });

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

    updateCurrentReadings: function(readings,appid) {

        this.setState({
            currentReadings: readings[appid]
        });
    },

    setCurrentExclude: function(excludeList){
        this.setState({ currentExcludeList: excludeList });
    },

    render: function(){

        return (
            <div id="interface">
            <WitnessSelect 
                workspaces = { this.state.workspaces }
                witnesses = { this.state.witnesses }
                base = { this.state.currentBase }
                excludeList = { this.state.currentExcludeList }
                onWorkspaceSelect = { this.handleWorkspaceUpdate }
                onBaseSelect = { this.setCurrentBase }
                onExcludeSelect = { this.setCurrentExclude }
                onSelect = { this.setCurrentWorkspace }
                onAdd = { this.addWorkspace }
                onDelete = { this.deleteWorkspace }
            />
            <div className="row">
            <Apparatus 
                witnesses = { this.state.witnesses }
                apparatus = { this.state.apparatus }
                base = { this.state.currentBase }
                excludeList = { this.state.currentExcludeList }
                getCurrentReadings = { this.updateCurrentReadings }
            />
            <ReadingsCompare
                readings = { this.state.currentReadings }
                witnesses = { this.state.witnesses }
            />
            </div>
            </div>
        ); // return
    } // render
});

ReactDOM.render(<MainInterface/>, document.getElementById('main'));