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
        return { owner, buyer, vendingMachine, sodaVendor }
    }


    it("Should correctly set the Deployer as owner", async function () {
        const { owner, vendingMachine } = await vendingMashinDeploy();
        const ownerOfVendingMachine = await vendingMachine.owner();
        expect(ownerOfVendingMachine).to.equal(owner.address);
    })
    it("Should reject the paymet if paymet if faield", async function () {
        const { owner, vendingMachine } = await loadFixture(vendingMashinDeploy)
        // const price = parseEther("0.01");
        const price = '1';
        await expect(vendingMachine.connect(owner).buySoda({ value: price })).to.be.revertedWith("Incorrect paymet for soda")
    })

    it("Should prvent non-owners from withdrawing funds", async function () {
        const { buyer, vendingMachine, sodaVendor } = await loadFixture(vendingMashinDeploy)
        const price = await sodaVendor.getPrice();
        await vendingMachine.connect(buyer).buySoda({ value: price });
        await expect(vendingMachine.connect(buyer).withdraw()).to.be.revertedWith("you have not right to do this")

    })

    it("Should prevent Buying soda if stock is zero", async function () {
        const { buyer, vendingMachine, sodaVendor } = await loadFixture(vendingMashinDeploy)
        const price = await sodaVendor.getPrice();
        for (let i = 0; i < 100; i++) {
            await vendingMachine.connect(buyer).buySoda({ value: price });
        }
        //prove that user can not buy soda if inventory is zero 
        expect(await vendingMachine.soda()).to.equal(0);
        await expect(vendingMachine.connect(buyer).buySoda({ value: price })).to.be.revertedWith("Sorry, out of stock!")

    })


})

// 44.52