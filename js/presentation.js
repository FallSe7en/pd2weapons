define([ "jquery", "knockout", "weapon" ], function ($, ko, Weapon) {

    var _this;

    var Presentation = function Presentation(weaponsData) {
        var self = _this = this;

        self.availableWeapons = ko.observable(loadWeapons(weaponsData));
        self.currentWeapon   = ko.observable(self.availableWeapons()[0]);

        self.weaponImage = ko.computed(function () {
            var currentWeapon = self.currentWeapon();
            return currentWeapon ? currentWeapon.imageUrl : "";
        });

        self._selectedModSlot = ko.observable();

        self.modSlots = ko.observableArray([]);
        self._setModSlots = ko.computed(function () {
            var currentWeapon = self.currentWeapon(),
                modSlots = currentWeapon
                    ? currentWeapon.getModSlots().sort().map(function (slot) {
                        return {
                            name       : slot.name,
                            modImage   : slot.mod ? slot.mod.imageUrl : undefined,
                            isSelected : slot.name === self._selectedModSlot()
                        };
                    }) : [];

            self.modSlots(modSlots);
        });

        self.availableMods = ko.observableArray([]);
        self._setAvailableMods = ko.computed(function () {
            var currentWeapon = self.currentWeapon(),
                availableMods = (currentWeapon && self._selectedModSlot())
                    ?  currentWeapon.getAvailableMods(self._selectedModSlot())
                    : [];

            self.availableMods(availableMods);
        });

        self.weaponStats = ko.observableArray([]);
        self._setWeaponStats = ko.computed(function () {
            var currentWeapon = self.currentWeapon();
            self.weaponStats(currentWeapon ? currentWeapon.getSummarizedStats() : []);
        });

        $(function () { ko.applyBindings(self); });

        return self;
    };

    Presentation.prototype.clickModSlot = function clickModSlot() {
        var modSlot = this;
        
        if (_this._selectedModSlot() !== modSlot.name) {
            _this._selectedModSlot(modSlot.name);
        }
    };

    Presentation.prototype.clickMod = function clickMod(modName) {
        var mod = this;
    };

    Presentation.prototype.unCamel = function (text) {
        var findWord = /([A-Z][a-z]*)/g;

        return ucfirst(text).match(findWord)
                            .map(function (word) { return ucfirst(word); })
                            .join(" ");
    };

    function loadWeapons(weaponsData) {
        return weaponsData.map(function (weapon) {
            return new Weapon(weapon);
        });
    }

    function ucfirst(s) {
        return s.charAt(0).toUpperCase() + s.slice(1);
    }

    return Presentation;
});
