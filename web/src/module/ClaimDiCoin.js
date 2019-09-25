const ClaimDiCoin = contract => {
  return {
    balanceOf: account => {
      return contract.methods.balanceOf(account).call();
    },
    buyToken: (amount, address) => {
      return contract.methods.buyToken(amount).send({
        value: amount * 10000000000000000,
        from: address,
        gas: 3000000
      });
    },
    getAccount: () => {
      return contract.web3.eth.getAccounts().then(accounts => accounts[0]);
    },
    getBalanceInEth: account => {
      return contract.methods.getBalanceInEth(account).call();
    },
    getAccidentHistory: searchValue => {
      return contract.methods
        .getAccidentHistory(searchValue)
        .send({ gas: 3000000 });
    },
    getAccidentHistoryById: id => {
      return contract.methods.getAccidentHistoryById(id).call();
    },
    addAccidentHistory: (
      carRegis,
      carChassic,
      accidentDetail,
      accidentDate,
      accidentPlace,
      policyNumber,
      policyClaimNumber
    ) => {
      return contract.methods
        .addAccidentHistory(
          carRegis,
          carChassic,
          accidentDetail,
          accidentDate,
          accidentPlace,
          policyNumber,
          policyClaimNumber
        )
        .send({
          gas: 3000000
        });
    }
  };
};

export default ClaimDiCoin;
