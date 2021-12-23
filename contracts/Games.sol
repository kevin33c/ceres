//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.11;

contract Games {
    struct Player {
        address account;
        bool is_maker;
        uint256 amount;
    }

    address private constant adminAddress = 0x182B1D0920a168d78aDa738533eD7999642B01a1;
    address private maker;
    uint256 public makerAmount;
    uint256 public takerAmount;
    string public outcome;
    address[] public playersList;

    mapping(address => Player) public players;

    constructor() payable minimumRequired {
        maker = msg.sender;
        players[msg.sender] = Player(msg.sender, true, msg.value);
        makerAmount = msg.value;
        playersList.push(msg.sender);
    }

    function join() external payable minimumRequired takerAmountLimit notMaker {
        players[msg.sender] = Player(msg.sender, false, msg.value);
        addTakerAmount(msg.value);
        playersList.push(msg.sender);
    }

    function distribute(string memory _outcome) external payable onlyAdmin {
        /******************************************   
        upon call of admin API it returns outcome 
        and outcome value;
       ******************************************/
        //set outcome variables
        outcome = _outcome;
        if(keccak256(bytes(outcome)) == keccak256(bytes("MAKER_WINS"))){
            //if maker wins, maker take all
            payable(maker).transfer(address(this).balance);
        } else if (keccak256(bytes(outcome)) == keccak256(bytes("TAKER_WINS"))){
            //loop through the players playersList
            for (uint i=0; i<playersList.length; i++) {
                //if player is taker then double the amount                
                if(players[playersList[i]].is_maker == false){
                   payable(players[playersList[i]].account).transfer(players[playersList[i]].amount * 2);
                } 
            }
            //finally any remaining balance go to the maker
            payable(maker).transfer(address(this).balance);
        }
    }

    function balance() external view returns(uint256) {
        return address(this).balance;
    }

    function end() external payable onlyMaker {
        if (address(this).balance == makerAmount) {
            payable(maker).transfer(address(this).balance);
        } else {
            revert("You can't end game, game already active.");
        }
    }

    function addTakerAmount(uint256 _amount) private returns (uint256) {
        takerAmount = takerAmount + _amount;
        return takerAmount;
    }

    modifier onlyPlayers() {
        require(
            players[msg.sender].is_maker == false,
            "Only player can call this."
        );
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
        require(msg.sender == adminAddress, "Only Admin can call this.");
        _;
    }

    modifier notMaker() {
        require(msg.sender != maker, "Maker can't call this.");
        _;
    }

    modifier onlyMaker() {
        require(msg.sender == maker, "Only Maker can call this.");
        _;
    }

    modifier minimumRequired() {
        require(
            msg.value > 0 ether,
            "Value needs to be above the minimum amount."
        );
        _;
    }
}
