 var app=angular.module('BlankApp', ['ngMaterial']);

 app.controller('AppCtrl', function($timeout) {
 		var data =[];
 		var total =100;
 		var that= this;
 		this.getData = function(limit) {

 			return {
 				limit:limit,
 				data:data,
 				count:total
 			}
 		}
 		
        // In this example, we set up our model using a plain object.
        // Using a class works too. All that matters is that we implement
        // getItemAtIndex and getLength.
        this.infiniteItems = {
          numLoaded_: 0,
          toLoad_: 0,
          data:[],
          limit:10,

          // Required.
          getItemAtIndex: function(index) {
            if (index > this.numLoaded_) {
              this.fetchMoreItems_(index);
              return null;
            }

            return index;
          },

          // Required.
          // For infinite scroll behavior, we always return a slightly higher
          // number than the previously loaded items.
          getLength: function() {
            return this.numLoaded_ + this.limit;
          },

          fetchMoreItems_: function(index) {
            // For demo purposes, we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            if (this.toLoad_ < index) {
              this.toLoad_ += 10;

              $timeout(angular.noop, 300).then(angular.bind(this, function() {

              	var limit =that.getData().count  - (that.getData().count - this.toLoad_);
              	if(limit<=that.getData().count){
              		this.data= that.getData().data;
                	this.numLoaded_ =limit;
                	
                }else{
                	 this.limit =0;
                }

              }));
            }
          }
        };
      });
