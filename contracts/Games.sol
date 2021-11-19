pragma solidity >=0.8.7;

contract Inbox {
    address constant public adminAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address public manager;
    address[] public players;
    uint public offerAmount;
    uint public takerAmount;
    mapping (address => bool) public playerWallets;


    constructor() payable minimumRequired {
        //set manager address
        manager = tx.origin;
        players.push(msg.sender);
        playerWallets[msg.sender] = true;
        offerAmount = msg.value;
    }

    /*
    //move this to constructor
    function create() public payable minimumRequired onlyManager {
        //create a game
        players.push(msg.sender);
        playerWallets[msg.sender] = true;
        offerAmount = msg.value;
    }
    */

    function join() public payable minimumRequired takerAmountLimit notManager {
        //join a game
        players.push(msg.sender);
        addTakerAmount(msg.value);
        playerWallets[msg.sender] = true;
    }

    function pickWinner() public onlyPlayers {
       //
    }

    function distribute() private returns (uint) {
       //
    }

    function commission() private returns (uint) {
       //
    }

    function endGame() external payable onlyAdmin {
        payable(manager).transfer(address(this).balance);
    }

    function addTakerAmount(uint _amount) private returns (uint) {
        takerAmount = takerAmount + _amount;
        return takerAmount;
    }

    function getPlayers() public view returns (address[] memory) {
        return players;
    }

    modifier onlyPlayers() {
        require(
            playerWallets[msg.sender],
            "Only player can call this.")
        ;
        _;
    }

    modifier takerAmountLimit() {
        require(
            offerAmount >= takerAmount,
            "Offer amount must be less than the total taker amount."
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
    
    modifier onlyManager() {
        require(
            msg.sender == manager,
            "Only manager can call this."
        );
        _;
    }

    modifier notManager() {
        require(
            msg.sender != manager,
            "Manager can't call this."
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