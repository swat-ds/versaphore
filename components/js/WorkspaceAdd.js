var React = require('react');

var WorkspaceAdd = React.createClass({

    getInitialState: function() {
      return { 
        isURLValid: false,
        isNameValid: false
      };  
    },

    validateForm: function(e){

        e.preventDefault(e);

        var urlPattern = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
        var namePattern = /[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g;

        var urlRegex = new RegExp(urlPattern);
        var nameRegex = new RegExp(namePattern);

        this.setState ({
            isNameValid: !this.refs.workspaceName.value.match(nameRegex),
            isURLValid: this.refs.sheetURL.value.match(urlRegex)
        });
    },

    handleAdd: function(e){

        e.preventDefault();

        // example url https://docs.google.com/spreadsheets/d/1n_g57mADrr47FfpSaO83nnQ-vWnvNBlpMC4heUcXhF4/pubhtml

        var sheetKey = this.refs.sheetURL.value.split('/')[5]; 

        var newWorkspace = {
            workspaceName: this.refs.workspaceName.value,
            sheetKey: sheetKey
            };

        this.props.onAdd(newWorkspace);
    },

    render: function(){

        var isValid = ( 
                    this.state.isNameValid && 
                    this.state.isURLValid
                    ) ? true : false;

        return (
            <div className="modal fade" id="workspaceAdd" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <h4 className="modal-header">Add Workspace</h4>
                <div className="modal-body">

                <div className={ this.state.isNameValid ? "form-group" : "form-group has-error" }>
                    <label htmlFor="workspaceName">Workspace Name</label>
                    <input type="text" className="form-control" ref="workspaceName" id="workspaceName" placeholder="Workspace Name" onChange={ this.validateForm } />
                </div>

                <div className={ this.state.isURLValid ? "form-group" : "form-group has-error" }>
                    <label htmlFor="sheetURL">Google Sheet URL</label>
                    <input type="url" className="form-control" ref="sheetURL" id="sheetURL" placeholder="Google Sheet URL" onChange={ this.validateForm }/>
                </div>

                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="submit" className={ isValid ? "btn btn-primary" : "btn btn-primary disabled" } onClick={ this.handleAdd }>Save changes</button>
                </div>
            </div> // content
            </div> // dialog
            </div> // modal
        );
    }
});

module.exports = WorkspaceAdd;