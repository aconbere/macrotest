var util = require('util');
var color = require("./colors").color;
var Description = require("./description").Description;
var Evented = require("evented").Evented;
var reporter = require("./reporter").reporter;

exports.describe = function (description, block) {
  reporter.trigger("/suite/started");
  var d = new Description(description, block);
  d.run();
  return d;
};
