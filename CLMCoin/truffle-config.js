var HDWalletProvider = require("truffle-hdwallet-provider");
const MNEMONIC =
  "pelican asset thing damp inhale advice abstract fix snap truck identify flush";
module.exports = {
  contracts_build_directory: "../web/src/contracts",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    },
    gcp: {
      host: "35.247.154.250",
      port: 8545,
      network_id: "*"
    },
    ropsten: {
      provider: function() {
        return new HDWalletProvider(
          MNEMONIC,
          "https://ropsten.infura.io/v3/a3595f6b306849fa894501078c6c81b2"
        );
      },
      network_id: 3,
      gas: 4000000 //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
