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

            currentBase: "",
            currentWorkspace: "",
            currentWorkspaceID: "",

            // { "witID": "author"}
            witnesses: [],

            // "appID": [ "witID", "isVisible", "reading" ]
            apparatus: {}
        }
    },

    render: function(){
        return (
            <div id="interface">
            <WitnessSelect />
            <div className="row">
            <Witness />
            <ReadingsCompare />
            </div>
            </div>
        );
    }
});

ReactDOM.render(<MainInterface/>, document.getElementById('main'));