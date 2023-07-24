import { Request } from "express";
import { ResponseHelper } from "../helpers/responseapihelper";
import { Record } from "../models/MRecords";
import { IRecord } from "../interfaces/IRecord";
import mongoose from "mongoose";
const IPFS = require("ipfs-api"); // Import ipfs-http-client

class RecordService {
  protected ipfsClient: any; // Adjust the type of ipfsClient if required

  constructor() {
    // Connect to the local IPFS node running on your desktop
    try {
      this.ipfsClient = IPFS({
        host: "127.0.0.1",
        port: 5001,
        protocol: "http",
      });
      console.log("IPFS client connected successfully!");
    } catch (error) {
      console.error("Failed to connect to IPFS:", (error as Error).message);
    }
  }

  async create(userId: string, req: Request): Promise<ApiResponse> {
    try {
      const file = req.file;
      if (!file) {
        return ResponseHelper.sendResponse(422, ["Please Upload Image"]);
      }
      const result = await this.ipfsClient.add(file.buffer);
      if (!result || !result[0].hash) {
        return ResponseHelper.sendResponse(
          500,
          "Unable to upload file to ipfs "
        );
      }
      console.log("result[0]", result[0]);

      const ipfsHash = result[0].hash.toString();
      const record: IRecord = new Record({
        ...req.body,
        _id: new mongoose.Types.ObjectId(),
        ipfsHash: ipfsHash,
        patientId: userId,
      });
      await record.save();

      return ResponseHelper.sendResponse(201, record);
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async getMyRecord(userId: string): Promise<ApiResponse> {
    try {
      const record = await Record.find({ patientId: userId }).lean(true).exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      return ResponseHelper.sendSuccessResponse(
        "Record list fetched Successfully",
        record
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }
  async viewRecord(recId: string): Promise<ApiResponse> {
    try {
      const record = await Record.findOne({ _id: recId }).lean(true).exec();
      if (!record) {
        return ResponseHelper.sendResponse(404);
      }
      return ResponseHelper.sendSuccessResponse(
        "Record  fetchedSuccessfully",
        record
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }

  async grantOrRevokeAccess(
    recId: string,
    consultationId: string
  ): Promise<ApiResponse> {
    try {
      const consultationObjectId = new mongoose.Types.ObjectId(consultationId);
      const updatedRecord = await Record.findByIdAndUpdate(
        recId,
        {
          $cond: {
            if: { $in: [consultationObjectId, "$accessDoctor"] },
            then: { $pull: { accessDoctor: consultationObjectId } }, // Doctor exists, remove from array
            else: { $push: { accessDoctor: consultationObjectId } }, // Doctor doesn't exist, add to array
          },
        },
        { new: true } // To get the updated record as the result of the update operation
      ).lean();

      if (!updatedRecord) {
        return ResponseHelper.sendResponse(404, "Record not found");
      }

      return ResponseHelper.sendSuccessResponse(
        "Record updated successfully",
        updatedRecord
      );
    } catch (error) {
      return ResponseHelper.sendResponse(500, (error as Error).message);
    }
  }
}

export default new RecordService();
