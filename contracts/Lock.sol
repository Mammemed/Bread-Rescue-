// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BreadSurplusReward {
    address public owner;
    IERC20 public rewardToken;

    event RewardDistributed(address indexed donor, address indexed bakery, uint256 amount);

    constructor(address _tokenAddress) {
        owner = msg.sender;
        rewardToken = IERC20(_tokenAddress);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    function rewardForDonation(address donor, address bakery, uint256 totalRewardAmount) public onlyOwner {
        require(donor != address(0) && bakery != address(0), "Invalid address");
        require(totalRewardAmount > 0, "Invalid amount");

        uint256 half = totalRewardAmount / 2;

        require(rewardToken.transfer(donor, half), "Token transfer to donor failed");
        require(rewardToken.transfer(bakery, half), "Token transfer to bakery failed");

        emit RewardDistributed(donor, bakery, totalRewardAmount);
    }
}

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}
