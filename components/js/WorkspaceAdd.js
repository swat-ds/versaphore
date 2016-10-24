var React = require('react');

var WorkspaceAdd = React.createClass({

    handleAdd: function(e){

        e.preventDefault();

        // example url https://docs.google.com/spreadsheets/d/1n_g57mADrr47FfpSaO83nnQ-vWnvNBlpMC4heUcXhF4/pubhtml
        var sheetKey = this.refs.workspaceSheetKey.value.split('/')[5];

        // TODO: form validation ...

        var newWorkspace = {
            workspaceName: this.refs.workspaceName.value,
            sheetKey: sheetKey
        };

        this.props.addWorkspace(newWorkspace);

    },

    render: function(){

        return (
            <div className="modal fade" id="workspaceAdd" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h4>Add Workspace</h4>
                </div>
                <form className="form-group">
                <div className="modal-body">
                <label htmlFor="workspaceName">Workspace Name</label>
                <input type="text" className="form-control" ref="workspaceName" id="workspaceName" placeholder="Workspace Name" />
                <label htmlFor="googleSheetID">Google Sheet URL</label>
                <input type="text" className="form-control" ref="workspaceSheetKey" id="workspaceSheetKey" placeholder="Google Sheet URL" />
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className="btn btn-primary" onClick={ this.handleAdd }>Save changes</button>
                </div>
                </form>
            </div> // content
            </div> // dialog
            </div> // modal
        );
    }
});

module.exports = WorkspaceAdd;