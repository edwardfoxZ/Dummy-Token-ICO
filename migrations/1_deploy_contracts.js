const DummyToken = artifacts.require("DummyToken");
const DummyICO = artifacts.require("DummyICO");

module.exports = async function (deployer) {
  // Deploy the DummyToken contract
  await deployer.deploy(DummyToken, "Dummy", "DMT", 1000000000000);
  const token = await DummyToken.deployed();
  
  console.log("DummyToken Address:", token.address);
  
  // Deploy the DummyICO contract and link it to the DummyToken contract
  await deployer.deploy(DummyICO, "Dummy", "DMT", 1000000000000);
  const ico = await DummyICO.deployed();

  console.log("DummyICO Address:", ico.address);

  // Optionally, you can interact with the deployed contracts here, such as setting the token address in the ICO contract.
  // This depends on your contract's logic, for example, if ICO requires a token address parameter.
  // await ico.setTokenAddress(token.address);
};
