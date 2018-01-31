function colorHash(str, lsL, lsS) {
    lsL = typeof lsL !== 'undefined' ?  lsL : [0.35, 0.5, 0.65];
    lsS = typeof lsS !== 'undefined' ?  lsS : [0.35, 0.5, 0.65];
    //<editor-fold desc="Hash">
    var seed = 131;
    var seed2 = 137;
    var hash = 0;
    // make hash more sensitive for short string like 'a', 'b', 'c'
    str += 'x';
    // Note: Number.MAX_SAFE_INTEGER equals 9007199254740991
    var MAX_SAFE_INTEGER = parseInt(9007199254740991 / seed2);
    for (var i = 0; i < str.length; i++) {
        if (hash > MAX_SAFE_INTEGER) {
            hash = parseInt(hash / seed2);
        }
        hash = hash * seed + str.charCodeAt(i);
    }
    //</editor-fold>
    //<editor-fold desc="hsl">
    var H, S, L;
    H = hash % 359; // note that 359 is a prime
    hash = parseInt(hash / 360);
    S = lsS[hash % lsS.length];
    hash = parseInt(hash / lsS.length);
    L = lsL[hash % lsL.length];
    H /= 360;
    //</editor-fold>
    //<editor-fold desc="HSL2RGB">
    var q = L < 0.5 ? L * (1 + S) : L + S - L * S;
    var p = 2 * L - q;
    var RGBArray = [H + 1 / 3, H, H - 1 / 3].map(function (color) {
        if (color < 0) {
            color++;
        }
        if (color > 1) {
            color--;
        }
        if (color < 1 / 6) {
            color = p + (q - p) * 6 * color;
        } else if (color < 0.5) {
            color = q;
        } else if (color < 2 / 3) {
            color = p + (q - p) * 6 * (2 / 3 - color);
        } else {
            color = p;
        }
        return Math.round(color * 255);
    });
    //</editor-fold>
    //<editor-fold desc="RGB2HEX">
    var hex = '#';
    RGBArray.forEach(function (value) {
        if (value < 16) {
            hex += 0;
        }
        hex += value.toString(16);
    });
    return hex;
    //</editor-fold>
}
