const { expect } = require("chai")
const VendingModule = require("../ignition/modules/Deploy")
const { ethers, ignition } = require("hardhat")
const { loadFixture } = require('@nomicfoundation/hardhat-toolbox/network-helpers')
const { parseEther } = require("ethers");
describe("testing our Vending Machine", function () {

    //deploy the contact 
    async function vendingMashinDeploy() {

        //ether chaiye hoga ..it gives 20 accounts
        const [owner, buyer] = await ethers.getSigners();
        const { sodaVendor, vendingMachine } = await ignition.deploy(VendingModule)
        return { owner, vendingMachine }
    }


    it("Should correctly set the Deployer as owner", async function () {
        const { owner, vendingMachine } = await vendingMashinDeploy();
        const ownerOfVendingMachine = await vendingMachine.owner();
        expect(ownerOfVendingMachine).to.equal(owner.address);
    })
    it("Should reject the paymet if paymet if faield", async function () {
        const { owner, vendingMachine } = await loadFixture(vendingMashinDeploy)
        // const price = parseEther("0.01");
        const price = 01;
        await expect(vendingMachine.connect(owner).buySoda({ value: price })).to.be.revertedWith("Incorrect paymet for soda")
    })
})

// 44.52