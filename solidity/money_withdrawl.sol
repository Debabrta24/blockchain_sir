// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TipJar {
    // 1. Add an address variable to store the owner.
    address public owner;

    // 2. Use the constructor to set the owner to whoever deploys the contract.
    constructor() {
        owner = msg.sender;
    }

    // 3. Create our onlyOwner modifier to protect functions.
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner.");
        _;
    }

    // Our existing function to see the contract's balance.
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Our existing function to receive tips.
    function sendTip() public payable {
        // The Ether is automatically added to the contract's balance.
    }

    // 4. Our NEW function to withdraw the funds.
    function withdraw() public onlyOwner {
        // Get the amount of Ether this contract holds.
        uint amount = address(this).balance;

        // The address of the owner who should receive the funds.
        address ownerAddress = owner;

        // Transfer the entire amount to the owner.
        // We MUST cast the owner's address to 'payable'.
        payable(ownerAddress).transfer(amount);
    }
}