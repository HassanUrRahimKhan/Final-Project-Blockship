//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTTT is ERC721Enumerable, Ownable {

    string baseTokenURI;
    uint winnersCount;
    mapping(uint => string) tokensUri;
    mapping(uint => address) winners;

    event NFTTTMinted(uint256 totalMinted);

    constructor() ERC721("Non Fungible TicTacToe", "NFTTT") {
        setBaseURI("https://ipfs.infura.io/ipfs/");
        winnersCount = 0;
    }


    function setBaseURI(string memory baseURI) public onlyOwner {
        baseTokenURI = baseURI;
    }

    function getUserGames(address _user) public view returns (uint[] memory){
        uint[] memory games = new uint[](winnersCount);
        uint j = 0;
        for (uint i = 1; i <= winnersCount; i++) {
            if(winners[i]==_user){
                games[j] = i;
                j++;
            }
        }
        return games;
    }

    function setWinner(address _to,uint tokenId, string memory uri) public onlyOwner {
        tokensUri[tokenId] = uri;
        winners[tokenId] = _to;
        winnersCount = tokenId;
    }

    function mintNFTTT(address _to,uint tokenId) public {
        require (winners[tokenId]==_to);
        _safeMint(_to, tokenId);
        emit NFTTTMinted(tokenId);
    }

    function _mint(address _to) private {
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function tokenURI(uint tokenId) public view override returns (string memory){
        return string(abi.encodePacked(_baseURI(), tokensUri[tokenId]));
    }
}
