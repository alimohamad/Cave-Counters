import { Meteor } from 'meteor/meteor';
import {Counters} from '../imports/api/items.js';


Meteor.startup(() => {
  // code to run on server at startup
});


//Methods

Meteor.methods({
   
    newCounter: function(counterName, counterTag, index, ogDate){
        
        Counters.insert({name: counterName, tag: counterTag, index: index, originalDate: ogDate, startDate: ogDate, daysSince: 0, resets: 0});
        
    },
    
    
    incrementCounter: function(){
        
        for(i = 0; i < Counters.find().count(); i++){
            
            var counter = Counters.findOne({index : i});
            Counters.update({index: i},{$inc: {daysSince: 1}});
            
        }
        
        
    },
    
    resetCounter: function(){}
    
    
});


// Publishing

Meteor.publish('counters', function(){
    
    return Counters.find();
    
}); 