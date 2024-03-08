// SPDX-License-Identifier: MIT

pragma solidity 0.8.20;

contract TestPush0 {
    uint256 public num;

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

    function setNum(uint256 n) external {
        num = n;
    }
}
