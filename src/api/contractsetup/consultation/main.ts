import { ethers } from "ethers";
import * as consultationArtifact from "../../../blockchain/artifacts/src/blockchain/contracts/Consultation.sol/Consultation.json";

interface ConsultationContract extends ethers.Contract {
  startConsultation(
    consultationId: string,
    patient: string,
    doctor: string,
    overrides?: ethers.PayableOverrides
  ): Promise<ethers.ContractTransaction>;
  endConsultation(consultationId: string): Promise<ethers.ContractTransaction>;
  requestPayment(consultationId: string): Promise<ethers.ContractTransaction>;
  releasePayment(consultationId: string): Promise<ethers.ContractTransaction>;
}

const consultationABI = consultationArtifact.abi;

async function getConsultationContract(): Promise<ConsultationContract> {
  const provider = new ethers.providers.JsonRpcProvider(
    "http://localhost:8545"
  );
  const signer = provider.getSigner(0);
  const consultationContractAddress =
    "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // replace with your contract address
  const consultationContract = new ethers.Contract(
    consultationContractAddress,
    consultationABI,
    signer
  ) as ConsultationContract;
  return consultationContract;
}

async function startConsultation(
  consultationId: string,
  patient: string,
  doctor: string,
  amount: ethers.BigNumberish
): Promise<void> {
  const consultationContract = await getConsultationContract();
  const tx = await consultationContract.startConsultation(
    consultationId,
    patient,
    doctor,
    { value: amount }
  );
  await tx.wait();
  console.log(
    `Consultation ${consultationId} started with patient ${patient} and amount ${amount}`
  );
}

async function endConsultation(consultationId: string): Promise<void> {
  const consultationContract = await getConsultationContract();
  const tx = await consultationContract.endConsultation(consultationId);
  await tx.wait();
  console.log(`Consultation ${consultationId} ended`);
}

async function requestPayment(consultationId: string): Promise<void> {
  const consultationContract = await getConsultationContract();
  const tx = await consultationContract.requestPayment(consultationId);
  await tx.wait();
  console.log(`Payment requested for consultation ${consultationId}`);
}

async function releasePayment(
  consultationId: string,
  doctor: string
): Promise<void> {
  const consultationContract = await getConsultationContract();
  const tx = await consultationContract.releasePayment(consultationId);
  await tx.wait();
  console.log(
    `Payment released for consultation ${consultationId} to doctor ${doctor}`
  );
}

export {
  startConsultation,
  endConsultation,
  requestPayment,
  releasePayment,
  getConsultationContract,
};
