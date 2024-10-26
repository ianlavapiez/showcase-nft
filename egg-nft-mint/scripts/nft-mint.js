require("dotenv").config();
const ethers = require("ethers");
const contract = require("../../egg-nft/artifacts/contracts/EggNFT.sol/EggNFT.json");
const TOKEN_URIS = require("../consts/token-uri");

const API_KEY = process.env.API_KEY;
// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider("sepolia", API_KEY);

// Create a signer
const privateKey = process.env.PRIVATE_KEY;
const signer = new ethers.Wallet(privateKey, provider);

// Get contract ABI and address
const abi = contract.abi;
const contractAddress = "0x530D62be07b0DdaF0dAde6FA26622978a12FC127";

// Create a contract instance
const eggNFTContract = new ethers.Contract(contractAddress, abi, signer);

// Get a random NFT description from the uploaded metadata
const getRandomTokenURI = () => {
  const randomIndex = Math.floor(Math.random() * TOKEN_URIS.length);
  return TOKEN_URIS[randomIndex];
};

// Get the NFT Metadata IPFS URL
const tokenUri = `https://gateway.pinata.cloud/ipfs/${getRandomTokenURI()}`;

// Call mintNFT function
const mintNFT = async () => {
  let nftTxn = await eggNFTContract.mintNFT(signer.address, tokenUri);
  await nftTxn.wait();
  console.log(
    `NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`
  );
};

mintNFT()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
