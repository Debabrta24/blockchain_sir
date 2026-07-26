// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract myFavoriteNumber {
    uint public myNumber = 10;
    string public myStaus = "Learning Solidity";
    uint check = 10;

    address public  owner; // storing the adress of owner
    constructor() {
        owner =msg.sender;
    }

    // write one use multiple time ownwer function 

    modifier myOwner (){
        require(msg.sender==owner,"only owner can change the value ");
        _;
    }
    //fisrt function
    function setMynumber(uint _myNumber) public {
        myNumber = _myNumber;
    }
    function setMyStatus(string calldata _myStatus) public {
        myStaus = _myStatus;
    }

    function checking() public myOwner view returns (uint) {
        // view means only valu read
        return check;
    }

    function hitting(uint _num)  public  pure  returns (uint) {
        //pure means no state read
        return _num * 2;
    }
    function sum(uint _num) public view returns (uint) {
        uint total = 0;
       // require(_num>2,"number can't be set to low vaue");

    //    what if i want a condion only owner can chnage details 
    require(msg.sender==owner,"only owner can change the value");
        for (uint i = 1; i <= _num; i++) {
            total = total + i;
        }
        return  total;
    }
}
