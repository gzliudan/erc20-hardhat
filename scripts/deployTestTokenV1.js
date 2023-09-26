/* global run */

const { ethers, upgrades } = require('hardhat');
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');
const { getChainInfo, getDataTime, getDeployedContracts, writeDeployedContracts } = require('./helpers');

const key1 = 'test_token_v1';
const name1 = 'TestTokenV1';
const args = [];

async function main() {
  const { chainName, chainId } = getChainInfo();
  const { directory, filename, contracts } = getDeployedContracts(chainName, chainId);

  const implementation = contracts[key1]?.implementation;
  if (implementation) {
    console.log(`[${getDataTime()}] SKIP: ${key1}(${name1}) is already deployed at ${implementation}\n`);
    return implementation;
  }

  console.log(`Deploy ${name1} ...`);
  const TestTokenV1 = await ethers.getContractFactory('TestTokenV1');
  const proxy = await upgrades.deployProxy(TestTokenV1, args);
  await proxy.deployed();
  console.log(`proxy = ${proxy.address}`);

  const implementationAddress = await getImplementationAddress(ethers.provider, proxy.address);
  console.log(`implementation = ${implementationAddress}\n`);

  contracts[key1] = { name: name1, proxy: proxy.address, implementation: implementationAddress };
  writeDeployedContracts(directory, filename, contracts);

  if (typeof chainId === 'undefined') {
    console.log(`Skip verify: unknown chainId\n`);
    return;
  }

  // Wait for Etherscan to catch up (5 blocks), verify, and publish source
  await ethers.provider.waitForTransaction(proxy.deployTransaction.hash, 5);
  await run('verify:verify', { address: proxy.address });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
