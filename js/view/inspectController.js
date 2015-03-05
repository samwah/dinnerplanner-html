var InspectController = function(view, model) {

/*
	 view.dishType.on('change',function(){
	 	model.notifyObservers();
	 	//alert(model.getNumberOfGuests());
	 });
*/
	 view.goBack.click(function(){
	 	model.activeView(2);
	 	//alert(model.getNumberOfGuests());
	 });

	 view.confirmDish.click(function(){
	 	console.log("INTO MENU "+ model.inspectedItem);
	 	model.addDishToMenu(model.inspectedItem);
	 	model.activeView(2);
	 	//alert(model.getNumberOfGuests());
	 });

	$(document).on('click', '.inspectItem', function(){
		model.inspectedItem = $(this).attr("id");
		model.activeView(3);
	});


}