//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.7;

contract Games {
    struct Player {
        address account;
        bool is_maker;
        uint256 amount;
    }

    address private constant adminAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address private maker;
    uint256 public makerAmount;
    uint256 public takerAmount;
    Player[] public playersList;

    constructor() payable minimumRequired {
        
        maker = msg.sender;
        makerAmount = msg.value;

        Player memory m;
        m.account = msg.sender;
        m.is_maker = true;
        m.amount = msg.value;
        playersList.push(m);
    }

    function joinGame() external payable minimumRequired takerAmountLimit {
        addTakerAmount(msg.value);

        Player memory m;
        m.account = msg.sender;
        m.is_maker = false;
        m.amount = msg.value;
        playersList.push(m);
    }

    function settleGame(uint _outcome) external payable onlyAdmin {
        if(_outcome == 1){
            //if maker wins, maker take all
            payable(maker).transfer(address(this).balance);
        } else if (_outcome == 2){
            //if taker wins, loop through the players list
            for (uint i=0; i<playersList.length; i++) {
                //if player is taker then 2x the initial amount               
                if(playersList[i].is_maker == false){
                   payable(playersList[i].account).transfer(playersList[i].amount * 2);
                } 
            }
            //finally any remaining balance go to the maker
            payable(maker).transfer(address(this).balance);
        }
    }

    function endGame() external payable onlyMaker {
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
