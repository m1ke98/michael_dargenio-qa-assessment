const { expect } = require("chai");
const { ethers } = require("hardhat");


describe("GetterSetter", function () {
  it("Deploys the contract", async function () {
    const [owner] = await ethers.getSigners();

    console.log(owner);

    const GetterSetter = await ethers.getContractFactory("GetterSetter");
    const getterSetter = await GetterSetter.deploy();

    await getterSetter.deployed();

    console.log(getterSetter.address);
  });
});