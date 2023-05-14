const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying the contracts with the account:",
    await deployer.getAddress()
  );

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const GetterSetter = await hre.ethers.getContractFactory("GetterSetter");
  const getterSetter = await GetterSetter.deploy();

  await getterSetter.deployed();

  console.log("GetterSetter deployed to:", getterSetter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
