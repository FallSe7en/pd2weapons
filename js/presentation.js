define([ "jquery", "knockout", "weapon" ], function ($, ko, Weapon) {
    var Presentation = function Presentation(weaponsData) {
        var self = this;

        self.weapons = ko.observable(loadWeapons(weaponsData));

        self.selectedWeapon = ko.observable();
        self.weaponImage    = ko.computed(function () {
            var currentWeapon = getCurrentWeapon.call(self);
            return currentWeapon ? currentWeapon.imageUrl : "";
        });

        self.modSlots = ko.observableArray([]);
        self._setModSlots = ko.computed(function () {
            var currentWeapon = getCurrentWeapon.call(self);

            self.modSlots(
                currentWeapon ? currentWeapon.getModSlots().map(function (slot) {
                    return {
                        name       : slot.name,
                        modImage   : slot.mod ? slot.mod.imageUrl : undefined,
                        isSelected : slot.name === self._selectedModSlot()
                    };
                }) : []
            );
        });

        self.availableMods = ko.observableArray([]);
        self._setAvailableMods = ko.computed(function () {
            var currentWeapon = getCurrentWeapon.call(self);

            self.availableMods(
                currentWeapon ? currentWeapon.getAvailableMods(
                    self._selectedModSlot()
                ) : []
            );
        });

        self.weaponStats = ko.observableArray([]);
        self._setWeaponStats = ko.computed(function () {
            var currentWeapon = getCurrentWeapon.call(self);
            self.weaponStats(currentWeapon ? currentWeapon.getSummarizedStats() : []);
        });

        $(function () { ko.applyBindings(self); });

        return self;
    };

    Presentation.prototype.clickModSlot = function clickModSlot(slotName) {
        this._selectedModSlot(slotName);
    };

    Presentation.prototype.clickMod = function clickMod(modName) {
    };

    function loadWeapons(weaponsData) {
        var weapons = {};

        weaponsData.forEach(function (weapon) {
            weapons[weapon.name] = new Weapon(weapon);
        });

        return weapons;
    }

    function getCurrentWeapon() {
        return this.weapons()[this.selectedWeapon()];
    };

    return Presentation;
});
