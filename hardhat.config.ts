import * as dotenv from "dotenv";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@openzeppelin/hardhat-upgrades";
import "@matterlabs/hardhat-zksync-deploy";
import "@matterlabs/hardhat-zksync-solc";
import "@nomiclabs/hardhat-vyper";
import "@matterlabs/hardhat-zksync-vyper";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.12",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  zksolc: {
    version: "1.3.5",
    compilerSource: "binary",
    settings: {},
  },
  zkvyper: {
    version: "1.3.5",
    compilerSource: "binary", // binary or docker
    settings: {
      compilerPath: "zkvyper", // ignored for compilerSource: "docker"
      // libraries{} // optional. References to non-inlinable libraries
    },
  },
  //  defaultNetwork: "zkSyncTestnet",
  networks: {
    hardhat: {
      forking: {
        url: process.env.BSC_RPC || "",
        blockNumber: 25894014,
      },
    },
    goerli: {
      url: process.env.GOERLI_RPC || "",
      accounts: process.env.DEV_KEY !== undefined ? [process.env.DEV_KEY] : [],
    },
    bsc: {
      url: process.env.BSC_RPC || "",
      accounts: process.env.DEV_KEY !== undefined ? [process.env.DEV_KEY] : [],
    },
    zkSyncTestnet: {
      url: "https://testnet.era.zksync.dev", // The testnet RPC URL of zkSync Era network.
      ethNetwork: "goerli", // The identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true, // Set to true to target zkSync Era.
    },
    zkSync: {
      url: "https://testnet.era.zksync.dev", // The testnet RPC URL of zkSync Era network.
      ethNetwork: "mainnet", // The identifier of the network (e.g. `mainnet` or `goerli`)
      zksync: true, // Set to true to target zkSync Era.
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
