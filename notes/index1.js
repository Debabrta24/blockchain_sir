
//finding noce blockchain minors 
const crypto = require("crypto");

// SHA-256 Hash Function
function sha256(data) {
    return crypto
        .createHash("sha256")
        .update(data)
        .digest("hex");
}

// Nonce Generator / Miner
function mineBlock(data, difficultyPrefix = "0") {

    let nonce = 0;
    let hash = "";

    console.log(`Mining started... Looking for hash starting with '${difficultyPrefix}'`);

    while (true) {

        // Change the input every iteration
        const input = data + nonce.toString();

        hash = sha256(input);

        // Check difficulty
        if (hash.startsWith(difficultyPrefix)) {

            console.log("\n✅ Hash Found!");
            console.log("Data  :", data);
            console.log("Nonce :", nonce);
            console.log("Hash  :", hash);

            return {
                nonce,
                hash
            };
        }

        // Show progress every 100000 attempts
        if (nonce % 100000 === 0) {
            console.log(
              `  Trying nonce ${nonce}... Current Hash: ${hash}`
            );
        }

        nonce++;
    }
}

// Run
mineBlock("Rohit sends 10 BTC to Ram", "00000");