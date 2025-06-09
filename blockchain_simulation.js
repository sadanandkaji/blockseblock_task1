const crypto = require('crypto');

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    const blockString = this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce;
    return crypto.createHash('sha256').update(blockString).digest('hex');
  }
}

// Create blocks
const genesisBlock = new Block(0, new Date().toISOString(), "Genesis Block", "0");
const block1 = new Block(1, new Date().toISOString(), "Block 1 Data", genesisBlock.hash);
const block2 = new Block(2, new Date().toISOString(), "Block 2 Data", block1.hash);

// Blockchain array
const blockchain = [genesisBlock, block1, block2];

// Print blockchain
function printChain(chain) {
  chain.forEach((block, i) => {
    console.log(`\n--- Block ${i} ---`);
    console.log(`Index: ${block.index}`);
    console.log(`Timestamp: ${block.timestamp}`);
    console.log(`Data: ${block.data}`);
    console.log(`Previous Hash: ${block.previousHash}`);
    console.log(`Hash: ${block.hash}`);
  });
}

console.log("🔗 Blockchain Before Tampering:");
printChain(blockchain);

// 🚨 Tampering Block 1
console.log("\n🚨 Tampering Block 1...");
block1.data = "Tampered Block 1 Data";
block1.hash = block1.calculateHash();

console.log("\n🔗 Blockchain After Tampering:");
printChain(blockchain);

// ✅ Validate blockchain
function validateChain(chain) {
  for (let i = 1; i < chain.length; i++) {
    if (chain[i].previousHash !== chain[i - 1].hash) {
      console.log(`\n❌ Block ${i} is invalid! Previous hash doesn't match.`);
      return false;
    }
  }
  console.log("\n✅ Blockchain is valid.");
  return true;
}

validateChain(blockchain);
