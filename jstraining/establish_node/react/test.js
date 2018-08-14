var Nightmare = require("nightmare");
var expect = require("chai").expect;
var fork = require("child_process").fork;

describe("test app.html", function() {
  var child;
  before(function(done) {
    child = fork("./react/server.js");
    child.on("message", function(msg) {
      if (msg === "listening") {
        done();
      }
    });
  });
  after(function() {
    child.kill();
  });
  it("点击后标题改变", function(done) {
    var nightmare = Nightmare({ show: true });
    nightmare
      .goto("http://127.0.0.1:8080/app.html")
      .click("h1")
      .wait(1000)
      .evaluate(function() {
        return document.querySelector("h1").textContent;
      })
      .end()
      .then(text => {
        expect(text).to.eql("Hello Clicked");
        done();
      });
  });
});
