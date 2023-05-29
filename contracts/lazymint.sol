// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public mintingFee = 0 ether;
    uint256 public airdropFee = 0 ether;

    struct TokenInfo {
        string name;
        string description;
        string uri;
    }

    mapping (uint256 => TokenInfo) private _tokenInfos;
    mapping (address => uint256[]) private _ownedTokens;

    event Minted(uint256 tokenId, address owner);
    event Airdropped(uint256 tokenId, address recipient);
    event MintingFeeChanged(uint256 newMintingFee);
    event AirdropFeeChanged(uint256 newAirdropFee);

    constructor() ERC721("MyNFT", "MNFT") {}

    function _setTokenInfo(uint256 tokenId, string memory name, string memory description, string memory uri) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        _tokenInfos[tokenId] = TokenInfo(name, description, uri);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        return _tokenInfos[tokenId].uri;
    }

    function mint(string memory name, string memory description, string memory metadataURI) public payable returns (uint256) {
        require(msg.value >= mintingFee, "Not enough Ether provided.");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(msg.sender, newItemId);
        _setTokenInfo(newItemId, name, description, metadataURI);

        _ownedTokens[msg.sender].push(newItemId);

        emit Minted(newItemId, msg.sender);

        return newItemId;
    }

    function batchMint(string[] memory names, string[] memory descriptions, string[] memory metadataURIs) public payable returns (uint256[] memory) {
        require(names.length == descriptions.length && names.length == metadataURIs.length, "Input arrays length mismatch");
        require(msg.value >= mintingFee * names.length, "Not enough Ether provided for minting fees");

        uint256[] memory newItemIds = new uint256[](names.length);

        for (uint i = 0; i < names.length; i++) {
            _tokenIds.increment();

            uint256 newItemId = _tokenIds.current();
            _mint(msg.sender, newItemId);
            _setTokenInfo(newItemId, names[i], descriptions[i], metadataURIs[i]);

            _ownedTokens[msg.sender].push(newItemId);

            emit Minted(newItemId, msg.sender);

            newItemIds[i] = newItemId;
        }

        return newItemIds;
    }

    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function batchTransfer(address recipient, uint256[] memory tokenIds) public {
        for (uint i = 0; i < tokenIds.length; i++) {
            safeTransferFrom(msg.sender, recipient, tokenIds[i]);
        }
    }

    function airdropNFTs(address[] memory recipients, uint256[] memory tokenIds) public payable {
        require(msg.value >= airdropFee, "Not enough Ether provided for airdrop fee");
        require(recipients.length == tokenIds.length, "recipients and tokenIds arrays must have the same length");

        for (uint i = 0; i < recipients.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Caller must be the owner of the token");
            safeTransferFrom(msg.sender, recipients[i], tokenIds[i]);

            emit Airdropped(tokenIds[i], recipients[i]);
        }
    }

    function getTokenInfo(uint256 tokenId) public view returns (string memory name, string memory description, string memory uri) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");
        TokenInfo memory info = _tokenInfos[tokenId];
        return (info.name, info.description, info.uri);
    }

    function setMintingFee(uint256 newMintingFee) public onlyOwner {
        mintingFee = newMintingFee;
        emit MintingFeeChanged(newMintingFee);
    }

    function setAirdropFee(uint256 newAirdropFee) public onlyOwner {
        airdropFee = newAirdropFee;
        emit AirdropFeeChanged(newAirdropFee);
    }

    function withdrawFees() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
