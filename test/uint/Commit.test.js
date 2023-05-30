const {assert, expect} = require("chai");

const { getNamedAccounts, deployments, ethers} = require("hardhat")

describe("Testing of the Commit Solidity program",async function(){
    let mocksv3aggregator;
    let commit; 
    let deployer;
    beforeEach(async function(){
    
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["mocks","Comitment"])
        console.log("The fixture is crossed")
       
        mocksv3aggregator = ethers.getContract("MockV3Aggregator");
        commit = await ethers.getContract("Comitment")
        
        
        
       
    })

    describe("testing mock script", async function () {
        it("Match the owner and the deployer",async function () {
            const owner = await commit.owner()
            console.log("owner",owner)
            console.log("deployer",deployer)
            assert.equal(owner,deployer)
        })
        it("set the aggregator address correctly", async function () {
            const response = await commit.getPriceFeed()
            console.log(response)
            assert.equal(response,(await mocksv3aggregator).address)
        })
    })

    describe("testing the contract fund fuction", async function () {
        it("funding",async function() {
            const sendvalue = ethers.utils.parseEther("100")
            await expect(commit.funding("storing","value stored",{value:sendvalue})).to.be.revertedWith("You need more spend for eth")
        })

        
    })

    describe("Block time check", async function(){
        let date; 
            
        let todayDate;
        beforeEach(async function(){
            const blockTime = await commit.BlockTimeDeployed()
            const deci = parseInt(blockTime.toHexString().toString(),16)
            console.log(deci)
            
            date = new Date(deci * 1000)
            todayDate = new Date()
            
                
           
        })

        it("Check for year", async () => {
            const year = date.getFullYear()
            const todayyear = todayDate.getFullYear()
            assert.equal(year, todayyear)
        })

        it("Check for month", async () =>{
            const month = date.getMonth()  
            const todaymonth = todayDate.getMonth()
            assert.equal(month, todaymonth)
        })

        it("Check for day", async () =>{
            const day = date.getDate()
            const todayday = todayDate.getDate()
            assert.equal(day, todayday)
        })

        it("Check for hour", async () =>{
            const hour = date.getHours()
            const todayhour = todayDate.getHours()
            assert.equal(hour, todayhour)
        })

        it("Check for second", async () =>{
            const second = date.getSeconds()
            const todaysecond = todayDate.getSeconds()
            assert.notEqual(second, todaysecond)
        })
    })
})