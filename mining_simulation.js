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

  mineBlock(difficulty) {
    const target = Array(difficulty + 1).join("0");
    console.log(`\n⛏️ Mining block with difficulty ${difficulty}...`);
    const startTime = Date.now();

    while (this.hash.substring(0, difficulty) !== target) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    const endTime = Date.now();
    console.log(`✅ Block mined!`);
    console.log(`🔢 Final Hash: ${this.hash}`);
    console.log(`🔁 Nonce attempts: ${this.nonce}`);
    console.log(`⏱️ Time taken: ${(endTime - startTime) / 1000} seconds`);
  }
}

const difficulty = 4;

const block = new Block(1, new Date().toISOString(), "Mining simulation", "0");
block.mineBlock(difficulty);
