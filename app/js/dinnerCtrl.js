// Dinner controller that we use whenever we have view that needs to 
// display or modify the dinner menu
dinnerPlannerApp.controller('DinnerCtrl', function ($scope,Dinner) {

	//var apiKey = "dvxTU5WwHw2BY5uT8iYX278xv4DXbUBP";
	var apiKey= "dvxVMoURtQ38bKtLPt7dMRI95Tm07Lad";

	$scope.numberOfGuests = Dinner.getNumberOfGuests();

	var numberOfGuests = 2;
	var menu = [];
	this.inspectedItem = 1;
	this.pendingPrice = 0;
	this.currentDish = {};

	this.DishSearch = $resource('http://api.bigoven.com/recipes',{pg:1,rpp:25,api_key:apiKey});
	this.Dish = $resource('http://api.bigoven.com/recipe/:id',{api_key:apiKey}); 

	$scope.setNumberOfGuest = function(number){
		Dinner.setNumberOfGuests(number);
	}

	$scope.getNumberOfGuests = function() {
		return Dinner.getNumberOfGuests();
	}

	this.getSelectedDish = function(type) {
		for(key in menu){
			if(menu[key].type == type){
				return menu[key];
			}
		}
	}

	this.getFullMenu = function() {
		return menu;
	}

	this.getAllIngredients = function() {
		var list_ingredients = [];

		for(key in menu){
			list_ingredients = list_ingredients.concat(menu[key].ingredients);
		}

		return list_ingredients;
	}

	this.getDishPrice = function(id){
		var sum = 0;
		for(key in menu){
			if(menu[key].id == id) {
				for(i = 0; i<menu[key].ingredients.length; i++){
					console.log("FOKC"+menu[key].ingredients[i].price);
					sum += menu[key].ingredients[i].price;
				}
			}
		}
		return sum;
	}

	this.getTotalMenuPrice = function() {
		var list_ingredients = this.getAllIngredients();
		var sum = 0;

		for(ing in list_ingredients){
			//alert("ingredient.price");
			sum = sum + list_ingredients[ing].MetricQuantity;
		}

		return parseFloat(sum*numberOfGuests.toFixed(2));
	}

	this.addDishToMenu = function(id) {
		menu.push(this.currentDish);
	}

	//Removes dish from menu
	this.removeDishFromMenu = function(id) {
	  for(key in menu){
			if(menu[key].id == id) {
				//console.log(key);
				menu.splice(key,1);
			}
		}
	}

}

  // TODO in Lab 5: Implement the methods to get the dinner menu
  // add dish to menu and get total menu price