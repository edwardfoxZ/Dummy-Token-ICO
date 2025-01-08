// require("dotenv").config();
// const { MNEMONIC, PROJECT_ID } = process.env;

// const HDWalletProvider = require("@truffle/hdwallet-provider");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*",
    },

    // sepolia: {
    //   provider: () =>
    //     new HDWalletProvider(
    //       MNEMONIC,
    //       `https://sepolia.infura.io/v3/${PROJECT_ID}`
    //     ),
    //   network_id: 11155111, // Sepolia's network ID
    //   chain_id: 11155111, // Sepolia's chain ID
    //   gas: 5000000, // Adjust gas if needed
    //   gasPrice: 10000000000, // Adjust gasPrice if needed
    // },
  },

  compilers: {
    solc: {
      version: "0.8.13", // Your Solidity version
    },
  },
};
