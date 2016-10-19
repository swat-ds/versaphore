var React = require('react');

var Apparatus = React.createClass({

    // function getCurrentWorkspaceData(workspace,params){

    //     var url = [
    //         params.scope,
    //         workspace.sheetKey,
    //         'values',
    //         'Sheet1'
    //         ].join('/');

    //     $.ajax({
    //         url: url,
    //         data: {
    //             key: params.key,
    //             majorDimension: 'ROWS'
    //         },
    //         success: function(d){ return d; }
    //     });
    // }

    // var currentWorkspaceData = yield getCurrentWorkspaceData(currentWorkspace,this.state.googleAPI);
    // console.log(currentWorkspaceData);

    handleGetWitnesses: function(){

        console.log('fire handle');

        var witnesses = [
            { "witnessID": "akhmatova" },
            { "witnessID": "laird" },
            { "witnessID": "hemeshleyer" }
        ];

        return this.props.onGetWitnesses(witnesses);

    },

    render: function(){

        return <p> words </p>;
    }
});


module.exports = Apparatus;