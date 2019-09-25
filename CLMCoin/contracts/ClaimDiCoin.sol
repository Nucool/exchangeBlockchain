pragma solidity >0.4.24;

import "./ConvertLib.sol";
import "openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

// This is just a simple example of a coin-like contract.
// It is not standards compatible and cannot be expected to talk to other
// coin/token contracts. If you want to create a standards-compliant
// token, see: https://github.com/ConsenSys/Tokens. Cheers!

contract ClaimDiCoin is ERC20, Ownable {
    string public name = "ClaimDiToken";
    string public symbol = "CLM";
    uint8 public decimals;
    uint public INITIAL_SUPPLY = 10000000;
    uint256 internalPrice = 0.01 ether;
    uint256 private _reservePay;
    address payable private _ownerPay;

	event Transfer(address indexed _from, address indexed _to, uint256 _value);
	event GetAccidentHistory(string, uint[]);

	struct AccidentHistory {
		uint id;
		string carRegis;
		string carChassic;
		string accidentDetail;
		string accidentDate;
		string accidentPlace;
		string policyNumber;
		string policyClaimNumber;
	}

    mapping (uint => AccidentHistory) accidentHistoryId;

    AccidentHistory[] private _accidentHistory;

	constructor() public {
        _mint(msg.sender, INITIAL_SUPPLY);
        _ownerPay = msg.sender;
	}

	function getName(string memory _names) public pure returns(string memory) {
		return (_names);
	}

	function trans() public payable returns (bool) {
		bool res = transfer(owner(), 1);
		return (res);
	}

	function getAccidentHistory(string memory searchValue) public payable {
		uint256 amount = 1;
		if(balanceOf(msg.sender) >= amount)
		{
			transfer(owner(), 1);
			uint counter = 0;
			uint index = 0;
			for (uint i = 0; i < _accidentHistory.length; i++){
				if (keccak256(bytes(searchValue)) == keccak256(bytes(_accidentHistory[i].carRegis)) 
				|| keccak256(bytes(searchValue)) == keccak256(bytes(_accidentHistory[i].carChassic))) {
					counter++;
				}
			}
			uint[] memory listId = new uint[](counter);
			for (uint j = 0; j < _accidentHistory.length; j++) {
				if (keccak256(bytes(searchValue)) == keccak256(bytes(_accidentHistory[j].carRegis))
				|| keccak256(bytes(searchValue)) == keccak256(bytes(_accidentHistory[j].carChassic))) {
					listId[index] = _accidentHistory[j].id;
					index++;
				}
			}
			emit GetAccidentHistory("OK", listId);
		}
		else {
			emit GetAccidentHistory("Amount should be equal to 1 CLM (ClaimDiToken)", new uint[](0));
		}
	}

	function getAccidentHistoryById(uint _id) public view returns (uint,
		string memory ,
		string memory ,
		string memory ,
		string memory ,
		string memory ,
		string memory ,
		string memory) {
        AccidentHistory memory result = accidentHistoryId[_id];
		return (
			result.id,
			result.carRegis,
			result.carChassic,
			result.accidentDetail,
			result.accidentDate,
			result.accidentPlace,
			result.policyNumber,
			result.policyClaimNumber
		);
	}

	function addAccidentHistory(string memory carRegis, 
		string memory carChassic,
		string memory accidentDetail,
		string memory accidentDate,
		string memory accidentPlace,
		string memory policyNumber,
		string memory policyClaimNumber)  public {
			uint id = _accidentHistory.length;
			_accidentHistory.push(AccidentHistory(id,carRegis,carChassic,accidentDetail,accidentDate,accidentPlace, policyNumber,policyClaimNumber));
			accidentHistoryId[id] = _accidentHistory[id];
	}

    function buyToken(uint256 amount) public payable {
        address _toAddress = msg.sender;
        _transfer(owner(), _toAddress, amount);
        _reservePay = _reservePay.add(msg.value);
    }
}
