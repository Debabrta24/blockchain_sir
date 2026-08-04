// this code for money sending code   etherium
import { ethers } from "ethers";

async function sendTransactionWithProvider(privateKey, to, amount) {
  // Create provider using GetBlock
  const provider = new ethers.JsonRpcProvider(
    "https://go.getblock.us/YOUR_GETBLOCK_API_KEY"
  );

  // Create wallet connected to provider
  const wallet = new ethers.Wallet(privateKey, provider);

  try {
    // Send transaction (ethers handles nonce, gas price, gas limit, signing, etc.)
    const tx = await wallet.sendTransaction({
      to: to,
      value: ethers.parseEther(amount),
    });

    console.log("Transaction sent:", tx.hash);

    // Wait for confirmation
    const receipt = await tx.wait();

    console.log(
      "Transaction confirmed in block:",
      receipt.blockNumber
    );

    return tx.hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    throw error;
  }
}

// Example
const privateKey = "YOUR_PRIVATE_KEY";
const recipient = "0xRecipientAddress";
const amount = "0.001";

sendTransactionWithProvider(privateKey, recipient, amount)
  .then((hash) => {
    console.log("Success! Tx Hash:", hash);
  })
  .catch((err) => {
    console.error(err);
  });