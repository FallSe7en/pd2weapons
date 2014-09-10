define([], function () {
    var Base = function (details) {
        var self = this;

        self.name  = details.name;

        self.attributes = [
//            "price",
            "magazine",
            "totalAmmo",
            "rateOfFire",
            "damage",
            "accuracy",
            "stability",
            "concealment",
            "threat"
        ];

        self.attributes.forEach(function (attribute) {
            self[attribute] = details.attributes[attribute];
        });

        self.imageUrl = details.imageUrl;

        return self;
    };

    return Base;
});
