// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
contract Owanable {
    address public owner;
    constructor() {
        owner = msg.sender;
    }
    event OwnerShiptransfer(address indexed  oldOwner,address indexed  newOwner);
    modifier onlyOwner() {
        require(msg.sender == owner, "you have not right to do this");
        _;
    }
    function transferOwnership(address _newOwner) public {
        emit OwnerShiptransfer(owner,_newOwner);
        owner = _newOwner;
    }
}
