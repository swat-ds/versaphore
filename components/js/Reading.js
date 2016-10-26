var React = require('react'),
    _ = require('lodash'),
    Levenshtein = require('levenshtein');

var Reading = React.createClass({

    getOpacity: function(){

        var avgEditDistance = this.getAvgEditDistance();
        var opacity = avgEditDistance/30 > 1 ? 1 : avgEditDistance/30;
        return opacity;
    },

    getAvgEditDistance: function(array){

        var excludeList = this.props.excludes;

        var lDists = _.map(this.props.currApp, function(item,index){

            if(
                !_.isEmpty(item)
                && !_.isEmpty(this.props.currApp[this.props.base])
                && !_.includes(this.props.excludes, index)
            ) {
                var l = new Levenshtein(this.props.currApp[this.props.base],item);
                return l.distance;
            }
        }.bind(this));

        var meanDistance = _.meanBy(lDists);
        return meanDistance;
    },

    getLevenshteinDistance: function(s1,s2){
        // taken from @mhosen1 comment @andrei-m gist <https://gist.github.com/andrei-m/982927>
        if (!s1.length) return s1.length;
        if (!s2.length) return s2.length;

        return Math.min(
            this.getLevenshteinDistance(s1.substr(1), s2) + 1,
            this.getLevenshteinDistance(s2.substr(1), s1) + 1,
            this.getLevenshteinDistance(s1.substr(1), s2.substr(1)) + (s1[0] !== s2[0] ? 1 : 0)
        ) + 1;
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

        var opacity = this.props.appID == "span" ? {} 
            : {backgroundColor:"rgba(55,100,55," + this.getOpacity() + ")"};
            
        var spanHTML = _.map(this.props.currApp, function(item,index){

            var html = this.gsheetToHTML(item);

            var className = this.props.base === index ? index : index + " hide";

            if( _.isObject(html)){

                return (<span key = { index } className={ className } dangerouslySetInnerHTML={ html }></span>);

            } else {

                return (<span key = { index } className={ className } >{ html }</span>);
            }

        }.bind(this));


        return( 
            <span className = { this.props.appID } style={ opacity } onMouseOver={ this.handleMouseOver }>{ spanHTML }</span>
        );
    }
});


module.exports = Reading;