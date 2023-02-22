import "@nomiclabs/hardhat-ethers";
import { ethers } from "hardhat";

async function main(): Promise<void> {
  const Consultation = await ethers.getContractFactory("Consultation");
  const consultationContr = await Consultation.deploy();
  await consultationContr.deployed();
  console.log(`contract deployed to ${consultationContr.address}`);
}

main().catch((err) => {
  console.log("error", err);
  process.exitCode = 1;
});
