// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";

contract Meds {
  mapping(address=> bool) private isDoctor;
  mapping (address=>bool) private isAdmin;
  mapping(address=>bool) private isUser;
mapping(address=> MedDetail[] ) MedsData;

   struct MedDetail {
    uint256 id;
  string  medName;
  string dose;
  bool undertaking;
  
 }  
  struct User {
    address walletAddress;
    string name;
    uint256 bp;
    uint256 age;
    uint256 ht;
    uint256 wt;
  
 }

struct Doctor {
    address walletAddress;
    string name;
    string licenseNumber;
    string medicalDomain;
    uint256 yearsOfExp;

}

constructor(){
  isAdmin[msg.sender] = true;

}
mapping(address => User) UserData;
mapping(address=>Doctor ) DoctorData;
  

function getLoggedInUserMedDetails() public view  returns(MedDetail[] memory meds) {
  return MedsData[msg.sender];
}

function getUserMedDetails(address walletAddress) public view returns (MedDetail[] memory meds){
  require(isDoctor[msg.sender],"Only doctors can add data");
  return MedsData[walletAddress] ;
}

function addFitnessDetails(  string memory name, address walletAddress, uint256 bp,uint256 age,uint256 ht,uint256 wt) public  {
  require(isDoctor[msg.sender],"Only doctors can add data !");
 UserData[walletAddress].bp = bp;
 UserData[walletAddress].name = name;
  UserData[walletAddress].age = age;
  UserData[walletAddress].ht = ht;
  UserData[walletAddress].wt = wt;

}



function isRegistred() public view returns (bool answer) {
  return isUser[msg.sender];
}

function isRegisteredAsDoctor()  public view returns (bool answer) {
  return isDoctor[msg.sender];
}

function getDoctorData() view  public returns (Doctor memory data) {
    return DoctorData[msg.sender];
  
}
function getUserData( address walletAddress )  view public returns (User memory data) {
  return UserData[walletAddress];
}

function getLoggedInUserData() public view returns (User memory data) {
  return UserData[msg.sender];
}

function addAdmin(address walletAddress) public {
  require(isAdmin[msg.sender],"Only admins can add admins");
  isAdmin[walletAddress] = true;
}

function addDoctor(address walletAddress,string memory name,string  memory licenseNumber,string memory  medicalDomain,uint256 yearsOfExp) public {
  require(isAdmin[msg.sender],"Only admins can access");
  require(!isDoctor[walletAddress],"Doctor already registered");
  isDoctor[walletAddress] = true;
 
 
  DoctorData[msg.sender] = Doctor(
  msg.sender,
  name,
  licenseNumber,
  medicalDomain,
  yearsOfExp);
  

}

function addUser( address walletAddress, string memory name , uint256 bp,uint256 age,uint256 ht,uint256 wt) public {
  require(!isUser[walletAddress],"User already registered");
  isUser[walletAddress] = true;
  UserData[walletAddress] =User(
      walletAddress,
      name,
      bp,
      age,
      ht,
      wt
    
    );
  
}

function addMed( uint256 id, address walletAddress,string  memory medName,string memory dose) public {
    require(isDoctor[msg.sender],"Only doctors can modify med data");
      MedsData[walletAddress].push(  MedDetail(
          id,
          medName,
          dose,
          true
        ));
     
    }



function modMedDose(address walletAddress,string memory newDose,uint256 id) public {
  
   MedsData[walletAddress][id].dose = newDose;

}
function discontinueMed(address walletAddress,uint256 id) public {

  MedsData[walletAddress][id].undertaking = false;
}

function reopenMed(address walletAddress,uint256 id) public {

  MedsData[walletAddress][id].undertaking = true;
}



}
