var sys = require("sys");
var assert = require("assert");
var macrotest = require("../lib/macrotest");
var Description = require("../lib/description").Description;

macrotest.describe("macrotest", function () {
  this.describe("Description", function () {
    this.it("should chain descriptions", function () {
      var d2;
      var d1 = new Description("d1", function () {
        d2 = this.describe("d2", function () {});
      }).run();
      assert.equal("d1 d2", d2.chainedDescription());
    });
  });

  this.describe("Assertion", function () {
    this.it("should display it's descriptions description", function () {
      var a;
      var d = new Description("d1", function () {
        a = this.it("a", function () {});
      }).run();
      assert.equal("d1 a", a.chainedDescription());
    });
  });

  this.describe("before blocks", function () {
    this.before(function () {
      this.x = 10;
    });

    this.it("should set x to 10", function () {
      assert.equal(this.x, 10);
    });
  });


  this.describe("describe", function () {
    this.it("should take a descriptive string as it's first argument", function () {
      var description = macrotest.describe("test");
      assert.equal(description.description, "test");
    });

    this.it("should take a function defining a chain as it's second arguement", function () {
      var describeBlockCalled = false;
      var description = macrotest.describe("test", function () { describeBlockCalled = true });
      description.run();
      assert.ok(describeBlockCalled);
    });
  });
});
