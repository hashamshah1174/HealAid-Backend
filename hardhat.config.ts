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
            "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80", //for admin
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xc5dfac389707c90b77dbac390abbddf684d2a3d319eadaa7124b61a41963ef47",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x1991d6be696f58f9b7c430abe71cb0c6da6c4e5e2d9831610e60e3d83b430f84",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x92b7cb50664e178be70a1c19b3a15143af17f9e6f125b18488ea016ac99f2315",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x54134ddc61b97801f5a3ce9df4f27e6bcf352a5061fb0ac181297eb1fbb040a0",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x66bf6f379c428ae5d4026f15f3d580a8679307f61daee96f3c50bf2e5852e24a",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x2f481dc54afbb95a11d622f66eb05977a9b1ecb81b94cc28f46338f1381dbb26",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0xa92d4707061686b8397a3e754d5a47ccbb12ac446142d0c228f1fb19e44d6f4c",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x98692860d45e09816e4e84e1b84bfe94ebc6ca2f0b2d24f7fda5dd6763c2b100",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x5fda77bc1447dd0c731541ae3a6cd7c3ebc4bf3ccce1538cc137a24e2e36ea4c",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x2e122de6c97858a2ce6413a3071982440d934f3e1691b4296bf0c51c77d0e28f",
          balance: "10000000000000000000000000000000000000000000",
        },
        {
          privateKey:
            "0x978c2990ca7b30dd9c6c1e6d7f15327da354533869c55a7d15ec5d2565b3a7db",
          balance: "10000000000000000000000000000000000000000000",
        },
      ],
    },
  },
};

export default config;
