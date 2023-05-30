// SPDX-License-Identifier: MIT
pragma solidity  ^0.8.8;
import "./PriceConverter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract Comitment{

    using PriceConverter for uint256;
    uint256 public deployedDate;

    uint256 constant MINIMUM_COMIT = 50 * 1e18;

    struct  Fund{
        string NameOfcomit;
        string reason;
        uint256 amount;

    }

    Fund [] public finding;

    address public immutable owner;
    uint256 public release;
    AggregatorV3Interface public priceFeed;

    constructor(address priceFeedAddress){
        deployedDate = block.timestamp; 
        release = deployedDate + 600;
        owner = msg.sender;
        priceFeed = AggregatorV3Interface(priceFeedAddress);
    }

    function BlockTimeDeployed() public view returns(uint256 time){
        return deployedDate;
    }

    function funding(string memory name , string memory reasoning )public payable {
        require(msg.value.getConvertedPrice(priceFeed) >= MINIMUM_COMIT,"Comit Requires higher amount");
        finding.push(Fund(name,reasoning,msg.value));
    }

   function blocktime() public  view returns(uint256 time){
       return(block.timestamp);
   }

    function withdraw() public only_owner {
        require(block.timestamp >= release ,"Time hasn't reached yet");
        payable(msg.sender).transfer(address(this).balance);
    

    }

    function getPriceFeed() public view returns (AggregatorV3Interface){
        return priceFeed;
    }

     modifier  only_owner{
        require(msg.sender == owner,"Not owner");
        _;
    }

}