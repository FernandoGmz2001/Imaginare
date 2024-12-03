// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Pixel is ERC721, Ownable {
    uint256 private _tokenIds;
    using Strings for uint256;
    mapping(uint256 => string) private _tokenURIs;
    string private _baseURIextended;

    constructor() Ownable(msg.sender) ERC721("Pixel", "Pixel") {}

    function setBaseUri(string memory baseUri) external onlyOwner {
        _baseURIextended = baseUri;
    }

    function _setTokenUri(
        uint256 tokenId,
        string memory _tokenURI
    ) internal virtual {
        _tokenURIs[tokenId] = _tokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        string memory _tokenURI = _tokenURIs[tokenId];
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }
        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }
        return string(abi.encodePacked(base, tokenId.toString()));
    }

  
    function mintNFT(
        address recipient,
        string memory _tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newItemId = _tokenIds;
        _mint(recipient, newItemId);
        _setTokenUri(newItemId, _tokenURI);
        emit Transfer(address(0), recipient, newItemId);
        return newItemId;
    }
}
