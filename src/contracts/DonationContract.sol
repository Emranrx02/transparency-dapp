// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
    address public owner;
    mapping(address => uint256) public donations;

    event DonationReceived(address indexed donor, uint256 amount, uint256 timestamp);

    constructor(address _owner) {
        owner = _owner;
    }

    function donate() public payable {
        require(msg.value > 0, "Must send some ether");
        donations[msg.sender] += msg.value;
        payable(owner).transfer(msg.value);
        emit DonationReceived(msg.sender, msg.value, block.timestamp);
    }

    function getDonation(address donor) public view returns (uint256) {
        return donations[donor];
    }
}