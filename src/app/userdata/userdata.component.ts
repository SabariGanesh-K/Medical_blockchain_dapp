import { Component, Input, OnInit } from '@angular/core';
import { ethers } from 'ethers'

import artifact from '../../contracts/artifacts/contracts/Lock.sol/Meds.json'
@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styleUrls: ['./userdata.component.css']
})
export class UserdataComponent implements OnInit {

  title = 'medical_blockchain';

  public address :any = '0xA8Be6bE0dE00a039c2dcD608D80a06778AB5bBb2';
  public provider :any = new ethers.providers.Web3Provider(window.ethereum);

  public contract:any;
  public userdata:any;
  public signer :any;
  public userloading:boolean = true;

  public usernotreg:boolean = true;

  public usermeddata:any ;
 

   constructor(){
   

  }

  async ngOnInit(): Promise<void> {
   await this.connectwallet()
    this.contract = new ethers.Contract(
      this.address,
      artifact.abi,
      this.signer

    )
    await this.getUserData()
   

  }

  public async connectwallet(){
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
  }


  public async getUserData(){
    let status = await this.contract.isRegistred()
   
    // console.log(data[0]=='0x0000000000000000000000000000000000000000')
    if (status){
      let data = await this.contract.getLoggedInUserData();
      let meds = await this.contract.getLoggedInUserMedDetails();
      this.userdata = data;
      this.usermeddata = meds;
      this.usernotreg=false;
      this.userloading = false;

    }
    else{
      this.userloading = false;
      
    }
  }

}
