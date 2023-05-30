const {network,hre} = require("hardhat")


module.exports = async(hre) =>{
    const {getNamedAccounts,deployments} = hre;
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()

    const networkChainID = await network.config.chainId 

    let ethPriceFeed;

    if(networkChainID == 31337){
        const mocksPrice = await deployments.get("MockV3Aggregator")
        ethPriceFeed =  mocksPrice.address
    }
    else{
        ethPriceFeed = "0x694AA1769357215DE4FAC081bf1f309aDC325306"
    }

    console.log("deploying the contract")
    const funding = await deploy("Comitment",{
        from:deployer,
        args:[ethPriceFeed],
        log:true,
        waitConfirmations:network.config.blockConfirmations || 1,
        
    })
    console.log("Contract successfully deployed")
    
}

module.exports.tags = ["all","Comitment"]
