
// force datat update by interval functionfff
var update = function (data) {
    globalJsonData = data;
    jsonObjectCollector(cleanupCallback);
}

// call service
var updateDxSpots = function updateDxSpots(lastCallingId, callback) {
    var html = '';
    var row;
    var jsonMyUrl = 'http://dxc.mmmedia-online.de/API/Cluster/Get/' + lastCallingId;
    getAllContent(jsonMyUrl, callback);
};

// ajax call, take data and send data to update function
var getAllContent = function (jsonMyUrl, callback) {
    jQuery.support.cors = true;

    return $.ajax({
        crossDomain: true,
        async: true,
        type: "GET",
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        url: jsonMyUrl,
        contentType: "application/json",
        dataType: "json",
        success: function (data) { callback(data); }
    });
}


//
var jsonObjectCollector = function (cleanUpCallBack) {

    var globalLenght = globalJsonData.length;

    for (var i = globalJsonData.length - 1; i >= 0; i--) {
        collectivJsonArray.pushIfNotExist(globalJsonData[i], function (e) {
            return e.id === globalJsonData[i].id;
        }, addMarkerCleanupCallback);
    }
    if (globalLenght > 0)
        lastCallingId = globalJsonData[0].id;

    // funky stuff if you are in cleanup mode and drawed markers
    cleanUpCallBack();
}

var init = function (data) {

    globalJsonData = data;
    jsonObjectCollector(cleanupCallback);

    for (var i = 0; i < globalJsonData.length; i++) {

        var mapHelper = new GHelper(lat1, lng1, globalJsonData[i].lat, globalJsonData[i].lon);

        var dxEntry = {
            spc: globalJsonData[i].spc,
            qrg: globalJsonData[i].qrg,
            dxc: globalJsonData[i].dxc,
            com: globalJsonData[i].com,
            tim: globalJsonData[i].tim,
            //ide: globalJsonData[i].ide,
            //con: globalJsonData[i].con,
            inf: globalJsonData[i].inf,
            //lat: globalJsonData[i].lat,
            //lon: globalJsonData[i].lon,
            bea: mapHelper.Heading(),
            lop: mapHelper.Longpath(),
            dis: mapHelper.Distance(),
            map: '<a class="ajax" href="map.html?lat=' + globalJsonData[i].lat + '&lon=' + globalJsonData[i].lon + '">map</a>'
        }

        //renderMyRows(dxEntry);
    }
}


// expand the array functionality...

Array.prototype.inArray = function (comparer) {
    for (var i = 0; i < this.length; i++) {
        if (comparer(this[i])) return true;
    }
    return false;
};

Array.prototype.pushIfNotExist = function (element, comparer, cleanupCallback) {
    if (!this.inArray(comparer)) {
        this.push(element);

        var mapHelper = new GHelper(lat1, lng1, element.lat, element.lon);

        var dxEntry = {
            spc: element.spc,
            qrg: element.qrg,
            dxc: element.dxc,
            com: element.com,
            tim: element.tim,
            //ide: globalJsonData[i].ide,
            //con: globalJsonData[i].con,
            inf: element.inf,
            lat: element.lat,
            lon: element.lon,
            bea: mapHelper.Heading(),
            lop: mapHelper.Longpath(),
            dis: mapHelper.Distance(),
            map: '<a class="ajax" href="map.html?lat=' + element.lat + '&lon=' + element.lon + '">map</a>'
        }

        //appendNewRow(dxEntry);
		
        // do some funky stuff if u are in cleanup mode...
        cleanupCallback(element)
    }
};

