define([ "base", "mod" ], function (Base, Mod) {
    "use strict";

    var Weapon = function Weapon(details) {
        var self = this;

        Base.call(self, details);

        self._availableModifications = initializeWeaponMods.call(self, details);
        self._addedModifications     = {};
        self._disabledModSlots       = {};

        self._resetModSlots();

        return self;
    };

    function initializeWeaponMods(details) {
        var self = this, mods = {};

        details.modifications.forEach(function (mod) {
            var modSlot = mod.slot;

            if (modSlot in mods) {
                mods[modSlot].push(new Mod(mod, self));
            } else {
                mods[modSlot] = [ new Mod(mod, self) ];
            }
        });

        return mods;
    }

    Weapon.prototype._resetModSlots = function setAvailableSlots() {
        var self = this;

        self._addedModifications = {};

        Object.keys(self._availableModifications).forEach(function (slot) {
            self._addedModifications[slot] = { name: slot, mod: undefined };
        });
    };

    Weapon.prototype.getAvailableMods = function getAvailableMods(slot) {
        var self = this;

        if (slot in self._availableModifications) {
            return self._availableModifications[slot].sort(function (a, b) {
                if (a.name < b.name) return -1;
                if (a.name > b.name) return 1;
                return 0;
            });
        } else {
            return [];
        }
    };

    Weapon.prototype.getModSlots = function getModSlots() {
        var self = this;

        return Object.keys(self._addedModifications)
            .filter(function (slot) {
                return self._disabledModSlots[slot] === undefined;
            })
            .sort()
            .map(function (slot) {
                return self._addedModifications[slot];
            });
    };

    Weapon.prototype.addMod = function addMod(mod) {
        var self = this;

        self.removeMod(mod.slot);

        if (mod.slot in self._addedModifications) {
            self._addedModifications[mod.slot].mod = mod.equip();
        }

        return self;
    };

    Weapon.prototype.removeMod = function removeMod(slot) {
        var self = this, mod = self._addedModifications[slot].mod;

        if (mod && (slot in self._addedModifications)) {
            self._addedModifications[slot].mod = mod.unequip();
        }

        return self;
    };

    Weapon.prototype.disableModSlots = function enableModSlots(slots) {
        var self = this;

        slots.forEach(function (slot) {
            self.removeMod(slot);
            self._disabledModSlots[slot] = true;
        });
    };

    Weapon.prototype.enableModSlots = function enableModSlots(slots) {
        var self = this;

        slots.forEach(function (slot) {
            delete self._disabledModSlots[slot];
        });
    };

    Weapon.prototype.clearMods = function clearMods() {
        var self = this;

        self._resetModSlots();

        return self;
    };

    Weapon.prototype.getMod = function getMod(slot) {
        var self = this, mod = undefined;

        if (slot in self._addedModifications) {
            mod = self._addedModifications[slot].mod;
        }

        return mod;
    };

    Weapon.prototype.getSummarizedStats = function getSummarizedStats() {
        var self = this, stats = {};

        self.attributes.forEach(function (attribute) { stats[attribute] = 0; });

        Object.keys(self._addedModifications).forEach(function (slot) {
            var mod = self._addedModifications[slot].mod;

            if (mod) {
                self.attributes.forEach(function (attribute) {
                    stats[attribute] += (mod[attribute] || 0);
                });
            }
        });

        return self.attributes.map(function (attribute) {
            return {
                name  : attribute,
                value : (self[attribute] || 0) + stats[attribute]
            };
        });
    };

    return Weapon;
});
