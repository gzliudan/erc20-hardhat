// SPDX-License-Identifier: MIT

pragma solidity 0.8.18;

contract TestRandom {
    function getBasefee() external view returns (uint256 number, uint256 basefee) {
        return (block.number, block.basefee);
    }

    function getBasefeeInlineAssembly() external view returns (uint256 ret) {
        assembly {
            ret := basefee()
        }
    }

    function getDifficulty() external view returns (uint256 number, uint256 random) {
        return (block.number, block.difficulty);
    }

    function getPrevrandao() external view returns (uint256 number, uint256 random) {
        return (block.number, block.prevrandao);
    }
}
