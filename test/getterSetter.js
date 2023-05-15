const { expect } = require("chai");
const { ethers } = require("hardhat");
const fs = require("fs");
const path = require('path');


describe("GetterSetter Tests", function () {
  let owner;
  let GetterSetter;
  let getterSetter;
  let requestIdBytes32 = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef';
  let requestIdBytes = '0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890';
  let requestIdUint256 = '0x9876543210fedcba9876543210fedcba9876543210fedcba9876543210fedcba';
  let bytes32Val = '0x1234567890000000000000000000000000000000000000000000000000000000';
  let bytesVal = '0x0123456789abcdef';
  let uint256Val = 123456789;

  before(async function () {
    [owner] = await ethers.getSigners();
    console.log("Deployer Address: ", owner.address);
    GetterSetter = await ethers.getContractFactory("GetterSetter");
    getterSetter = await GetterSetter.deploy();
    await getterSetter.deployed();
    console.log("Contract Address: ", getterSetter.address);
    saveJsonFile();
  });
  // after(function() {
  //   saveJsonFile();
  // });
  describe('Setters', function () {
    it("Sets a value - bytes32", async function() {
      await expect(await getterSetter.requestedBytes32(requestIdBytes32, bytes32Val)).to.emit(getterSetter, 'SetBytes32').withArgs(owner.address, bytes32Val);
      console.log("Bytes32 value set: ", bytes32Val);
    });

    it("Sets a value - bytes", async function() {
      await expect(await getterSetter.requestedBytes(requestIdBytes, bytesVal)).to.emit(getterSetter, 'SetBytes').withArgs(owner.address, bytesVal);
      console.log("Bytes value set: ", bytesVal);
    });

    it("Sets a value - uint256", async function() {
      await expect(await getterSetter.requestedUint256(requestIdUint256, uint256Val)).to.emit(getterSetter, 'SetUint256').withArgs(owner.address, uint256Val);
      console.log("Uint256 value set: ", uint256Val);
    });
  });

  describe('Getters', function () {
    it("Gets a value - bytes32", async function() {
      const getter = await getterSetter.retrieveBytes32();
      expect(getter).to.equal(bytes32Val);
      console.log("Bytes32 value retrieved: ", getter);
    });

    it("Gets a value - bytes", async function() {
      const getter = await getterSetter.retrieveBytes();
      expect(getter).to.equal(bytesVal);
      console.log("Bytes value retrieved: ", getter);
    });

    it("Gets a value - uint256", async function() {
      const getter = await getterSetter.retrieveUint256();
      expect(getter.toNumber()).to.equal(uint256Val);
      console.log("Uint256 value retrieved: ", getter.toNumber());
    });
  });
  function saveJsonFile() {
    const outputDir = path.resolve(__dirname, "../output");
  
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir);
    }

    const filePath = path.join(outputDir, 'output.json');
  
    fs.writeFileSync(
      outputDir + "/output.json",
      JSON.stringify({
        Deployer_Address: owner.address,
        Contract_Address: getterSetter.address,
        Values: {
          Bytes32_Value: bytes32Val,
          Bytes_Value: bytesVal,
          Uint256_Value: uint256Val
        }
      })
    );
    console.log('JSON file created: ', filePath);
  }
});