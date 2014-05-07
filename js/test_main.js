"use strict";

requirejs.config({
    paths: {
        jquery   : "lib/jquery-2.1.0.min",
        knockout : "lib/knockout-3.1.0",

        QUnit    : "lib/qunit-1.14.0"
    },

    shim: {
        QUnit: {
            exports: "QUnit",
            init: function () {
                QUnit.config.autoload  = false;
                QUnit.config.autostart = false;
            }
        }
    }
});

require(
    [
        "QUnit",

        "t/mod",
        "t/weapon"
    ],
    function (Q, modTests, weaponTests) {
        modTests.run();
        weaponTests.run();

        Q.load();
        Q.start();
    }
);
