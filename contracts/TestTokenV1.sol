// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

// ==================== External Imports ====================

import { ERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import { Initializable } from "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract TestTokenV1 is ERC20Upgradeable {
    function initialize() public initializer {
        __ERC20_init("Test Token", "TTK");
        _mint(msg.sender, 100 ether);
    }

    function version() public pure returns (string memory) {
        return "v1.0";
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }
}
