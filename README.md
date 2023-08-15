# About this project

This project demonstrates a basic Hardhat use case.

## Initialize project

Download and initialize this repository:

```bash
git clone https://github.com/gzliudan/erc20-hardhat.git
cd erc20-hardhat
git checkout ethers-v5
yarn
```

## Compile contracts

Compile and test contracts:

```bash
yarn make
```

or

```bash
yarn clean
yarn compile
yarn test
```

## Setup secrets

Create and edit file `.env`, set variable `DEPLOYER_PRIVATE_KEY`, also set variable `POLYGONSCAN_API_KEY` if mumbai and polygon network are used.

```bash
cp env.sample .env
vi .env
```

## Deploy contracts

Deploy and verify contracts according to your network:

### 1. Mumbai network

```bash
yarn deploy:mumbai
yarn verify:mumbai
```

### 2. Polygon network

```bash
yarn deploy:polygon
yarn verify:polygon
```

### 3. Apothem netowrk

```bash
yarn deploy:apothem
yarn verify:apothem
```

### 4. Xinfin netowrk

```bash
yarn deploy:xinfin
yarn verify:xinfin
```
