// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Counter {
    uint256 public count;

    event CountIncremented(uint256 newCount);

    constructor(uint256 _initialCount) {
        count = _initialCount;
    }

    function increment() public {
        count += 1;
        emit CountIncremented(count);
    }

    function setCount(uint256 _count) public {
        count = _count;
    }
}
