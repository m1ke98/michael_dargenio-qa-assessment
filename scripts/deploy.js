const hre = require("hardhat");

async function main() {

  const GetterSetter = await hre.ethers.getContractFactory("GetterSetter");
  const getterSetter = await GetterSetter.deploy();
  await getterSetter.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
