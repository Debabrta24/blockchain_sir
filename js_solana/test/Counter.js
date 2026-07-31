import { expect } from "chai";
import hre from "hardhat";

describe("Counter Smart Contract Tests", function () {
  let counter;

  beforeEach(async function () {
    const CounterFactory = await hre.ethers.getContractFactory("Counter");
    counter = await CounterFactory.deploy(10);
    await counter.waitForDeployment();
  });

  it("Should initialize count to 10", async function () {
    expect(await counter.count()).to.equal(10);
  });

  it("Should increment count to 11", async function () {
    await counter.increment();
    expect(await counter.count()).to.equal(11);
  });

  it("Should set count to custom value", async function () {
    await counter.setCount(100);
    expect(await counter.count()).to.equal(100);
  });
});
