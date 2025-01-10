module.exports = {
  // Path to store compiled contract artifacts (JSON files)
  contracts_build_directory: "./client/src/artifacts",

  networks: {
    development: {
      host: "127.0.0.1", // Localhost
      port: 7545, // Ganache Port
      network_id: "*", // Match any network id
    },
  },

  compilers: {
    solc: {
      version: "0.8.0", // Use the version you require
      settings: {
        optimizer: {
          enabled: true, // Enable optimization
          runs: 200, // Number of optimization runs
        },
      },
    },
  },
};
