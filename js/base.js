(function ($) {
    var Base = window.Payday2Weapons.Base = function (details) {
        var self = this;

        self.name  = details.name;
        self.price = details.price;

        self.magazine    = details.magazine;
        self.totalAmmo   = details.totalAmmo;
        self.rateOfFire  = details.rateOfFire;
        self.damage      = details.damage;
        self.accuracy    = details.accuracy;
        self.stability   = details.stability;
        self.concealment = details.concealment;
        self.threat      = details.threat;

        self._imageUrl = details.imageUrl;

        return self;
    };
})(jQuery);
