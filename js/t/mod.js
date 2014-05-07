define([ "mod" ], function (Mod) {
    "use strict";

    var testDetails = {
        name         : "Mod 1",
        slot         : "Barrel Extension",

        price        : 3,
        magazine     : 0,
        totalAmmo    : 0,
        rateOfFire   : 0,
        damage       : 1,
        accuracy     : 1,
        stability    : -1,
        concealment  : 0,
        threat       : 1,

        imageUrl     : "mod_1_picture.png"
    };

    return { run: function () {
        module("Mod");

        test("Instantiate Mod", function () {
            var m = new Mod(testDetails);
            ok(m instanceof Mod);
        });

        test("Test Mod Attributes Properly Initialized", function () {
            var m = new Mod(testDetails);

            equal(m.price,       3);
            equal(m.magazine,    0);
            equal(m.totalAmmo,   0);
            equal(m.rateOfFire,  0);
            equal(m.damage,      1);
            equal(m.accuracy,    1);
            equal(m.stability,  -1);
            equal(m.concealment, 0);
            equal(m.threat,      1);
        });
    } };
});
