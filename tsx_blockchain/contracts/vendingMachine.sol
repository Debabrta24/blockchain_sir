// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IoraclePrice.sol";
import "./Owanable.sol";

contract vendingMachine is Owanable {
    uint public soda;
    IoraclePrice public priceOracle;

    event Sodapurchase(address byer, uint _value);
    constructor(address _addressOracle) {
        soda = 100;
        priceOracle = IoraclePrice(_addressOracle);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    function buySoda() public payable {
 uint _price = priceOracle.getPrice();
     //   uint _price = 1 ether;
        require(msg.value == _price, "Incorrect paymet for soda");
        require(soda > 0, "Sorry, out of stock!");
        soda = soda - 1;
        emit Sodapurchase(msg.sender, 1); //record reason of soda buy
    }

    function addStock(uint _soda) public virtual  onlyOwner {
        soda = soda + _soda;
    }

    function withdraw() public onlyOwner {
        payable(msg.sender).transfer(address(this).balance);
    }
}
