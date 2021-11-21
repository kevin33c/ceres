pragma solidity >=0.8.7;

contract Games {
    address constant public adminAddress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
    address public manager;
    address[] public players;
    uint public makerAmount;
    uint public takerAmount;
    bool public is_outcome = false;
    mapping (address => bool) public playerWallets;
    enum OutcomeValue { NO_VALUE, MANAGER_WINS, TAKER_WINS }
    OutcomeValue public outcomeValue;


    constructor(string memory _gameId) payable minimumRequired {
        //set manager address
        manager = tx.origin;
        players.push(msg.sender);
        playerWallets[msg.sender] = true;
        makerAmount = msg.value;
    }

    function join() public payable minimumRequired takerAmountLimit notManager {
        //join a game
        if(msg.value <= makerAmount) {
            players.push(msg.sender);
            addTakerAmount(msg.value);
            playerWallets[msg.sender] = true;
        } else {
            revert();
        }
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

    function end() external payable onlyAdmin {
        if(is_outcome == false && address(this).balance > 0){
            payable(manager).transfer(address(this).balance);
        } else {
            revert("Outcome already decided OR no balance left to end game");
        }
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
            makerAmount >= takerAmount,
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