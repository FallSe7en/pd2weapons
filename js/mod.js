define([ "base" ], function (Base) {
    return function Mod(details) {
        this.slot = details.slot;

        return Base.call(this, details);
    };
});
