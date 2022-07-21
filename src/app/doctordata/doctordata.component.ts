import { Component, OnInit } from '@angular/core';
import { ethers } from 'ethers'
import artifact from '../../contracts/artifacts/contracts/Lock.sol/Meds.json'

@Component({
  selector: 'app-doctordata',
  templateUrl:'./doctordata.component.html',
  styleUrls: ['./doctordata.component.css']
})
export class DoctordataComponent implements OnInit {
  public address :any = '';//address here
  public provider :any = new ethers.providers.Web3Provider(window.ethereum);
  public contract:any;
  public signer :any;
  public id:any = 0;
  public doctordata:any;
  public doctorloading:boolean = true;
  public docnotreg:boolean = true;
  public fetcheduserdata:any;
  public useraddedsuccess:boolean = false;
  public addinguser:boolean = false;
  public fetcheduser:boolean=false;
  public fetchedusermeddata:any;
  public fetchedusermedempty : boolean = true;
  public fetchloading:boolean = false;
  public fetcheduserexist:boolean = false;
  public modifyingmode:boolean = false;
  public modifyingsuccess:boolean = false;
  public addingmed:boolean = false;
  public addmedsuccess:boolean = false;
  public modifyingdose :boolean = false;
  constructor() {
    this.connectwallet()
    this.contract = new ethers.Contract(
      this.address,
      artifact.abi,
      this.signer

    )

    
   }
   public async connectwallet(){
    await this.provider.send("eth_requestAccounts", []);
    this.signer = this.provider.getSigner();
  }


   public async fetchUserData( address:any ){
    this.fetcheduser=true;
    this.fetchloading = true;
    let data = await this.contract.getUserData(address);
    console.log(data[0]!='0x0000000000000000000000000000000000000000')
    if (data[0]!='0x0000000000000000000000000000000000000000'){
      this.fetcheduserdata = data;
      this.fetcheduserexist=true;
      let meds = await this.contract.getUserMedDetails(address);
      console.log(meds,meds[0],"qsqwxa",meds.length==0);
      if (meds.length==0){
        this.fetchedusermedempty = true;
      }
      else{
        this.fetchedusermedempty = false;
        this.fetchedusermeddata = meds;
        
      }
  
      this.fetchloading = false;

    }
    else{
      console.log("Dds");
      this.fetcheduserexist = false;
      this.fetchloading = false;
    }


   }

   public async onSubmitFetchData(data:any){
      await this.fetchUserData(data.address);
   }



  async ngOnInit(): Promise<void> {
    await this.connectwallet()
    this.contract = new ethers.Contract(
      this.address,
      artifact.abi,
      this.signer

    )
    await this.getDoctorData()
  }
  public async getDoctorData(){
   
 
      let data = await this.contract.getDoctorData();
      if (data[0]=='0x0000000000000000000000000000000000000000'){

        this.docnotreg=true;
        this.doctorloading=false;
      }
      else{
        this.doctordata = data;
        this.docnotreg=false;
        this.doctorloading = false;
      }
      
    }


   public async  onSubmitModifyFitness(data:any){
    console.log(data.modifiedname,this.fetcheduserdata.walletAddress,data.modifiedbp,data.modifiedage,data.modifiedht,data.modifiedwt)
      await this.contract.addFitnessDetails(data.modifiedname,this.fetcheduserdata.walletAddress,data.modifiedbp,data.modifiedage,data.modifiedht,data.modifiedwt);
      this.modifyingmode = false;
      this.modifyingsuccess = true;
    }

    public async onSubmitAddUser(data:any){
      await this.contract.addUser(data.address,data.name,data.bp,data.age,data.ht,data.wt);
      this.useraddedsuccess = true;
      this.addinguser = false;
    }

    public async onSubmitAddMed(data:any){
      if(this.fetchedusermedempty){
        console.log("emoty", this.id, this.fetcheduserdata.walletAddress ,data.medname,data.dose);
       
        await this.contract.addMed( this.id, this.fetcheduserdata.walletAddress ,data.medname,data.meddose);
        this.addingmed = false;
        this.addmedsuccess = true;

      }
      else{
        console.log(this.fetchedusermeddata,this.fetchedusermeddata.length)
        await this.contract.addMed( this.fetchedusermeddata.length, this.fetcheduserdata.walletAddress ,data.medname,data.dose);
        this.addingmed = false;
        this.addmedsuccess = true;
      }

    }

    public async onSubmitModifyDose(data:any,id:any){
      console.log(id)
      await this.contract.modMedDose(this.fetcheduserdata.walletAddress,data.newdose,id);
      this.modifyingdose = false;
    }

    public async discontinueMed(id:any){
      await this.contract.discontinueMed(this.fetcheduserdata.walletAddress,id)
    }
    public async reopenMed(id:any){
      await this.contract.modMedDose(this.fetcheduserdata.walletAddress,id);
    }

    public openModifyingDose(){
      this.modifyingdose = true;
    }

    public openaddmed(){
      this.addingmed = true;
    }

    public openmodifyingdetails(){
      this.modifyingmode = true;
    }
    public openAddingUser(){
      this.addinguser = true;
    }


  


  

}
