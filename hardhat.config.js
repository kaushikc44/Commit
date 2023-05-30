require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("hardhat-storage-layout")


const sepoliaUrl = "https://eth-sepolia.g.alchemy.com/v2/aY4A_HeY-ILaTfkvSm8P4Kh2gNxayqBG"
const private_key = "775cd8975793d82ccf791f2db36a565f4861ad83a806519dea4823a4ccd69486"
const apiToken = "SAK1A2G24EXI1BMZQWSJ2ETBKGNYIVMIQB"
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity:{
    compilers:[{
      version:"0.8.18"
    },
    {version:"0.6.6"}],
  },
  networks:{
    sepolia:{
      url:sepoliaUrl,
      accounts:[private_key],
      chainId:11155111,
      blockConfirmations:6
    },
    localhost:{
      url:"http://127.0.0.1:8545",
      chainId:31337
    }
  },
  gasReporter:{
    currency:"INR",
    enabled:true,
    outputFile:"gas-reporter.txt",
    coinmarketcap:"124811db-7253-428b-805d-1e71ad3d9337",
    token:"MATIC"
  },
  contractSizer:{
    alphaSort:true,
    outputFile:"contract-sizer.txt"
  },
  namedAccounts:{
    deployer:{
      default:0
    }
  }
};
