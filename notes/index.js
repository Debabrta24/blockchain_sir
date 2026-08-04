const bip39 = require("bip39");
const ethers = require("ethers");
const bitcoin = require("bitcoinjs-lib");
const { BIP32Factory } = require("bip32");
const ecc = require("tiny-secp256k1");
const { Keypair } = require("@solana/web3.js");
const { derivePath } = require("ed25519-hd-key");
const bs58 = require("bs58").default;
const bip32 = BIP32Factory(ecc);

// ---------------- ETHEREUM ----------------
function deriveEthereumWallet(seed) {
  const ethPath = "m/44'/60'/0'/0/0";

  const rootNode = ethers.HDNodeWallet.fromSeed(seed);
  const ethNode = rootNode.derivePath(ethPath);

  console.log("\n===== Ethereum =====");
  console.log("Derivation Path :", ethPath);
  console.log("Private Key     :", ethNode.privateKey);
  console.log("Public Key      :", ethNode.publicKey);
  console.log("Address         :", ethNode.address);
}

// ---------------- BITCOIN ----------------
function deriveBitcoinWallet(seed) {
  const btcPath = "m/84'/0'/0'/0/0";

  const root = bip32.fromSeed(seed);
  const child = root.derivePath(btcPath);

  const { address } = bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(child.publicKey),
  });

  console.log("\n===== Bitcoin =====");
  console.log("Derivation Path :", btcPath);
  console.log("Private Key     :", child.privateKey.toString("hex"));
  console.log("Public Key      :", child.publicKey.toString("hex"));
  console.log("Address         :", address);
}

// ---------------- SOLANA ----------------
function deriveSolanaWallet(seed) {
  const solanaPath = "m/44'/501'/0'/0'";

  const solanaDerivedSeed = derivePath(solanaPath, seed.toString("hex")).key;

  const solanaKeypair = Keypair.fromSeed(solanaDerivedSeed);

  const solanaAddress = solanaKeypair.publicKey.toBase58();

  const solanaPrivateKey = bs58.encode(solanaKeypair.secretKey);

  console.log("\n===== Solana =====");
  console.log("Derivation Path :", solanaPath);
  console.log("Private Key(Base58):", solanaPrivateKey);
  console.log("Public Key/Address :", solanaAddress);
}

// ---------------- MAIN ----------------
async function main() {
  const mnemonic = bip39.generateMnemonic();

  console.log("====================================");
  console.log("✅ Generated 12-Word Mnemonic Phrase:");
  console.log(mnemonic);
  console.log("====================================");

  const seed = await bip39.mnemonicToSeed(mnemonic);

  deriveEthereumWallet(seed);
  deriveBitcoinWallet(seed);
  deriveSolanaWallet(seed);
}

main().catch(console.error);