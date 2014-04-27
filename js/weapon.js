(function ($) {
    var Weapon = window.Payday2Weapons.Weapon = function (details) {
        var self = this;

        Payday2Weapons.Base.call(self, details);
        self._availableModifications = initializeWeaponMods.call(self, details);

        return self;
    };

    function initializeWeaponMods(details) {
        var self = this, mods = {};

        details.availableModifications.forEach(function (mod) {
            var self = this, modSlot = mod.slot;

            if (modSlot in self._availableModifications) {
                mods[modSlot].push(new Payday2Weapons.Mod(mod));
            } else {
                mods[modSlot] = [ new Payday2Weapons.Mod(mod) ];
            }
        });

        return mods;
    }
})(jQuery);
