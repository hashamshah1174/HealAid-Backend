// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";

contract Consultation {
    address public admin;
    mapping(bytes32 => Consult) public consultations;

    event ConsultationStarted(bytes32 indexed consultationId, address indexed patient, address indexed doctor, uint256 amount);
    event ConsultationEnded(bytes32 indexed consultationId, address indexed doctor);
    event PaymentRequested(bytes32 indexed consultationId, address indexed doctor);
    event PaymentReleased(bytes32 indexed consultationId, address indexed patient, address indexed doctor, uint256 amount);

    struct Consult {
        address patient;
        address doctor;
        uint256 amount;
        bool paymentRequested;
        bool paymentReleased;
        bool paymentCaptured;
    }

    constructor() {
        admin = msg.sender;
    }

    function startConsultation(bytes32 consultationId, address patient, address doctor) public payable {
        require(msg.sender != admin, "Admin cannot start a consultation.");
        require(msg.value > 0, "Consultation amount must be greater than 0.");

        consultations[consultationId] = Consult(patient, doctor, msg.value, false, false, true);

        emit ConsultationStarted(consultationId, patient, doctor, msg.value);
    }

    function endConsultation(bytes32 consultationId) public {
        Consult storage consult = consultations[consultationId];
        require(msg.sender == consult.doctor, "Only the doctor can end a consultation.");
        require(!consult.paymentRequested, "Payment has already been requested.");

        consult.paymentRequested = true;

        emit ConsultationEnded(consultationId, msg.sender);
    }

    function requestPayment(bytes32 consultationId) public {
        Consult storage consult = consultations[consultationId];
        require(msg.sender == consult.doctor, "Only the doctor can request payment.");
        require(consult.paymentRequested, "Payment has not been requested yet.");
        require(!consult.paymentReleased, "Payment has already been released.");

        emit PaymentRequested(consultationId, msg.sender);

        consult.paymentRequested = false;
        consult.paymentCaptured = false;
        consult.paymentReleased = true;
    }

    function releasePayment(bytes32 consultationId) public {
        Consult storage consult = consultations[consultationId];
        require(msg.sender == admin || msg.sender == consult.patient, "Only admin or patient can release payment.");
        require(consult.paymentReleased, "Payment has not been requested or has already been released.");

        if (!consult.paymentCaptured) {
            uint256 amount = consult.amount;
            uint256 adminFee = amount / 10;
            uint256 doctorAmount = amount - adminFee;

            if (msg.sender == admin) {
                payable(admin).transfer(adminFee);
                payable(consult.doctor).transfer(doctorAmount);
                emit PaymentReleased(consultationId, consult.patient, consult.doctor, doctorAmount);
            } else {
                payable(consult.patient).transfer(amount);
                emit PaymentReleased(consultationId, consult.patient, consult.doctor, 0);
            }
            consult.paymentCaptured = true;
        }
    }

    function getConsultationPatient(bytes32 consultationId) public view returns (address) {
        return consultations[consultationId].patient;
    }

    function setConsultationPatient(bytes32 consultationId, address patient) public {
        consultations[consultationId].patient = patient;
    }
    function getConsultationAmount(bytes32 consultationId) public view returns (uint) {
        return  consultations[consultationId].amount;
    }
}

