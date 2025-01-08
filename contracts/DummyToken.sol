// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DummyToken is ERC20 {
    uint public _totalSupply;
    constructor (
        string memory name,
        string memory symbol,
        uint totalSupply
    ) ERC20 (name, symbol) {
        require(totalSupply > 0, "totalSupply must be greater than zero");
        _totalSupply = totalSupply;
        _mint(msg.sender, _totalSupply);
    }
}

contract DummyICO {
    struct Sales {
        address investor;
        uint quantity;
    }
    Sales[] public sales;
    mapping (address => bool) public investors;
    address public token;
    address public admin;
    uint public end;
    uint public price;
    uint public availableTokens;
    uint public minPurchase;
    uint public maxPurchase;
    bool public released;

    constructor 
    (
        string memory _name,
        string memory _symbol,
        uint _totalSupply
    )
    {
        token = address(new DummyToken(
            _name,
            _symbol,
            _totalSupply
        ));
        admin = msg.sender;
    }

    function start
    (
        uint _duration,
        uint _price,
        uint _availableTokens,
        uint _minPurchase,
        uint _maxPurchase
    ) 
        external
        onlyAdmin()
        notActive()
        {
            uint totalSupply = DummyToken(token).totalSupply();
            require(_duration > 0, "duration must be bigger than zero");
            require(_availableTokens > 0 && _availableTokens <= totalSupply, "availabeTokens must be greater than zero and less than totalSupply");
            require(_minPurchase > 0, "min purchase must be bigger than zero");
            require(_maxPurchase > 0 && _maxPurchase <= _availableTokens, "max purchase must be bigger than zero but equal or less than availableTokens");
            end = _duration + block.timestamp;
            price = _price;
            availableTokens = _availableTokens;
            minPurchase = _minPurchase;
            maxPurchase = _maxPurchase;
    }

    function whitelist (address investor) 
        external 
        onlyAdmin()
        {
            investors[investor] = true;
    }

    function buy()
        external
        payable
        notActive()
        onlyInvestors()
        {
            require(msg.value % price == 0, "have to send a multiple of price");
            require(msg.value >= maxPurchase, "send at least the maxPurchase or higher");
            uint quantity = price * msg.value;
            require(quantity <= availableTokens, "have to be equal or less than availableTokens");
            sales.push(Sales(
                msg.sender,
                quantity
            ));
    }

    function release() 
        external
        onlyAdmin()
        notActive(){
            DummyToken tokenInstance = DummyToken(token);
            for (uint i = 0; i < sales.length; i++) {
                Sales storage sale = sales[i];
                tokenInstance.transfer(sale.investor, sale.quantity);
            }
    }

    function withdraw
    (
        address payable to,
        uint amount
    )
        external
        payable
        onlyAdmin()
        notActive()
        tokenReleased()
        {
            payable(to).transfer(amount);
    }
        

    modifier onlyAdmin() {
        require(msg.sender == admin, "only admin");
        _;
    }

    modifier notActive () {
        require(end == 0, "must be not active");
        _;
    }

    modifier active() {
        require(end > 0 && block.timestamp < end && availableTokens > 0, "must be acitve");
        _;
    }

    modifier onlyInvestors() {
        require(investors[msg.sender] == true, "only investor");
        _;
    }

    modifier tokenNotReleased() {
        require(released == false, "Token must not have been released");
        _;
    }

    modifier tokenReleased() {
        require(released == true, "Token must have been released");
        _;
    }
}