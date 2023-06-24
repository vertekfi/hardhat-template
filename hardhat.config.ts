import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-contract-sizer';
import '@nomiclabs/hardhat-etherscan';
// import '@matterlabs/hardhat-zksync-deploy';
// import '@matterlabs/hardhat-zksync-solc';
// import '@matterlabs/hardhat-zksync-vyper';

dotenv.config();

const accounts = process.env.DEV_KEY !== undefined ? [process.env.DEV_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: '0.8.15',
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  // zksolc: {
  //   version: '1.3.10',
  //   compilerSource: 'binary',
  //   settings: {},
  // },
  networks: {
    hardhat: {
      forking: {
        url: process.env.ARBITRUM_RPC || '',
        blockNumber: 97443294,
      },
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC || '',
      accounts,
    },
    optimism: {
      url: `${process.env.OPTIMISM_RPC}`,
      accounts,
    },
    bsc: {
      url: process.env.BSC_RPC || '',
      accounts,
    },
    // zkSyncTestnet: {
    //   url: 'https://testnet.era.zksync.dev', // The testnet RPC URL of zkSync Era network.
    //   ethNetwork: 'goerli', // The identifier of the network (e.g. `mainnet` or `goerli`)
    //   zksync: true, // Set to true to target zkSync Era.
    // },
    // zkSync: {
    //   url: 'https://testnet.era.zksync.dev', // The testnet RPC URL of zkSync Era network.
    //   ethNetwork: 'mainnet', // The identifier of the network (e.g. `mainnet` or `goerli`)
    //   zksync: true, // Set to true to target zkSync Era.
    // },
    // zkSyncLocal: {
    //   url: 'http://localhost:3050/',
    //   chainId: 270,
    //   zksync: true,
    // },
  },
  contractSizer: {
    // override defaults as needed: https://www.npmjs.com/package/hardhat-contract-sizer
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
