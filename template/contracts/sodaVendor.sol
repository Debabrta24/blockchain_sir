// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./IoraclePrice.sol";
import "./Owanable.sol";
contract sodaVendor is IoraclePrice,Owanable{

    uint public  price;


    constructor(){
    
        price = 1 ether;
    }

    function getPrice() external view returns(uint) {
        return price;
    }

    function setPrice(uint _price) public virtual  onlyOwner {
        price = _price;
    }
}