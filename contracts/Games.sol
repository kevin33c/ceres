//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7;

contract Games {
    struct Player {
        address account;
        bool is_maker;
        uint256 amount;
    }

    address private constant adminAddress = 0x182B1D0920a168d78aDa738533eD7999642B01a1;
    address private maker;
    uint256 public takerAmount;
    address[] public playersList; //can limit player list
    mapping(address => Player) public players;

    constructor() payable minimumRequired {
        maker = msg.sender;
        players[msg.sender] = Player(msg.sender, true, msg.value);
        playersList.push(msg.sender);
    }

    function joinGame() external payable minimumRequired takerAmountLimit {
        players[msg.sender] = Player(msg.sender, false, msg.value);
        addTakerAmount(msg.value);
        playersList.push(msg.sender);
    }

    function settleGame(uint _outcome) external payable onlyAdmin {
        //set outcome variables
        //outcome = _outcome;
        if(_outcome == 1){
            //if maker wins, maker take all
            payable(maker).transfer(address(this).balance);
        } else if (_outcome == 2){
            //if taker wins, loop through the players list
            for (uint i=0; i<playersList.length; i++) {
                //if player is taker then 2x the initial amount               
                if(players[playersList[i]].is_maker == false){
                   payable(players[playersList[i]].account).transfer(players[playersList[i]].amount * 2);
                } 
            }
            //finally any remaining balance go to the maker
            payable(maker).transfer(address(this).balance);
        }
    }

    function endGame() external payable onlyMaker {
        if (address(this).balance == players[maker].amount) {
            payable(maker).transfer(address(this).balance);
        } else {
            revert("You can't end game, game already active.");
        }
    }

    function addTakerAmount(uint256 _amount) private returns (uint256) {
        takerAmount = takerAmount + _amount;
        return takerAmount;
    }

    modifier takerAmountLimit() {
        require(
            players[maker].amount >= takerAmount + msg.value,
            "Total taker amount must be less or equal the maker amount."
        );
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == adminAddress, "Only Admin can call this.");
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
