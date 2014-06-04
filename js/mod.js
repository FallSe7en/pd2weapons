define([ "base" ], function (Base) {
    "use strict";

    var Mod = function Mod(details) {
        var self = this;

        self.slot = details.slot;

        self.is_selected = false;
        self.is_equipped = false;

        return Base.call(self, details);
    };

    Mod.prototype.select = function select() {
        var self = this;

        self.is_selected = true;

        return self._getAttributes();
    };

    Mod.prototype.unselect = function unselect() {
        var self = this, attributes = self._getAttributes(true);

        return self._getAttributes();
    };

    Mod.prototype._getAttributes = function _getAttributes(negate) {
        var self = this, attributes = {};

        self.attributes.forEach(function (attribute) {
            var value = negate ? self[attribute] * -1 : self[attribute];
            attributes[attribute] = value;
        });

        return attributes;
    };

    Mod.prototype.equip = function equip() {
        var self = this;

        self.is_equipped = true;
        self.is_selected = false;

        return self;
    };

    Mod.prototype.unequip = function unequip() {
        this.is_equipped = false;
        return undefined;
    };

    return Mod;
});
