define([ "base" ], function (Base) {
    return function Mod(details) {
        return Base.call(this, details);
    };
});
