// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

// ==================== External Imports ====================

import { ERC20 } from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import { ERC20Permit } from "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";

/**
 * @title TestCoin
 * @author Danile Liu
 * @custom:contact 139250065@qq.com
 */
contract TestCoin is ERC20, ERC20Permit {
    // ==================== Constructor function ====================

    constructor(string memory name, string memory symbol) ERC20(name, symbol) ERC20Permit(name) {
        _mint(msg.sender, 10_000 ether);
    }

    // ==================== External functions ====================

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
