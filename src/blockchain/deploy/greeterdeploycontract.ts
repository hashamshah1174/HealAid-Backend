import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main(): Promise<void> {
  const Greeter = await ethers.getContractFactory("Greeter");
  const greeterContr = await Greeter.deploy();
  await greeterContr.deployed();
  console.log(`Greeter contract deployed to ${greeterContr.address}`);
}

main().catch((err) => {
  console.log("error", err);
  process.exitCode = 1;
});
