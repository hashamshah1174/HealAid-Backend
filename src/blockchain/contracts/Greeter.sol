//SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "hardhat/console.sol";


contract Greeter{
    string message;
    constructor(string memory _message){
            console.log("Depoloying a greetin",_message);
          message=_message;
    }


    //getter
    function getGreeting() public view returns (string memory){
        return message;
    }

    //setter
    function setGreeting(string memory _message) public {
        console.log("Changing greeting from '%s' to '%s'", message, _message);
        message=_message;
    }
}
