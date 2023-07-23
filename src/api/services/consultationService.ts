import { Request } from "express";
import { ResponseHelper } from "../helpers/responseapihelper";
import mongoose from "mongoose";
import { IConsultation } from "../interfaces/IConsultation";
import { Consultation } from "../models/MConsultation";
import { IUser } from "../interfaces/IUser";
import Web3 from "web3";
import { EConsultation } from "../interfaces/enums/EConsultation";
import {
  endConsultation,
  releasePayment,
  requestPayment,
  startConsultation,
} from "../contractsetup/consultation/main";
import { User } from "../models/MUser";
import { ERole } from "../interfaces/enums/EUserRole";

class ConsultationService {
  protected web3: Web3;
  constructor() {
    this.web3 = new Web3(
      new Web3.providers.HttpProvider("http://localhost:8545")
    );
  }
  async getDoctorList(): Promise<ApiResponse> {
    try {
      const doctorDetail = await User.find({ role: ERole.doctor })
        .lean(true)
        .exec();

      return ResponseHelper.sendSuccessResponse(
        "Doctor list fetched successfully",
        doctorDetail
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async viewDoctor(docId: string): Promise<ApiResponse> {
    try {
      const doctorDetail = await User.findOne({
        role: ERole.doctor,
        _id: docId,
      })
        .lean(true)
        .exec();

      if (!doctorDetail) {
        return ResponseHelper.sendResponse(404);
      }
      return ResponseHelper.sendSuccessResponse(
        "Doctor  fetchedSuccessfully",
        doctorDetail
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }
  async create(userId: string, req: Request): Promise<ApiResponse> {
    try {
      const consultation: IConsultation = new Consultation({
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
        patientId: userId,
      });
      await consultation.save();

      return ResponseHelper.sendResponse(201, consultation);
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async getMyConsultation(
    userId: string,
    isDoctor: boolean
  ): Promise<ApiResponse> {
    try {
      let match: { [key: string]: string } = { patientId: userId };

      if (isDoctor) {
        match = { doctorId: userId };
      }
      const record = await Consultation.find(match)
        .populate("patientId doctorId")
        .lean(true)
        .exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      return ResponseHelper.sendSuccessResponse(
        "Consultation list fetched Successfully",
        record
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }
  async viewConsultation(consId: string): Promise<ApiResponse> {
    try {
      const record = await Consultation.findById({ consId })
        .populate("patientId doctorId")
        .lean(true)
        .exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      return ResponseHelper.sendSuccessResponse(
        "Consultation  fetchedSuccessfully",
        record
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async startConsultation(
    userId: string,
    consId: string
  ): Promise<ApiResponse> {
    try {
      const record = await Consultation.findOne({
        _id: consId,
        patientId: userId,
        status: EConsultation.created,
      })
        .populate("patientId doctorId")
        .lean(true)
        .exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      const doctor = record.doctorId as IUser;
      const patient = record.patientId as IUser;
      const patientAccountAddr = doctor.metaMaskAddress!;
      const patientAccountKey = patient.privateKey!;
      const doctorAccountAddr = doctor.metaMaskAddress!;
      const doctorAccountKey = doctor.privateKey!;
      if (
        !patientAccountAddr ||
        !patientAccountKey ||
        !doctorAccountAddr ||
        !doctorAccountKey
      ) {
        return ResponseHelper.sendResponse(
          404,
          "Unable to move because some account mising "
        );
      }
      const consultationId = this.web3.utils.keccak256(record._id.toString());
      const amount = this.web3.utils.toWei(record.amount.toString(), "ether");

      await startConsultation(
        consultationId,
        patientAccountAddr,
        doctorAccountAddr,
        amount
      );
      const PATIENT_BALANCE = await this.web3.eth.getBalance(
        patientAccountAddr
      );
      console.log(
        "PATIENT_BALANCE:",
        this.web3.utils.fromWei(PATIENT_BALANCE, "ether"),
        "ETH"
      );
      const DOCTOR_BALANCE = await this.web3.eth.getBalance(doctorAccountAddr);
      console.log(
        "DOCTOR_BALANCE:",
        this.web3.utils.fromWei(DOCTOR_BALANCE, "ether"),
        "ETH"
      );

      const updateConsultation = await Consultation.findByIdAndUpdate(
        { consId },
        {
          status: EConsultation.start,
        },
        { new: true }
      );
      return ResponseHelper.sendSuccessResponse(
        "Consultation  Updated",
        updateConsultation!
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async endConsultation(userId: string, consId: string): Promise<ApiResponse> {
    try {
      const record = await Consultation.findOne({
        _id: consId,
        doctorId: userId,
        status: EConsultation.start,
      })
        .populate("patientId doctorId")
        .lean(true)
        .exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      const doctor = record.doctorId as IUser;
      const patient = record.patientId as IUser;
      const patientAccountAddr = doctor.metaMaskAddress!;
      const patientAccountKey = patient.privateKey!;
      const doctorAccountAddr = doctor.metaMaskAddress!;
      const doctorAccountKey = doctor.privateKey!;
      if (
        !patientAccountAddr ||
        !patientAccountKey ||
        !doctorAccountAddr ||
        !doctorAccountKey
      ) {
        return ResponseHelper.sendResponse(
          404,
          "Unable to move because some account mising "
        );
      }
      const consultationId = this.web3.utils.keccak256(record._id.toString());

      await endConsultation(consultationId);
      const PATIENT_BALANCE = await this.web3.eth.getBalance(
        patientAccountAddr
      );
      console.log(
        "PATIENT_BALANCE:",
        this.web3.utils.fromWei(PATIENT_BALANCE, "ether"),
        "ETH"
      );
      const DOCTOR_BALANCE = await this.web3.eth.getBalance(doctorAccountAddr);
      console.log(
        "DOCTOR_BALANCE:",
        this.web3.utils.fromWei(DOCTOR_BALANCE, "ether"),
        "ETH"
      );

      const updateConsultation = await Consultation.findByIdAndUpdate(
        { consId },
        {
          status: EConsultation.end,
        },
        { new: true }
      );
      return ResponseHelper.sendSuccessResponse(
        "Consultation  Updated",
        updateConsultation!
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async requestPaymentConsultation(
    userId: string,
    consId: string
  ): Promise<ApiResponse> {
    try {
      const record = await Consultation.findOne({
        _id: consId,
        doctorId: userId,
        status: EConsultation.end,
      })
        .populate("patientId doctorId")
        .lean(true)
        .exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      const doctor = record.doctorId as IUser;
      const patient = record.patientId as IUser;
      const patientAccountAddr = doctor.metaMaskAddress!;
      const patientAccountKey = patient.privateKey!;
      const doctorAccountAddr = doctor.metaMaskAddress!;
      const doctorAccountKey = doctor.privateKey!;
      if (
        !patientAccountAddr ||
        !patientAccountKey ||
        !doctorAccountAddr ||
        !doctorAccountKey
      ) {
        return ResponseHelper.sendResponse(
          404,
          "Unable to move because some account mising "
        );
      }
      const consultationId = this.web3.utils.keccak256(record._id.toString());

      await requestPayment(consultationId);
      const PATIENT_BALANCE = await this.web3.eth.getBalance(
        patientAccountAddr
      );
      console.log(
        "PATIENT_BALANCE:",
        this.web3.utils.fromWei(PATIENT_BALANCE, "ether"),
        "ETH"
      );
      const DOCTOR_BALANCE = await this.web3.eth.getBalance(doctorAccountAddr);
      console.log(
        "DOCTOR_BALANCE:",
        this.web3.utils.fromWei(DOCTOR_BALANCE, "ether"),
        "ETH"
      );

      const updateConsultation = await Consultation.findByIdAndUpdate(
        { consId },
        {
          status: EConsultation.request,
        },
        { new: true }
      );
      return ResponseHelper.sendSuccessResponse(
        "Consultation  Updated",
        updateConsultation!
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async releasePaymentConsultation(
    userId: string,
    consId: string
  ): Promise<ApiResponse> {
    try {
      const record = await Consultation.findOne({
        _id: consId,
        patientId: userId,
        status: EConsultation.request,
      })
        .populate("patientId doctorId")
        .lean(true)
        .exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      const doctor = record.doctorId as IUser;
      const patient = record.patientId as IUser;
      const patientAccountAddr = doctor.metaMaskAddress!;
      const patientAccountKey = patient.privateKey!;
      const doctorAccountAddr = doctor.metaMaskAddress!;
      const doctorAccountKey = doctor.privateKey!;
      if (
        !patientAccountAddr ||
        !patientAccountKey ||
        !doctorAccountAddr ||
        !doctorAccountKey
      ) {
        return ResponseHelper.sendResponse(
          404,
          "Unable to move because some account mising "
        );
      }
      const consultationId = this.web3.utils.keccak256(record._id.toString());

      await releasePayment(consultationId, doctorAccountAddr);
      const PATIENT_BALANCE = await this.web3.eth.getBalance(
        patientAccountAddr
      );
      console.log(
        "PATIENT_BALANCE:",
        this.web3.utils.fromWei(PATIENT_BALANCE, "ether"),
        "ETH"
      );
      const DOCTOR_BALANCE = await this.web3.eth.getBalance(doctorAccountAddr);
      console.log(
        "DOCTOR_BALANCE:",
        this.web3.utils.fromWei(DOCTOR_BALANCE, "ether"),
        "ETH"
      );

      const updateConsultation = await Consultation.findByIdAndUpdate(
        { consId },
        {
          status: EConsultation.release,
        },
        { new: true }
      );
      return ResponseHelper.sendSuccessResponse(
        "Consultation  Updated",
        updateConsultation!
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }
}

export default new ConsultationService();
