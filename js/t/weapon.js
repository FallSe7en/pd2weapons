define([ "weapon", "mod" ], function (Weapon, Mod) {
    "use strict";

    var testDetails = {
        name          : "Gun",

        price         : 10,
        magazine      : 6,
        totalAmmo     : 18,
        rateOfFire    : 2,
        damage        : 1,
        accuracy      : 10,
        stability     : 15,
        concealment   : 5,
        threat        : 3,

        imageUrl      : "gun_picture.png",

        modifications : [
            {
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
            },
            {
                name         : "Mod 2",
                slot         : "Sight",

                price        : 7,
                magazine     : 0,
                totalAmmo    : 0,
                rateOfFire   : 0,
                damage       : 0,
                accuracy     : 2,
                stability    : 2,
                concealment  : 0,
                threat       : 0,

                imageUrl     : "mod_2_picture.png"
            }
        ]
    };

    return { run: function () {
        module("Weapon");

        test("Instantiate Weapon", function () {
            var w = new Weapon(testDetails);
            ok(w instanceof Weapon);
        });

        test("Get Available Mods", function () {
            var w  = new Weapon(testDetails),
                m1 = new Mod(testDetails.modifications[0]),
                m2 = new Mod(testDetails.modifications[1]);

            deepEqual(w.getAvailableMods("Barrel Extension"), [ m1 ]);
            deepEqual(w.getAvailableMods("Sight"), [ m2 ]);
        });

        test("Get Mod Slots", function () {
            var w = new Weapon(testDetails);

            deepEqual(
                w.getModSlots(),
                [
                    {
                        mod  : undefined,
                        name : "Barrel Extension"
                    },
                    {
                        mod  : undefined,
                        name : "Sight"
                    }
                ]
            );
        });

        test("Add/Remove Mod", function () {
            var w  = new Weapon(testDetails),
                m1 = new Mod(testDetails.modifications[0]),
                m2 = new Mod(testDetails.modifications[1]);

            w.addMod(m1);

            deepEqual(
                w.getModSlots(),
                [
                    {
                        mod  : m1,
                        name : "Barrel Extension"
                    },
                    {
                        mod  : undefined,
                        name : "Sight"
                    }
                ]
            );

            w.removeMod("Barrel Extension");

            deepEqual(
                w.getModSlots(),
                [
                    {
                        mod  : undefined,
                        name : "Barrel Extension"
                    },
                    {
                        mod  : undefined,
                        name : "Sight"
                    }
                ]
            );
        });

        test("Clear Mods", function () {
            var w  = new Weapon(testDetails),
                m1 = new Mod(testDetails.modifications[0]),
                m2 = new Mod(testDetails.modifications[1]);

            w.addMod(m1).addMod(m2);
            w.clearMods();

            deepEqual(
                w.getModSlots(),
                [
                    {
                        mod  : undefined,
                        name : "Barrel Extension"
                    },
                    {
                        mod  : undefined,
                        name : "Sight"
                    }
                ]
            );
        });

        test("Get Summarized Stats", function () {
            var w  = new Weapon(testDetails),
                m1 = new Mod(testDetails.modifications[0]),
                m2 = new Mod(testDetails.modifications[1]);

            w.addMod(m1).addMod(m2);

            deepEqual(
                w.getSummarizedStats(),
                [
                    {
                        name  : "price",
                        value : 20,
                    },
                    {
                        name  : "magazine",
                        value : 6,
                    },
                    {
                        name  : "totalAmmo",
                        value : 18,
                    },
                    {
                        name  : "rateOfFire",
                        value : 2,
                    },
                    {
                        name  : "damage",
                        value : 2,
                    },
                    {
                        name  : "accuracy",
                        value : 13,
                    },
                    {
                        name  : "stability",
                        value : 16,
                    },
                    {
                        name  : "concealment",
                        value : 5,
                    },
                    {
                        name  : "threat",
                        value : 4,
                    },
                ]
            );
        });
    } };
});
