
// 1. We tell the compiler what license we're using. It's just a good habit.
// SPDX-License-Identifier: MIT

// 2. We tell the compiler which version of Solidity to use.
pragma solidity ^0.8.20;

// 3. We define our contract. Think of it like a 'class' in C++.
contract HelloWorld {
    // 4. This is a "State Variable". It is data stored permanently
    //    with the contract on the blockchain.
    string public greeting = "Hello, World!fef"; ///// this are store in permanet storage 
    uint mynumber = 30;
    //public means, axceble by public function call
    int a = -20;
    // suggestion also availble

    uint public myNumber = 10;
    function setMynumner(uint _myNumber) public { ///// this are, all function  store in tempuraray  storage 
        myNumber = _myNumber;
    }
    string public  myStatus="dev";

    function setMystatus(string memory _myStatus) public {
        myStatus = _myStatus;
        // for string need to write memory here  also  you can use calldata 
        //for read only data use calldata 
        //and for read plus write , use memory
    }
}
