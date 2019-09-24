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
   }
  }
  
};
