var map = new L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/{type}/{z}/{x}/{y}.{ext}', {
	type: 'map',
	ext: 'png',
	attribution: 'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	subdomains: '1234'
});
		///var map = L.map('map').setView([20, 30], 3, layers : [MapQuestOpen_OSM]);
var mapCenter = new L.LatLng(20,30);
var map = new L.map('map', { center : mapCenter, zoom : 3, layers : [map] })
map.on("load", initmarkers);

var t = L.terminator();
t.addTo(map);

setInterval(function(){updateTerminator(t)}, 500);
		
function updateTerminator(t) {
	var t2 = L.terminator();
	t.setLatLngs(t2.getLatLngs());
	t.redraw();
}
				