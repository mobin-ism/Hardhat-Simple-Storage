// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Lock {
    uint public unlockTime;
    address payable public owner;

    uint256 storedAmount = 0;

    event Withdrawal(uint amount, uint when);

    constructor() payable {
        owner = payable(msg.sender);
    }

    function store(uint256 _storedAmount) public {
        require(msg.sender == owner, "You aren't the owner");

        storedAmount = _storedAmount;
    }

    function retreive() public view returns (uint256) {
        require(msg.sender == owner, "You aren't the owner");

        return storedAmount;
    }
}
