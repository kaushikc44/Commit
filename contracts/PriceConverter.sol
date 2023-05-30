// SPDX-License-Identifier: MIT

pragma solidity  ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
library PriceConverter {

      function getPrice(AggregatorV3Interface price) internal view returns (uint256){
        //ABI
        //ADDRESS 0x694AA1769357215DE4FAC081bf1f309aDC325306
        //  AggregatorV3Interface price =  AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
         (,int256 liveprice,,,) = price.latestRoundData();
         return uint256(liveprice *  10000000000);
       
    }

    // function getVersion () internal view  returns (uint256){
    //     AggregatorV3Interface version =  AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
    //     return version.version();
    // }

    function getConvertedPrice(uint256 ethAmount,AggregatorV3Interface priceFeed) internal view returns (uint256){
        uint256 ethPrice = getPrice(priceFeed);
        uint256 ethAmountInUSD = (ethPrice * ethAmount) / 1000000000000000000;
        return ethAmountInUSD;
    }

}