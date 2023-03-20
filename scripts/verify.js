// SPDX-License-Identifier: MIT

// ==================== External Imports ====================

const hre = require('hardhat');

// ==================== Internal Imports ====================

const { getDataTime, getDeployedContracts } = require('./helpers');

const CHAIN_NAME = hre.network.name;
const CHAIN_ID = hre.network.config.chainId;
console.log(`\nCHAIN_NAME = ${CHAIN_NAME}, CHAIN_ID = ${CHAIN_ID}\n`);

async function verifyContract(address, args) {
  try {
    await hre.run('verify:verify', {
      network: CHAIN_NAME,
      address,
      constructorArguments: args,
    });
  } catch (e) {
    console.error(e);
  }

  // add space after each attempt
  console.log('\n');
}

async function quickVerifyContract(key, args) {
  const { filename, contracts } = getDeployedContracts(CHAIN_NAME, CHAIN_ID);
  const contractAddress = contracts[key].address;

  if (!contractAddress) {
    throw new Error(`Fail to verify ${key}: must set ${key} in file ${filename} !`);
  }

  if (!args) {
    args = contracts[key].args;
  }

  if (!args) {
    args = [];
  }

  console.log(`[${getDataTime()}] Verify ${key} at ${contractAddress}, args = ${JSON.stringify(args)}`);
  await verifyContract(contractAddress, args);
}

async function verifyAll() {
  await quickVerifyContract('test_coin');
}

verifyAll()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
