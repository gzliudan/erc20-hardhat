// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import { Counters } from "@openzeppelin/contracts/utils/Counters.sol";
import { ERC721 } from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { ERC721URIStorage } from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";

contract TestNft is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _nextTokenId;

    constructor() ERC721("Test NFT", "TNFT") {
        _nextTokenId.increment();
    }

    function mint(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        uint256 currentTokenId = _nextTokenId.current();
        _nextTokenId.increment();
        _safeMint(to, currentTokenId);
        _setTokenURI(currentTokenId, tokenURI);

        return currentTokenId;
    }

    function nextTokenId() public view returns (uint256) {
        return _nextTokenId.current();
    }
}
