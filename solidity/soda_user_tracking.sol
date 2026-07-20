// here we are treack abiut today tomorrow yesterday , who is shopping

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VendingMashin {
    uint soda; // how mush soda left in our storage
    address owner;

    struct Customar {
        uint sodaCount;
        uint lastPurchased;
        bool vip;
    }
    mapping(address => Customar) public sodaPhurchased; //tracking of soda buying

    constructor() {
        soda = 100;
        owner = msg.sender;
    }

    function buy() public payable {
        // anyone can buy soda
        require(msg.value == 1 ether, "you should have one either"); // each soda cost 1 eth
        require(soda > 0, "soda is out of stock");
        Customar storage c1 = sodaPhurchased[msg.sender]; //storage means it save to locally,  memory means it save to locally  in ram
        c1.sodaCount++;
        if (c1.sodaCount == 5) {
            c1.vip = true;
        }
        c1.lastPurchased = block.timestamp;
        soda = soda - 1;
    }

    function restock(uint _soda) public {
        // shop owner can withdraw balace
        require(msg.sender == owner, "you need to be onwer to do thsis ");
        soda = soda + _soda;
    }

    function withdrawBalance() public {
        require(msg.sender == owner, "You have not wright to do this ");
        payable(owner).transfer(address(this).balance);
    }
}
