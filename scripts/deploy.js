
const hre = require("hardhat");

async function main() {
  
  const Store = await hre.ethers.getContractFactory("StoreContract");
  const store = await Store.deploy();

  await store.deployed();

  console.log("Store deployed to:", store.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
