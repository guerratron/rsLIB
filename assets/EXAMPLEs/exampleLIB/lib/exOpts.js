var exOpts;
(function (exOpts) {
    "use strict";
    var TAG = "'exOpts' in Example-LIB";
    function getTAG() {
        return TAG;
    }
    //API PÚBLICA
    exOpts.getTAG = getTAG;
})(exOpts || (exOpts = {}));
