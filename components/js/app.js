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
            currentBase: {},

            // { "workspaceName":"","sheetKey":""}
            currentWorkspace: {},

            // {{ "witnessID":"", "creator":""}}
            witnesses: {},

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
            $('# workspaceSelect option:first-child').remove();
        }

        var currentWorkspace = _.find(this.state.workspaces,function(o){
            return o.workspaceName == workspaceName;
        });

        this.setState({ currentWorkspace: currentWorkspace });
        this.setCurrentWitnesses();

    },

    setCurrentWitnesses: function(){

        if( this.state.currentWorkspace == null ){
            console.log('null');
        }

        var url = [
            this.state.googleAPI.scope,
            this.state.currentWorkspace.sheetKey,
            'values',
            'Sheet1'
        ].join('/');

        this.serverRequest = $.ajax({
                url: url,
                data: {
                    key: this.state.googleAPI.key,
                    majorDimension: 'ROWS',
                    range: 'Sheet1!A2:Z2'
                }
            }).done(function(d){

                var currentWitnesses = {};
                _.each(d.values[0],function(v,i){
                    var currentWitness = {};
                    currentWitness["wit-"+i] = v;
                    currentWitnesses[i] = currentWitness;
                });
                this.setState({
                    witnesses: currentWitnesses
                });

            }.bind(this));

    },

    setCurrentBase: function(witnessID){

       if( this.state.currentBase == ""){
            $('#baseSelect option:first-child').remove();
        }

        var currentBase = _.find(this.state.witnesses,function(o){
            return o.witnessID == witnessID;
        });

        this.setState({ 
            currentBase: currentBase,
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
        this.setCurrentWitnesses();

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
                onWorkspaceSelect = { this.setCurrentWorkspace }
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