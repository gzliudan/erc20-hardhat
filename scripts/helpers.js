// SPDX-License-Identifier: MIT

// ==================== External Imports ====================

const fs = require('fs');
const dayjs = require('dayjs');

const DIR = './deploy';

function getDataTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

function getEthers(hre) {
  if (!hre?.ethers) {
    hre = require('hardhat');
  }

  return hre.ethers;
}

function getDeployer(RPC_ENDPOINT, DEPLOYER_PRIVATE_KEY, hre) {
  const ethers = getEthers(hre);
  const provider = new ethers.JsonRpcProvider(RPC_ENDPOINT);
  const deployer = new ethers.Wallet(`0x${DEPLOYER_PRIVATE_KEY}`, provider);

  return deployer;
}

/// @param  name  The name of contract
/// @param  args  The arguments of contract constructor function
async function deployContract(signer, name, args = []) {
  // https://github.com/NomicFoundation/hardhat/blob/master/packages/hardhat-ethers/README.md#helpers
  const { ethers } = require('hardhat');
  const Implementation = await ethers.getContractFactory(name, signer);
  const contract = await Implementation.deploy(...args);

  return contract.waitForDeployment();
}

function getDeployedContracts(chainName, chainId) {
  const filename = `${DIR}/${chainName}.json`;

  let contracts;

  try {
    contracts = JSON.parse(fs.readFileSync(filename));
  } catch (e) {
    // console.error(e);
    contracts = {
      chain_name: chainName,
      chain_id: chainId || 'null',
    };
  }

  return { directory: DIR, filename, contracts };
}

function writeDeployedContracts(directory, filename, contracts) {
  fs.mkdirSync(directory, { recursive: true });
  fs.writeFileSync(filename, JSON.stringify(contracts, null, 2));
}

function getChainInfo() {
  const hre = require('hardhat');
  const chainName = hre.network.name;
  const chainId = hre.network.config.chainId;
  const rpcEndpoint = hre.network.config.url;

  return { chainName, chainId, rpcEndpoint };
}

/// @param  name  The name of contract
/// @param  key   The key of contract instance in deployed json file
/// @param  args  The arguments of contract constructor function
async function quickDeployContract(name, key, args = []) {
  const hre = require('hardhat');

  const { DEPLOYER_PRIVATE_KEY } = process.env;
  if (!DEPLOYER_PRIVATE_KEY) {
    throw new Error(`DEPLOYER_PRIVATE_KEY is not set in file .env !}`);
  }

  const { chainName, chainId, rpcEndpoint } = getChainInfo();

  const deployer = getDeployer(rpcEndpoint, DEPLOYER_PRIVATE_KEY);

  const { directory, filename, contracts } = getDeployedContracts(chainName, chainId);
  const oldAddress = contracts[key]?.address;

  if (oldAddress) {
    console.log(`[${getDataTime()}] SKIP: ${key}(${name}) is already deployed at ${oldAddress}\n`);
    return oldAddress;
  }

  if (!args) {
    args = [];
  }

  // Deploy contract
  console.log(`[${getDataTime()}] DO: Deploy ${key}(${name}) to ${chainName}, args = ${JSON.stringify(args)}`);
  const instance = await deployContract(deployer, name, args);
  const address = await instance.getAddress();
  const hash = instance.deploymentTransaction().hash;
  const trx = await hre.ethers.provider.getTransaction(hash);
  const block = trx.blockNumber;
  console.log(`[${getDataTime()}] OK: ${key}(${name}) is deployed at ${address}, block = ${block}, hash = ${hash}`);

  // update addresses
  contracts[key] = { name, args, address, block, hash };
  writeDeployedContracts(directory, filename, contracts);
  console.log(`[${getDataTime()}] OK: Write ${key} to file ${filename}\n`);

  return instance;
}

module.exports = {
  getDataTime,
  getDeployer,
  getChainInfo,
  getDeployedContracts,
  deployContract,
  writeDeployedContracts,
  quickDeployContract,
};
