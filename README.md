# Bread-Rescue
# Bread Surplus Reward System

## Overview
The **Bread Surplus Reward System** is a blockchain-based solution designed to help reduce food waste by redistributing surplus bread from bakeries. By using a smart contract deployed on **Hedera's EVM-compatible layer**, we can track and reward donations of surplus bread to those in need.

- **Smart Contract**: Written in Solidity, the contract accepts the surplus data of a bakery (detected via AI) and processes rewards for the donor and bakery.
- **Reward Distribution**: When surplus bread is donated, a donor’s public key is provided, and the contract splits the reward (in tokens) 50/50 between the donor and the bakery.

---

## Smart Contract (Solidity)

The smart contract in **`BreadSurplusReward.sol`** implements a reward system using an ERC-20 token deployed on Hedera.

### Key Features:
- **Reward Distribution**: The contract receives surplus data, calculates a reward, and distributes it between the donor and the bakery.
- **Security**: Only the owner (admin or AI system) can trigger the reward distribution to ensure fairness.
- **Event Emission**: After each donation, an event is emitted to log the transaction.

### Example Code:
```solidity
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
