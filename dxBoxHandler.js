
var renderMyRows = function renderMyRows(myJsonData) {
		row = Mustache.to_html(templating, myJsonData);
		$('#myTable').append(row);
		$(".ajax").colorbox({ width: "600px", height: "400px", iframe: true });
}


var appendNewRow = function appendNewRow(myJsonData) {
	row = Mustache.to_html(templating, myJsonData);
	var newRow = $(row);
	newRow.hide();
	$('#myTable > tbody > tr:first').before(newRow);
	$(".ajax").colorbox({ width: "600px", height: "400px", iframe: true });
	newRow.fadeIn(1000);
	newRow.glowEffect(0, 10, 500);
}
