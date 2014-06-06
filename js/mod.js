define([ "base" ], function (Base) {
    "use strict";

    var Mod = function Mod(details) {
        var self = this;

        self.slot = details.slot;

        self.isSelected = false;
        self.isEquipped = false;

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

        return self;
    };

    Mod.prototype.unequip = function unequip() {
        this.isEquipped = false;
        return undefined;
    };

    return Mod;
});
