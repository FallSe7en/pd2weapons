define([ "base", "mod" ], function (Base, Mod) {
    var Weapon = function Weapon(details) {
        var self = this;

        Base.call(self, details);

        self._availableModifications = initializeWeaponMods.call(self, details);
        self._addedModifications     = {};

        self._resetModSlots();

        return self;
    };

    function initializeWeaponMods(details) {
        var self = this, mods = {};

        details.modifications.forEach(function (mod) {
            var modSlot = mod.slot;

            if (modSlot in mods) {
                mods[modSlot].push(new Mod(mod));
            } else {
                mods[modSlot] = [ new Mod(mod) ];
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
        return this._availableModifications[slot].sort();
    };

    Weapon.prototype.getModSlots = function getModSlots() {
        return this._addedModifications;
    };

    Weapon.prototype.addMod = function addMod(mod) {
        if (mod.slot in this._addedModifications) {
            this._addedModifications[mod.slot].mod = mod;
        }
    };

    Weapon.prototype.removeMod = function removeMod(slot) {
        if (slot in this._addedModifications) {
            this._addedModifications[slot] = { name: slot, mod: undefined };
        }
    };

    Weapon.prototype.clearMods = function clearMods() {
        this._resetModSlots();
    };

    Weapon.prototype.getSummarizedStats = function getSummarizedStats() {
        var self = this, stats = {};

        Object.keys(self._addedModifications).forEach(function (slot) {
            var mod = self._addedModifications[slot];

            self.attributes.forEach(function (attribute) {
                stats[attribute] = self[attribute] + mod[attribute];
            });
        });

        return self.attributes.forEach(function (attribute) {
            return { name: attribute, value: stats[attribute] };
        });
    };

    return Weapon;
});
