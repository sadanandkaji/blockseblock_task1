// Helper for random int in range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// ---------- Mock Validators ----------
const validators = {
  miner: { name: "Miner_1", power: getRandomInt(1, 100) },
  staker: { name: "Staker_1", stake: getRandomInt(1, 100) },
  delegates: [
    { name: "Delegate_A", votes: 0 },
    { name: "Delegate_B", votes: 0 },
    { name: "Delegate_C", votes: 0 }
  ],
  voters: ["Voter_1", "Voter_2", "Voter_3"]
};

// ---------- Proof of Work ----------
function simulatePoW() {
  console.log("\n🔧 PoW Consensus:");
  console.log(`Miner power = ${validators.miner.power}`);
  console.log("✅ Selected validator: " + validators.miner.name);
  console.log("Reason: Miner with the most computational power wins the right to add the block.");
}

// ---------- Proof of Stake ----------
function simulatePoS() {
  console.log("\n💰 PoS Consensus:");
  console.log(`Staker stake = ${validators.staker.stake}`);
  console.log("✅ Selected validator: " + validators.staker.name);
  console.log("Reason: Validator with the highest stake is chosen to create the next block.");
}

// ---------- Delegated Proof of Stake ----------
function simulateDPoS() {
  console.log("\n🗳️ DPoS Consensus:");
  
  // Each voter randomly votes for a delegate
  validators.voters.forEach((voter) => {
    const voteIndex = getRandomInt(0, 2);
    validators.delegates[voteIndex].votes += 1;
    console.log(`${voter} voted for ${validators.delegates[voteIndex].name}`);
  });

  // Sort delegates by vote count
  const winner = validators.delegates.sort((a, b) => b.votes - a.votes)[0];

  console.log("✅ Selected validator: " + winner.name);
  console.log("Reason: Delegate with the most community votes is elected to validate the block.");
}

// ---------- Run Simulations ----------
simulatePoW();
simulatePoS();
simulateDPoS();
