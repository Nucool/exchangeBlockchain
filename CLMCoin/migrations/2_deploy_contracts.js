const ConvertLib = artifacts.require("ConvertLib");
const ClaimDiCoin = artifacts.require("ClaimDiCoin");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, ClaimDiCoin);
  deployer.deploy(ClaimDiCoin);
};
