function clearMarkers() {
    markers.forEach(function(element) {
        map.removeLayer(element);
    }, this);

    spotmarkers.forEach(function (element) {
        map.removeLayer(element);
    }, this)
}


// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
	clearMarkers();
	markers = [];
	spotmarkers = [];
}

// add a marker
function addMyMarker(aCurrentElement) {
    createDxMarkerSet(aCurrentElement);
}


function initmarkers() {
    if (globalJsonData.length > showOnly)
        markerFillHandler(globalJsonData);
    else
        window.setTimeout(initmarkers, 1000);
}

function refillmarkers() {
    var descendingArray = collectivJsonArray.slice(0);
    markerFillHandler(descendingArray.reverse());
}

function markerFillHandler(sourceArray) {
    if (showOnly > sourceArray.length)
        showOnly = sourceArray.length;

    var firstElements = sourceArray.slice(0, showOnly);

    for (var i = 0; i < showOnly; i++) {
        createDxMarkerSet(firstElements[i]);
    }

    isInit = true;
}

function createDxMarkerSet(myElementSet) {

    var latlong = new L.LatLng(myElementSet.lat, myElementSet.lon);
    var slatlong = new L.LatLng(myElementSet.slat, myElementSet.slon);

    var callInfo = {
        Spotter: myElementSet.spc,
        Dx: myElementSet.dxc,
        Qrg: myElementSet.qrg,
        Time: myElementSet.tim,
        Country: myElementSet.inf,
        LatLon: latlong, // change osm
        SLatLon: slatlong // change osm
    }

    addDxmarker(callInfo);
    addSpotmarker(callInfo);
    addPath(callInfo);
}


function addDxmarker(callInfo) {
    addmarker(callInfo, false);
}

function addSpotmarker(callInfo) {
    addmarker(callInfo, true);
}

function addmarker(callInfo, isSpotter) {

    var actualLatLon;
    var theColor = "center";
    var theArray;

    if (isSpotter) {
        actualLatLon = callInfo.SLatLon;
        theArray = spotmarkers;
    } else {
        actualLatLon = callInfo.LatLon;
        theColor = getPinName(callInfo.Qrg);
        theArray = markers;
    }

    var myIcon = L.icon({
        iconUrl: 'http://dxradar.mmmedia-online.de/images/' + theColor + '.png',

        iconSize: [12, 20], // size of the icon
        iconAnchor: [6, 20], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -20] // point from which the popup should open relative to the iconAnchor
    });

    var mhMyToDX = new GHelper(lat1, lng1, callInfo.LatLon.lat, callInfo.LatLon.lng);
    var mhMyToSpot = new GHelper(lat1, lng1, callInfo.SLatLon.lat, callInfo.SLatLon.lng);
    var mhTheirs = new GHelper(callInfo.LatLon.lat, callInfo.LatLon.lng, callInfo.SLatLon.lat, callInfo.SLatLon.lng);

    var html = "";
    if (isSpotter) {
        html = html + "<b>" + callInfo.Spotter + "</b> found " + callInfo.Dx + " in " + callInfo.Country + "<BR/>";
        html = html + "QRG: " + callInfo.Qrg + " @ " + callInfo.Time + "<BR/>";
    } else {
        html = html + "<b>" + callInfo.Dx + "</b>, " + callInfo.Country + " spotted by " + callInfo.Spotter + "<BR/>";
        html = html + "QRG: " + callInfo.Qrg + " @ " + callInfo.Time + "<BR/>";
    }
    html = html + "Myself to: " + callInfo.Dx + ": " + mhMyToDX.Heading() + "&deg;(" + mhMyToDX.Longpath() + "&deg;)" + " - " + mhMyToDX.Distance() + "km" + "<BR/>";
    html = html + "Myself to: " + callInfo.Spotter + ": " + mhMyToSpot.Heading() + "&deg;(" + mhMyToSpot.Longpath() + "&deg;)" + " - " + mhMyToSpot.Distance() + "km" + "<BR/>";
    html = html + callInfo.Dx + " to " + callInfo.Spotter + ": " + mhTheirs.Heading() + "&deg;|" + mhTheirs.Longpath() + "&deg; - " + mhTheirs.Distance() + "km" + "<BR/>";

    var marker = L.marker(actualLatLon, { icon: myIcon }).addTo(map).bindPopup(html);

    theArray.push(marker);
}

function addPath(callInfo) {
    var Geodesic = L.geodesic([[callInfo.LatLon, callInfo.SLatLon]], {
        weight: 1,
        opacity: 0.5,
        color: 'blue',
        steps: 100
    }).addTo(map);
}

/*---------------------------------------------------------- Callbacks ------------------------------------------- */

function cleanupCallback() {
    if (isCleanup) {
        deleteMarkers();
        refillmarkers();
    }
}

function addMarkerCleanupCallback(element) {
    if (!isCleanup) {
        addMyMarker(element);
    }
}