// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TipJar {
    string public  status =" hello solidity";
     function myStatus(string calldata _status )public payable  {
      require(msg.value==1,"amount should be one eher");
      status =_status;
     }
    // We can see how much Ether is stored in this contract
    function getBalance() public view returns (uint) {
        // 'address(this).balance' is a special property that
        // gives the Ether balance of the current contract.
        return address(this).balance;
    }

    // This is a payable function. Anyone can call it and send Ether.
    function sendTip() public payable {
        // The function body can be empty! Its only job is to
        // receive the Ether.
    }
}