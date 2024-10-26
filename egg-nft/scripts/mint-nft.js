require("dotenv").config();
const ethers = require("ethers");

const API_KEY = process.env.API_KEY;
// Alchemy URL for Sepolia network
const alchemyUrl = `https://eth-sepolia.alchemyapi.io/v2/${API_KEY}`;
// Define a JsonRpcProvider
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
const contract = require("../artifacts/contracts/EggNFT.sol/EggNFT.json");

console.log(contract.abi);
