// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { AddressUpgradeable } from "@openzeppelin/contracts-upgradeable/utils/AddressUpgradeable.sol";
import { ERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";

interface TokenRecipient {
    function tokensReceived(address sender, uint amount) external returns (bool);
}

contract TestTokenV2 is ERC20Upgradeable {
    using AddressUpgradeable for address;

    function initialize() public initializer {
        __ERC20_init("Test Token", "TTK");
        _mint(msg.sender, 100 ether);
    }

    function version() public pure returns (string memory) {
        return "v2.0";
    }

    function mint(address to, uint256 amount) external {
        _mint(to, amount);
    }

    function transferWithCallback(address recipient, uint256 amount) external returns (bool) {
        _transfer(msg.sender, recipient, amount);

        if (recipient.isContract()) {
            bool rv = TokenRecipient(recipient).tokensReceived(msg.sender, amount);
            require(rv, "No tokensReceived");
        }

        return true;
    }
}
