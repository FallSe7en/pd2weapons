define([], function () {
    return {
        name          : "AMR-16",

        price         : 896000,
        magazine      : 30,
        totalAmmo     : 90,
        rateOfFire    : 860,
        damage        : 30,
        accuracy      : 12,
        stability     : 20,
        concealment   : 17,
        threat        : 14,

        imageUrl      : "img/gun/assault_rifle/AMR-16.png",

        modifications : [
            {
                name        : "Long Barrel",
                slot        : "Barrel",

                price       : 139000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 5,
                accuracy    : 2,
                stability   : 0,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/barrel/Long_Barrel_(CAR-4).png"
            },
            {
                name        : "Low Profile Suppressor",
                slot        : "Barrel Extension",

                price       : 102000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : -12,
                accuracy    : 0,
                stability   : 0,
                concealment : 0,
                threat      : -14,

                imageUrl    : "img/mod/barrel_extension/Low_Profile_Suppressor.png"
            },
            {
                name        : "Medium Suppressor",
                slot        : "Barrel Extension",

                price       : 69000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : -7,
                accuracy    : 0,
                stability   : 1,
                concealment : -2,
                threat      : -14,

                imageUrl    : "img/mod/barrel_extension/Medium_Suppressor.png"
            },
            {
                name        : "The Bigger The Better Suppressor",
                slot        : "Barrel Extension",

                price       : 178000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : -2,
                accuracy    : 0,
                stability   : 3,
                concealment : -3,
                threat      : -14,

                imageUrl    : "img/mod/barrel_extension/The_Bigger_The_Better.png"
            },
            {
                name        : "Stubby Compensator",
                slot        : "Barrel Extension",

                price       : 102000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 3,
                accuracy    : 0,
                stability   : 3,
                concealment : 0,
                threat      : 6,

                imageUrl    : "img/mod/barrel_extension/Stubby.png"
            },
            {
                name        : "The Tank Compensator",
                slot        : "Barrel Extension",

                price       : 139000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 5,
                accuracy    : 0,
                stability   : 2,
                concealment : -1,
                threat      : 8,

                imageUrl    : "img/mod/barrel_extension/The_Tank.png"
            },
            {
                name        : "Fire Breather Nozzle",
                slot        : "Barrel Extension",

                price       : 178000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 8,
                accuracy    : 0,
                stability   : 1,
                concealment : -2,
                threat      : 14,

                imageUrl    : "img/mod/barrel_extension/Fire_Breather.png"
            },
            {
                name        : "Tactical Compensator",
                slot        : "Barrel Extension",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 2,
                accuracy    : 6,
                stability   : 0,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/barrel_extension/Tactical_Compensator.png"
            },
            {
                name        : "Competitor's Compensator",
                slot        : "Barrel Extension",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 5,
                accuracy    : 2,
                stability   : 3,
                concealment : -2,
                threat      : 6,

                imageUrl    : "img/mod/barrel_extension/Competitors_Compensator.png"
            },
            {
                name        : "Funnel of Fun Nozzle",
                slot        : "Barrel Extension",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 10,
                accuracy    : -4,
                stability   : 0,
                concealment : -2,
                threat      : 14,

                imageUrl    : "img/mod/barrel_extension/Funnel_of_Fun.png"
            },
            {
                name        : "Single Fire",
                slot        : "Custom",

                price       : 249200,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 2,
                stability   : -1,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/custom/Single_Fire.png"
            },
            {
                name        : "Auto Fire",
                slot        : "Custom",

                price       : 249800,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 3,
                accuracy    : -2,
                stability   : 2,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/custom/Auto_Fire.png"
            },
            {
                name        : "Tactical Handguard",
                slot        : "Foregrip",

                price       : 263000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 2,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/foregrip/Tactical_Handguard.png"
            },
            {
                name        : "Blast From the Past Hanguard",
                slot        : "Foregrip",

                price       : 401000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : 2,
                threat      : 0,

                imageUrl    : "img/mod/foregrip/Blast_From_The_Past.png"
            },
            {
                name        : "Assault Light",
                slot        : "Gadget",

                price       : 102000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 0,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/gadget/Assault_Light.png"
            },
            {
                name        : "Tactical Laser Module",
                slot        : "Gadget",

                price       : 178000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 0,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/gadget/Tactical_Laser_Module.png"
            },
            {
                name        : "Compact Laser Module",
                slot        : "Gadget",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 0,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/gadget/Compact_Laser_Module.png"
            },
            {
                name        : "Military Laser Module",
                slot        : "Gadget",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/gadget/Military_Laser_Module.png"
            },
            {
                name        : "Ergo Grip",
                slot        : "Grip",

                price       : 69000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/grip/Ergo_Grip.png"
            },
            {
                name        : "Pro Grip",
                slot        : "Grip",

                price       : 220000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 2,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/grip/Pro_Grip.png"
            },
            {
                name        : "Rubber Grip",
                slot        : "Grip",

                price       : 96600,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 2,
                stability   : 1,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/grip/Rubber_Grip.png"
            },
            {
                name        : "Straight Grip",
                slot        : "Grip",

                price       : 96600,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 0,
                concealment : 2,
                threat      : 0,

                imageUrl    : "img/mod/grip/Straight_Grip.png"
            },
            {
                name        : "Milspec Mag",
                slot        : "Magazine",

                price       : 43000,
                magazine    : 8,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 0,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/magazine/Milspec.png"
            },
            {
                name        : "Tactical Mag",
                slot        : "Magazine",

                price       : 102000,
                magazine    : 4,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 0,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/magazine/Tactical_Mag.png"
            },
            {
                name        : "CAR Quadstacked Mag",
                slot        : "Magazine",

                price       : 0,
                magazine    : 30,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : -2,
                stability   : 1,
                concealment : -3,
                threat      : 0,

                imageUrl    : "img/mod/magazine/CAR_Quadstacked_Mag.png"
            },
            {
                name        : "The Professional's Choice Sight",
                slot        : "Sight",

                price       : 102000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/sight/The_Professionals_Choice.png"
            },
            {
                name        : "Surgeon Sight",
                slot        : "Sight",

                price       : 178000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/sight/Surgeon_Sight.png"
            },
            {
                name        : "See More Sight",
                slot        : "Sight",

                price       : 213600,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/sight/See_More_Sight.png"
            },
            {
                name        : "Combat Sight",
                slot        : "Sight",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/sight/Combat_Sight.png"
            },
            {
                name        : "Speculator Sight",
                slot        : "Sight",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/sight/Speculator_Sight.png"
            },
            {
                name        : "Trigonom Sight",
                slot        : "Sight",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -1,
                threat      : 0,

                imageUrl    : "img/mod/sight/Trigonom_Sight.png"
            },
            {
                name        : "Holographic Sight",
                slot        : "Sight",

                price       : 102000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/sight/Holographic_Sight.png"
            },
            {
                name        : "Compact Holosight",
                slot        : "Sight",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/sight/Compact_Holosight.png"
            },
            {
                name        : "Solar Sight",
                slot        : "Sight",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -2,
                threat      : 0,

                imageUrl    : "img/mod/sight/Solar_Sight.png"
            },
            {
                name        : "Military Red Dot Sight",
                slot        : "Sight",

                price       : 43000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -3,
                threat      : 0,

                imageUrl    : "img/mod/sight/Military_Red_Dot_(Lootbag_DLC).png"
            },
            {
                name        : "Military Red Dot Sight",
                slot        : "Sight",

                price       : 307000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -3,
                threat      : 0,

                imageUrl    : "img/mod/sight/Military_Red_Dot.png"
            },
            {
                name        : "Milspec Scope",
                slot        : "Sight",

                price       : 307000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -3,
                threat      : 0,

                imageUrl    : "img/mod/sight/Milspec_Scope.png"
            },
            {
                name        : "Acough Optic Scope",
                slot        : "Sight",

                price       : 220000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : -3,
                threat      : 0,

                imageUrl    : "img/mod/sight/Acough_Optic.png"
            },
            {
                name        : "Wide Stock",
                slot        : "Stock",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 0,
                stability   : 1,
                concealment : 1,
                threat      : 0,

                imageUrl    : "img/mod/stock/Wide_Stock.png"
            },
            {
                name        : "War-torn Stock",
                slot        : "Stock",

                price       : 0,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 0,
                accuracy    : 4,
                stability   : 0,
                concealment : -3,
                threat      : 0,

                imageUrl    : "img/mod/stock/War_Torn_Stock.png"
            },
            {
                name        : "Exotique",
                slot        : "Upper Receiver",

                price       : 102000,
                magazine    : 0,
                totalAmmo   : 0,
                rateOfFire  : 0,
                damage      : 3,
                accuracy    : 0,
                stability   : 1,
                concealment : 0,
                threat      : 0,

                imageUrl    : "img/mod/upper_receiver/Exotique.png"
            }
        ]
    };
});
