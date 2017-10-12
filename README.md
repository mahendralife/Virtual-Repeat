# Virtual-Repeat
Display an infinitely growing list of items in a viewport of only 7 rows (height=40px).   This demo shows scroll and rendering performance gains when using md-virtual-repeat; achieved with the dynamic reuse of rows visible in the viewport area. Developers are required to explicitly use md-virtual-repeat-container as a wrapping parent container.   To enable infinite scroll behavior, developers must pass in a custom instance of mdVirtualRepeatModel (see the example's source for more info).

#This Virtual Repeat automatically stop scrolling if no record on database you must be update total record after firest http request

 
 		var that= this;
 		
 		this.data=[]; 
 		/**
 		 * 	this.data=[];  
 		 * 	this is ng-repeat array map with virtual repeater 
 		 * 	(md-virtual-repeat )  
 		 * 
 		 */

 		 //this demo purpose only to push the data on array 
 		this.getData = function(start, end) {
      console.log("call ajax request", start, end);
 			var data=[];
 			// console.log(start)
 			// if(start ==11){
 			// 	end = end-5;
 			// }
 			
 			for(var i=start; i<=end; i++){
 				data.push({title:'title-'+ i});
 			}

 			this.data=this.data.concat(data);
 			return data.length;
 		 }
 		
      // In this example, we set up our model using a plain object.
      // Using a class works too. All that matters is that we implement
      // getItemAtIndex and getLength.
        this.infiniteItems = {

          numLoaded_: 0,// Required.
          toLoad_: 0,// Required.
          total:10, //default 10 records update after http response 
          itemPerPage:10, //item per page to show records 
          limit:10, //temporary to controll infinite loop  it's grater or equal to itemPerPage


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

            // we simulate loading more items with a timed
            // promise. In real code, this function would likely contain an
            // $http request.

            if (this.toLoad_ < index) {

              this.toLoad_ += this.itemPerPage;
              $timeout(angular.noop, 300).then(angular.bind(this, function() {

                if(index <= this.total){ 
                  //request only if index is less than total records
                  that.getData(index , this.toLoad_); //http request.
                }

              	if(this.total  - (this.total - this.toLoad_) <=this.total){
              		
              		//that.getData(start , end )
              		//start =1 
              		//end = 10
              		//call htttp request here after response success update total like 
              		//this.total =100 
              		this.total=25;

                	this.numLoaded_ =this.toLoad_;
                	
                }else{
                	 this.limit =0;
                   this.numLoaded_ = this.total;
                }

              }));
            }
          }
        };
   
