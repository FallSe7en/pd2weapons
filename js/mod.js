define([ "base" ], function (Base) {
    "use strict";

    var Mod = function Mod(details, weapon) {
        var self = this;

        self._weapon = weapon;

        self.slot = details.slot;

        self.isSelected = false;
        self.isEquipped = false;

        self._disableModSlots = ("disableModSlots" in details)
            ? details.disableModSlots
            : [];

        return Base.call(self, details);
    };

    Mod.prototype.select = function select() {
        var self = this;

        self.isSelected = true;

        return self.getAttributes();
    };

    Mod.prototype.unselect = function unselect() {
        var self = this;

        self.isSelected = false;

        return self.getAttributes(true);
    };

    Mod.prototype.getAttributes = function getAttributes(negate) {
        var self = this, attributes = {};

        self.attributes.forEach(function (attribute) {
            var value = negate ? self[attribute] * -1 : self[attribute];
            attributes[attribute] = value;
        });

        return attributes;
    };

    Mod.prototype.equip = function equip() {
        var self = this;

        self.isEquipped = true;
        self.isSelected = false;

        if (self._disableModSlots.length > 0) {
            self._weapon.disableModSlots(self._disableModSlots);
        }

        return self;
    };

    Mod.prototype.unequip = function unequip() {
        var self = this;

        self.isEquipped = false;

        if (self._disableModSlots.length > 0) {
            self._weapon.enableModSlots(self._disableModSlots);
        }

        return undefined;
    };

    return Mod;
});
