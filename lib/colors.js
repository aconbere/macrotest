colors = { reset: "0"
         , grey: "30"
         , red: "31"
         , green: "32"
         , yellow: "33"
         , blue: "34"
         , magenta: "35"
         , cyan: "36"
         , white: "37"
         };

var ASCIFY = function (_color, bold) {
  if (bold) {
    return "\x1B[1;" + colors[_color] + "m";
  } else {
    return "\x1B[0;" + colors[_color] + "m";
  }
};

var color = function (_color, text, bold) {
  return ASCIFY(_color, bold) + text + ASCIFY("reset");
};

color.bold = function (_color, text) {
  return color(_color, text, true);
};

exports.color = color;
