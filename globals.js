var lastCallingId = '0';
var globalJsonData = [];
var markers = [];
var spotmarkers = [];
var collectivJsonArray = new Array();
var lat1 = 49.356383;
var lng1 = 11.1605;
var isInit = false;
var isCleanup = false;
var showOnly;
var autoClean = 0;
var L;


function getPinName(qrg) {

	var wert = parseInt(qrg);
	if (wert > 1000 && wert < 2000)
		return "160";
	if (wert > 3000 && wert < 4000)
		return "80";
	if (wert > 6000 && wert < 8000)
		return "40";
	if (wert > 9000 && wert < 11000)
		return "30";
	if (wert > 13000 && wert < 15000)
		return "20";
	if (wert > 17000 && wert < 19000)
		return "17";
	if (wert > 20000 && wert < 22000)
		return "15";
	if (wert > 24000 && wert < 25000)
		return "12";
	if (wert > 27000 && wert < 31000)
		return "10";

	return "6";
}

function getURLParameter(name) {
	return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [, ""])[1].replace(/\+/g, '%20')) || 0;
}
