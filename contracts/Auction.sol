pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTAuction is ERC721URIStorage{
    string public NFTName;
    string public NFTType;
    uint256 public NFTCount = 0;
    mapping(uint256 => NFT) public allNFT;// use allNFT to save nftinfo
    mapping(uint256 => Auction)public AuctionOfNFT;
    mapping(string => bool)public tokenNameExist;
    constructor() ERC721("NFT", "fissh") {
         NFTName = "NFT";
         NFTType = "fissh";
    }
    
    struct NFT{
        uint256 ID;
        string name;
        address payable minter;
        address payable CurrentOwner;
        address payable PreviousOwner;
        uint256 price;
        bool onsale;
        bool claim;
    }
    
    struct Auction{
        address payable HighestBidder;
        uint HighestPrice;
        uint endtime;
        bool end;
        bool claim;
    }
    
    function  CreateNFT(string memory NFTname) public{
         NFTCount++;
         
         uint256 _tokenId = NFTCount;
         require(!_exists(NFTCount));
         require(!tokenNameExist[NFTname]);
         
         _mint(msg.sender, _tokenId);
         
         NFT memory newNFT = NFT(
            NFTCount,
            NFTname,
            payable(msg.sender),
            payable(msg.sender),
            payable(address(0)),
            0,
            false,
            false
        );
        allNFT[NFTCount] = newNFT;
     }
     
     function  beginAuction(uint256  _tokenID, uint256 startprice , uint256 duration)  public returns (bool AuctionBeginSucceed){
         require(msg.sender == ownerOf(_tokenID),"Not owner");
         
         NFT memory curNFT = allNFT[_tokenID];
         Auction memory curAuc = Auction(
            payable(msg.sender),
            startprice,
            block.timestamp + duration,
            false,
            false
        );
        
         curNFT.onsale = true;
         allNFT[_tokenID] = curNFT;
         AuctionOfNFT[_tokenID] = curAuc;
         return true;
     }
     
     function  bid(uint256  _tokenID, uint256 _price)  public returns (bool BidSucceed){
         require(msg.sender != ownerOf(_tokenID),"Owner can't bid");
         
         NFT memory curNFT = allNFT[_tokenID];
         Auction memory curAuc = AuctionOfNFT[_tokenID];
         
         require(block.timestamp < curAuc.endtime,"Auction ended");
         require(_price > curAuc.HighestPrice,"You should give a higher price");
         
         curAuc.HighestPrice = _price;
         curNFT.PreviousOwner = curNFT.CurrentOwner;
         curAuc.HighestBidder = payable(msg.sender);
         curNFT.CurrentOwner = payable(msg.sender);
         
         curNFT.price = _price;
         allNFT[_tokenID] = curNFT;
         AuctionOfNFT[_tokenID] = curAuc;
         return true;
     }
     
     function EndAuction(uint256  _tokenID) public returns (bool AuctionEndSucceed){
          Auction memory curAuc = AuctionOfNFT[_tokenID];
          NFT memory curNFT = allNFT[_tokenID];
          
          require(block.timestamp > curAuc.endtime,"Auction not ended");
          
          curAuc.end = true;
          AuctionOfNFT[_tokenID] = curAuc;
          curNFT.onsale = false;
          allNFT[_tokenID] = curNFT;
          return true;
     }
     
     function claimNFT(uint256  _tokenID) public payable returns (bool){
          NFT memory curNFT = allNFT[_tokenID];
          Auction memory curAuc = AuctionOfNFT[_tokenID];
          
          require(curNFT.onsale == false,"NFT still on sale");
          require(curNFT.claim != true,"kono NFT is allready claimed");
          require(msg.sender == curAuc.HighestBidder,"Not the highest bidder");
          
           _transfer(curNFT.minter, msg.sender, _tokenID);
           payable(curNFT.minter).transfer(msg.value);
           curNFT.CurrentOwner = payable(msg.sender);
           curNFT.onsale = false;
           curNFT.claim = true;
           allNFT[_tokenID] = curNFT;
           curAuc.claim = true;
           AuctionOfNFT[_tokenID] = curAuc;
          return true;
     }
     
     
        function getprice(uint256 _tokenID) public view returns  (uint) {
            return allNFT[_tokenID].price;
        }
    
        function getminter(uint256 _tokenID) public view returns  (address) {
            return allNFT[_tokenID].minter;
        }
        
        function getcurrentowner(uint256 _tokenID) public view returns  (address) {
            return allNFT[_tokenID].CurrentOwner;
        }
        function getpreviousowner(uint256 _tokenID) public view returns (address){
            return allNFT[_tokenID].PreviousOwner;
        }
        
        function isonsale(uint256 _tokenID) public view returns  (bool) {
            return allNFT[_tokenID].onsale;
        }
        
         function highestbidder(uint256 _tokenID) public view returns  (address ) {
            return AuctionOfNFT[_tokenID].HighestBidder;
        }
        
        function lefttime(uint256 _tokenID) public view returns  (uint) {
            uint curtime = block.timestamp;
            uint endtime = AuctionOfNFT[_tokenID].endtime;
            return endtime - curtime;
        }
        
}