const DummyToken = artifacts.require("DummyToken");

module.exports = function (deployer) {
  deployer.deploy(DummyToken, "Dummy", "DMT", 1000000000);
};