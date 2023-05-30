const {network,hre} = require("hardhat")

const DECIMAL_VALUE = 8
const INITIAL_VALUE = 20000000000
module.exports = async(hre) =>{
    const {getNamedAccounts,deployments} = hre;
    const {deploy,log} = deployments
    const {deployer} = await getNamedAccounts()

    const networkChainID = await network.config.chainId 
    console.log("Deplying Mocks")
    if(networkChainID === 31337){
        log("Deploying the MOCKV3AGGREAGATOR")
        await deploy("MockV3Aggregator",{
            from:deployer,
            log:true,
            args:[DECIMAL_VALUE,INITIAL_VALUE]
        })
    }
    console.log("Mocks deployed")
}

module.exports.tags = ["all","mocks"]
