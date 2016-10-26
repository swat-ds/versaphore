var React = require('react'),
    _ = require('lodash');

var Reading = React.createClass({

    getInitialState: function() {

        return { 
            opacity: 0,
            excludeList: [] 
        };  
    },

    componentDidMount: function(){
        this.setOpacity();
    },

    setOpacity: function(){

        var opacity = this.props.appID == "span" ? 0 : 0.1;
        return opacity;
    },

    editDistance: function(array){

        // console.log(this.state.excludeList[0]);
        // var excludeList = this.state.excludeList;

        // var currentStrings = _.filter(this.props.currApp, function(item,index){
        //     return !_.has(_.keys(item), excludeList);
        // }.bind(this));
        
        return 1;
    },

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
        this.props.getCurrentReadings(this.props.appID.toString());

    },

    render: function(){

        var spanHTML = _.map(this.props.currApp, function(item,index){

            var html = this.gsheetToHTML(item);

            var className = this.props.base === index ? index : index + " hide";

            if( _.isObject(html)){

                return (<span key = { index } className={ className } dangerouslySetInnerHTML={ html }></span>);

            } else {

                return (<span key = { index } className={ className } style={ {backgroundColor:"rgba(55,100,55," + this.state.opacity + ")"} }>{ html }</span>);
            }

        }.bind(this));


        return( 
            <span className = { this.props.appID } onMouseOver={ this.handleMouseOver }>{ spanHTML }</span>
        );
    }
});


module.exports = Reading;