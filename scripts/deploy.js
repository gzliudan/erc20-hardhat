// SPDX-License-Identifier: MIT

// ==================== External Imports ====================

const dotenv = require('dotenv');

// ==================== Internal Imports ====================

const { getChainInfo, quickDeployContract } = require('./helpers');

async function deployTestCoin(key, name, symbol) {
  const contractName = 'TestCoin';
  const args = [name, symbol];
  return quickDeployContract(contractName, key, args);
}

async function deployAllContracts() {
  // print chain information
  const { chainName, chainId } = getChainInfo();
  console.log(`\nchain name = ${chainName}, chain id = ${chainId}\n`);

  // setup environment
  dotenv.config();

  // deploy all contracts
  await deployTestCoin('test_coin', 'Test Coin', 'TCT');
}

deployAllContracts()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
