import { HardhatUserConfig } from "hardhat/config";
import { task } from "hardhat/config";

import "@nomiclabs/hardhat-ethers";

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
  },
  paths: {
    sources: "./src/blockchain/contracts",
    tests: "./src/blockchain/test",
    cache: "./src/blockchain/cache",
    artifacts: "./src/blockchain/artifacts",
  },
  networks: {
    hardhat: {
      chainId: 1337,
      accounts: [
        {
          privateKey:
            "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
          balance: "1000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
          balance: "1000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
          balance: "1000000000000000000000000000000000",
        },
      ],
    },
  },
};

export default config;
