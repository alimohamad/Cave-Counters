//Imports

import {Template} from 'meteor/templating';

import {Counters} from '../api/items.js';

import './body.html';

import './body.css';

import './landing.html';

import './counter.html';

import './auth.html';

import './dash.html';


//Subscribing

Meteor.subscribe('counters');


//Routes

Router.route('/', { //Home Page
    
    name: 'landing',
    template: 'landing'

});

Router.route('/counter/:_id', { //Counter Page
    
    name: 'counter',
    template: 'counter',
    
    data: function(){
        var currentCounter = this.params._id;
        return Counters.findOne({ _id: currentCounter});
    }
    
});

Router.route('/auth', function () { //Authentication Page
    this.render('auth');
});

Router.route('/61c6d16c-4d1a-4165-9346-847d77a64254', function () { //Dashboard Page
    this.render('dash');
});



//Helpers & Events

Template.landing.helpers({

      activeCounters: function(){ //Array of active counters.
             
        var counters = [];
        
        for(i = 0; i < Counters.find().count(); i++){
            
            counters[i] = Counters.findOne({index: i});
                
        }
                
        return counters;
        
    }  

});

Template.landing.events({ //Sets selected counter to pull that data.
    
    'click .counter-nav': function(){
        
        Session.set('selectedCounter', this);
        
    }
    
    
});


Meteor.setInterval(function increment(){ //Call Method Every 24 Hours to Increment Counter

    Meteor.call('incrementCounter');
    
}, 86400000);



Template.counter.helpers({
   
    
    dayCounter: function(){ //Number of days since an occurrence.
        
        var counter = Session.get('selectedCounter');
        
        var daysSince = counter.daysSince;

        return daysSince;
        
    },
                                       

    counterTagline: function() { //What the counter is measuring.
        
        var counter = Session.get('selectedCounter');
        
        var tagline = counter.tag;

        return tagline;            
            
    },
                                       
    
    
    
});

Template.auth.events({});


Template.dash.helpers({
    
    activeCounters: function(){//Array of active counters.
             
        var counters = [];
        
        for(i = 0; i < Counters.find().count(); i++){
            
            counters[i] = Counters.findOne({index: i});
                
        }
                
        return counters;
        
    }    
    
});


Template.dash.events({
    
    'submit #add-counter': function(event){ //New Counter!
        
        var date = new Date();
        var ogDate = {
            
            date: date.getDate(),
            month: date.getMonth(),
            year: date.getFullYear()
            
        }

        var counterName = event.target.cName.value;
        var counterTag = event.target.cTag.value;
        var index = Counters.find().count();
        
        Meteor.call('newCounter', counterName, counterTag, index, ogDate);
                        
    },
    
    
});