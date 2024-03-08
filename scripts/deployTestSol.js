// SPDX-License-Identifier: MIT

// ==================== External Imports ====================

const dotenv = require('dotenv');

// ==================== Internal Imports ====================

const { getChainInfo, quickDeployContract } = require('./helpers');

async function deployAllContracts() {
  // print chain information
  const { chainName, chainId } = getChainInfo();
  console.log(`\nchain name = ${chainName}, chain id = ${chainId}\n`);

  // setup environment
  dotenv.config();

  // deploy all contracts
  await quickDeployContract('TestBasefee', 'test_basefee', []);
  await quickDeployContract('TestRandom', 'test_random', []);
  await quickDeployContract('TestPush0', 'test_push0', []);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
deployAllContracts().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
