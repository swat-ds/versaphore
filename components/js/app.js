var React = require('react'),
    ReactDOM = require('react-dom'),
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

            // { "workspaceName":"","sheetID":""}
            currentWorkspace: {},

            // [{ "witID": "author"}]
            witnesses: [],

            // {"appID": 
                    // [ int witID, str reading ]
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

    setCurrentWorkspace: function(workspaceName){

        if( this.state.currentWorkspace == ""){
            $('#baseSelect option:first-child').remove();
        }

        var currentWorkspace = _.find(this.state.workspaces,function(o){
            return o.workspaceName == workspaceName;
        });

        var currentApparatus = this.setCurrentApparatus(currentWorkspace.sheetID);

        this.setState({ 
            currentWorkspace: currentWorkspace,
            apparatus: currentApparatus
        });
    }, // setCurrentWorkspace

    setCurrentApparatus: function(sheetID){

        var currentApparatus = {};
        $.ajax({

            url: [this.state.googleAPI.scope,
                  sheetID,
                  'values',
                  'Sheet1'].join('/'),
            data: {
                    key: this.state.googleAPI.key,
                    majorDimension: 'COLUMNS'
                },
            success: function(d){
                _.each(d.values[0], function(v,i){

                    // TODO for each app

                    // currReading = []
                    // currReading[0] = witID
                    // currReading[1] = value

                    // currApp = {}
                    // currApp["'" + i + "'"][0] = []
                    // currApp["'" + i + "'"][0] = currReading

                });
            }
        });
    },

    addWorkspace: function(){

        // TODO post data to json php
        this.setState({});

    }, // addWorkspace

    deleteWorkspace: function(){

        var currentWorkspaces = _.filter(this.state.workspaces,function(o){
            return o.workspaceName !== this.state.currentWorkspace.workspaceName;
        }.bind(this));

        // TODO post data to json php
        this.setState({ workspaces: currentWorkspaces});

    }, // deleteWorkspace

    render: function(){
        return (
            <div id="interface">
            <WitnessSelect 
                workspaces = { this.state.workspaces }
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