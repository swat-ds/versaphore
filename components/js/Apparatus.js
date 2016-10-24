var React = require('react');
var _ = require('lodash');

var Apparatus = React.createClass({

    gsheetToHTML: function(string){

        var html = "";

        switch(string){
            case "/br": html = {__html: "<br/>"}; break;
            case "/tab": html = {__html: "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"}; break;
            case "/span": html = ""; break;
            default: html = string + " "; break;
        }

        return html;
    },

    handleMouseOver: function(e){

        e.preventDefault(e);
        this.props.compareReadings(e.currentTarget);

    },

    render: function(){


        var reactKey = 0;
        var apparatusHTML = _.map(this.props.apparatus, function(item,index){

            var currID = _.keys(item);
            var currApp = item[currID];

            var spanHTML = _.map(currApp, function(item,index){

                var html = this.gsheetToHTML(item);

                var className = this.props.base === index ? index : index + " hide";

                if( _.isObject(html)){

                    return <span key = { index } className={ className } dangerouslySetInnerHTML={ html }></span>;

                } else {

                    return <span key = { index } className={ className }>{ html }</span>;

                }

            }.bind(this));

            return <span key = { index } className = { currID } onMouseOver={ this.handleMouseOver }>{ spanHTML }</span>;

        }.bind(this));

        return(
            <div className = "col-md-6 pull-left">   
            { apparatusHTML }
            </div>
        );
    }
});


module.exports = Apparatus;