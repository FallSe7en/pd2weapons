(function ($) {
    var Base = window.Payday2Weapons.Base = function (details) {
        var self = this;

        self.name  = details.name;

        self._attributes = [
            "price",

            "magazine",
            "totalAmmo",
            "rateOfFire",
            "damage",
            "accuracy",
            "stability",
            "concealment",
            "threat"
        ];

        self._attributes.forEach(function (attribute) {
            self[attribute] = details[attribute];
        });

        self._imageUrl = details.imageUrl;

        return self;
    };
})(jQuery);
