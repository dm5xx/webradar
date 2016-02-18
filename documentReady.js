$(document).ready(function () {
    showOnly = getURLParameter("showOnly");
    autoClean = (getURLParameter("autoClean"));

    if (showOnly == null) { showOnly = 0; }
    else
        showOnly = parseInt(showOnly);

    if (autoClean == null)
        autoClean = 0;
    else
        autoClean = autoClean * 1000;

    if (showOnly == null || showOnly == 0)
        isCleanup = false;
    else
        isCleanup = true;

    updateDxSpots(lastCallingId, init);
    setInterval(function () { updateDxSpots(lastCallingId, update); }, 5000);
});
