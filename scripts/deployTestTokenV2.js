/* global run */

const { ethers, network, upgrades } = require('hardhat');
const { getImplementationAddress } = require('@openzeppelin/upgrades-core');
const { getChainInfo, getDataTime, getDeployedContracts, writeDeployedContracts } = require('./helpers');

const key1 = 'test_token_v1';
const key2 = 'test_token_v2';
const name1 = 'TestTokenV1';
const name2 = 'TestTokenV2';

async function main() {
  const { chainName, chainId } = getChainInfo();
  const { directory, filename, contracts } = getDeployedContracts(chainName, chainId);

  const proxyAddress = contracts[key1]?.proxy;
  if (!proxyAddress) {
    throw new Error(`The contract ${name1} is not deployed !`);
  }

  const implementation = contracts[key2]?.implementation;
  if (implementation) {
    console.log(`[${getDataTime()}] SKIP: ${key2}(${name2}) is already deployed at ${implementation}\n`);
    return implementation;
  }

  console.log(`Upgrade ${name1} to ${name2} ...`);
  console.log(`proxy = ${proxyAddress}`);
  const TestTokenV2 = await ethers.getContractFactory(name2);
  await upgrades.upgradeProxy(proxyAddress, TestTokenV2);
  console.log(`Upgrade OK`);

  const implementationAddress = await getImplementationAddress(network.provider, proxyAddress);
  console.log(`implementation = ${implementationAddress}`);

  contracts[key2] = { name: name2, proxy: proxyAddress, implementation: implementationAddress };
  writeDeployedContracts(directory, filename, contracts);

  if (typeof chainId === 'undefined') {
    console.log(`Skip verify: unknown chainId\n`);
    return;
  }

  await run('verify:verify', { address: implementationAddress });
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
