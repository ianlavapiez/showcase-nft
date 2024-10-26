async function main() {
  const [deployer] = await ethers.getSigners();

  // Grab the contract factory
  const EggNFT = await ethers.getContractFactory("EggNFT");

  // Start deployment, returning a promise that resolves to a contract object
  const eggNFT = await EggNFT.deploy(deployer.address); // Pass the deployer's address as the initial owner

  await eggNFT.deployed();

  console.log("Contract deployed to address:", eggNFT.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
