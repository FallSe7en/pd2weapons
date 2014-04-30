(function ($) {
    var Weapon = window.Payday2Weapons.Weapon = function (details) {
        var self = this;

        Payday2Weapons.Base.call(self, details);

        self._availableModifications = initializeWeaponMods.call(self, details);
        self._addedModifications     = {};

        return self;
    };

    function initializeWeaponMods(details) {
        var self = this, mods = {};

        details.modifications.forEach(function (mod) {
            var self = this, modSlot = mod.slot;

            if (modSlot in self._modifications) {
                mods[modSlot].push(new Payday2Weapons.Mod(mod));
            } else {
                mods[modSlot] = [ new Payday2Weapons.Mod(mod) ];
            }
        });

        return mods;
    }

    Weapon.prototype.getAvailableSlots = function getAvailableSlots() {
        return Object.keys(this._availableModifications).sort();
    };

    Weapon.prototype.getAvailableMods = function getAvailableMods(slot) {
        return this._availableModifications[slot].sort();
    };

    Weapon.prototype.getAddedMods = function getAddedMods() {
        return this._addedModifications;
    };

    Weapon.prototype.addMod = function addMod(mod) {
        this._addedModifications[mod.slot] = mod;
    };

    Weapon.prototype.removeMod = function removeMod(mod) {
        delete this._addedModifications[mod.slot];
    };

    Weapon.prototype.clearMods = function clearMods() {
        this._addedModifications = {};
    };

    Weapon.prototype.getSummarizedStats = function getSummarizedStats() {
        var self = this, stats = {};

        Object.keys(self._addedModifications).forEach(function (slot) {
            var mod = self._addedModifications[slot];

            self._attributes.forEach(function (attribute) {
                stats[attribute] = self[attribute] + mod[attribute];
            });
        });

        return stats;
    };
})(jQuery);
