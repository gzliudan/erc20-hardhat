// SPDX-License-Identifier: MIT

pragma solidity 0.8.7;

contract TestBasefee {
    function getBasefee() external view returns (uint256 number, uint256 basefee) {
        return (block.number, block.basefee);
    }

    function getBasefeeInlineAssembly() external view returns (uint256 ret) {
        assembly {
            ret := basefee()
        }
    }
}
