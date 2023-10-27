// SPDX-License-Identifier: MIT

// ==================== External Imports ====================

const dotenv = require('dotenv');

// ==================== Internal Imports ====================

const { getChainInfo, quickDeployContract } = require('./helpers');

async function deployTest() {
  const contractName = 'Test';
  const key = 'test';
  const args = [];
  return quickDeployContract(contractName, key, args);
}

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
  await deployTest();
  await deployTestCoin('test_coin', 'Test Coin', 'TCT');
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployAllContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
