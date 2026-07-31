import { expect } from "chai";
import { Keypair, Connection, clusterApiUrl } from "@solana/web3.js";

describe("Solana Web3.js Tests", function () {
  it("Should create a valid Solana Keypair", function () {
    const keypair = Keypair.generate();
    const pubKey = keypair.publicKey.toBase58();
    expect(pubKey).to.be.a("string");
    expect(pubKey.length).to.be.greaterThan(30);
  });

  it("Should connect to Solana Devnet node", async function () {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const version = await connection.getVersion();
    expect(version["solana-core"]).to.be.a("string");
  });
});
