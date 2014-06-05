define([ "jquery", "knockout", "weapon" ], function ($, ko, Weapon) {
    "use strict";

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

        self._statModifiers = ko.observable({});

        self.weaponStats = ko.observableArray([]);
        self._setWeaponStats = ko.computed(function () {
            var currentWeapon = self.currentWeapon(),
                statModifiers = self._statModifiers(),
                stats = currentWeapon ? currentWeapon.getSummarizedStats() : [];

            stats.forEach(function (stat) {
                stat.modifier = statModifiers[stat.name];

                if (stat.modifier > 0) {
                    stat.modifier = "+" + stat.modifier;
                    stat.colorClass = "positive";
                } else if (stat.modifier < 0) {
                    stat.colorClass = "negative";
                } else {
                    stat.colorClass = "";
                }
            });

            self.weaponStats(stats);
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
        var mod = this, manualUpdate = false;;

        if (mod.is_selected) {
            _this.currentWeapon().addMod(mod);
            manualUpdate = true;
        } else if (mod.is_equipped) {
            _this.currentWeapon().removeMod(mod.slot);
            manualUpdate = true;
        } else {
            _this._selectNext(mod);
        }

        if (manualUpdate) {
            _this.currentWeapon.valueHasMutated();
            _this._statModifiers({});
        }
    };

    Presentation.prototype._selectNext = function _selectNext(nextMod) {
        var self = this, modDetails = {},
            currentMod   = _this.currentWeapon().getMod(nextMod.slot),
            addModifiers = nextMod.select(),
            removeModifiers;

        if (currentMod) {
            removeModifiers = currentMod.unselect();

            Object.keys(removeModifiers).forEach(function (attribute) {
                addModifiers[attribute] += removeModifiers[attribute];
            });
        }

        _this._statModifiers(addModifiers);

        return self;
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
