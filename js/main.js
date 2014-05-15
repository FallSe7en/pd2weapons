"use strict";

requirejs.config({
    paths: {
        jquery   : "lib/jquery-2.1.0.min",
        knockout : "lib/knockout-3.1.0"
    }
});

define([ "presentation", "data" ], function (Presentation, WeaponsData) {
    window.p = new Presentation(WeaponsData);
});
