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