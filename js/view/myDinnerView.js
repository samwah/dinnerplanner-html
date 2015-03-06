//ExampleView Object constructor
var MyDinnerView = function (container, model) {
	
	// Get all the relevant elements of the view (ones that show data
  	// and/or ones that responed to interaction)

	this.numberOfGuests = container.find("#numberOfGuests");
	this.plusButton = container.find("#plusGuest");
	this.minusButton = container.find("#minusGuest");
	this.confirmDinner = container.find("#confirmDinner");
	this.pendingCost = container.find("#pendingCost");
	this.pendingList = container.find("#pendingList");
	this.pendingFirst = container.find("#pendingFirst");

	
	//this.numberOfGuests.val(model.getNumberOfGuests());
	//this.numberOfGuests.html(this.numberOfGuests.val());

	model.addObserver(this);

	this.updateGuests = function() {
		this.numberOfGuests.val(model.getNumberOfGuests());
		this.numberOfGuests.html("People: "+this.numberOfGuests.val());
	};

	var updatePending = function(numGuests) {

		var output = "";


		for (item in model.menu){
			console.log(model.menu[item]);

			var sum = 0;
			for(i = 0; i<model.menu[item].ingredients.length; i++){
					sum += model.menu[item].ingredients[i].MetricQuantity;
				}
			sum = parseFloat(sum.toFixed(2));

			output = output + "<div class='row'><div class='col-md-8'><a class='inspect_link' id="+model.menu[item].id+">"+model.menu[item].name+"</a></div>"+
			"<div class='col-md-4'> "+sum*numGuests+""+
			"<button id='"+model.menu[item].id+"' class='remove_btn btn'>X</button>"+"</div></div>";

			console.log(model.menu[item].id);
		}

		output = output;
		this.pendingList.innerHTML = output;

		if(model.getView() == 2){
			this.pendingFirst.innerHTML = 0;
			model.pendingPrice = 0;
		}
		else{
			this.pendingFirst.innerHTML = parseFloat(model.pendingPrice.toFixed(2));
		}

		this.pendingCost.innerHTML = parseFloat((model.getTotalMenuPrice()+model.pendingPrice).toFixed(2));
	};

	this.hideView = function(){
		//this.test.css( "display", "none" );
		container.hide();
	}

	this.showView = function(){
		container.show();
	}

	this.updateView = function(){
		if (model.activeView()==2 || model.activeView()==3) {
			this.showView();
		} else {
			this.hideView();
		}
		console.log(model.activeView())

	}


	this.update = function(obj) {
		this.updateGuests();
		this.updateView();
		updatePending(this.numberOfGuests.val());
	};

	//this.updateGuests();
	//updatePending();

}
 
