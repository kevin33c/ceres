//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7;

contract Games {

    enum OutcomeValue { 
        NO_VALUE,
        MAKER_WINS,
        TAKER_WINS
    }

    struct Player {
        address account;
        bool exists;
        string class;
    }

    address constant public adminAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address public maker;
    uint public makerAmount;
    uint public takerAmount;
    bool public is_outcome = false;

    OutcomeValue public outcomeValue;
    mapping (address => Player) public players;


    constructor() payable minimumRequired {
        //set maker address
        maker = msg.sender;
        makerAmount = msg.value;
        players[msg.sender] = Player(msg.sender, true, "maker");
    }

    function join() public payable minimumRequired takerAmountLimit notMaker {
        //join a game
        players[msg.sender] = Player(msg.sender, true, "taker");
        addTakerAmount(msg.value);
    }

    function resolve(bool _is_outcome, OutcomeValue _outcomeValue) public onlyAdmin {
       /******************************************   
        upon call of admin API it returns outcome 
        and outcome value;
       ******************************************/
       is_outcome = _is_outcome;
       outcomeValue = _outcomeValue;
    }

    function distribute() external payable onlyAdmin {
       //
    }

    function end() external payable onlyMaker {
        //CHANGE TO BIDDER COUNT = 0
        if(is_outcome == false && address(this).balance > 0){
            payable(maker).transfer(address(this).balance);
        } else {
            revert("Outcome already decided OR no balance left to end game");
        }
    }

    /*
    function all() public view returns (mapping) {
        return players;
    }
    */

    function addTakerAmount(uint _amount) private returns (uint) {
        takerAmount = takerAmount + _amount;
        return takerAmount;
    }

    modifier onlyPlayers() {
        require(
            keccak256(bytes(players[msg.sender].class)) != keccak256(bytes("maker")),
            "Only player can call this.")
        ;
        _;
    }

    modifier takerAmountLimit() {
        require(
            makerAmount >= takerAmount + msg.value,
            "Total taker amount must be less or equal the maker amount."
        );
        _;
    }

    modifier onlyAdmin() {
        require(
            msg.sender == adminAddress,
            "Only Admin can call this."
        );
        _;
    }

    modifier notMaker() {
        require(
            msg.sender != maker,
            "Maker can't call this."
        );
        _;
    }

    modifier onlyMaker() {
        require(
            msg.sender == maker,
            "Only Maker can call this."
        );
        _;
    }

    modifier minimumRequired() {
        require(
            msg.value > .01 ether,
            "Value needs to be above the minimum amount."
        );
        _;
    }
}