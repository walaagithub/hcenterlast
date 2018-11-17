import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Item, RefresherContent } from 'ionic-angular';

import{RateValue}from '../../model/RateValue'
import{MyServiceProvider} from '../../providers/my-service/my-service';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase, AngularFireDatabaseModule } from 'angularfire2/database';

import { AngularFireList } from 'angularfire2/database';
import {AboutPage } from '../about/about';





/**
 * Generated class for the RatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

import { Device } from '@ionic-native/device';

//import for rate
import { Ionic2RatingModule } from "ionic2-rating";
import firebase from 'firebase';


   //device info
  interface deviceInterface {
  id?: string,
  model?: string,
  cordova?: string,
  platform?: string,
  version?: string,
  manufacturer?: string,
  serial?: string,
  isVirtual?: boolean,
 
  };
 
 
 @IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
 })
export class RatePage {


 



     //object for adding rate and info
      RateInfo:RateValue={
      rateV:"",
      deviceInfoID:"",
      name:""
      }

       //rate 
     rate : any = 0;
      itemName:string;
      //testValue:string;
 
   //to store devices id
   deviceIDList : AngularFireList<any>;
    deviceitems=[];

    //to store name of centers
    centerNameList:AngularFireList<any>;
    centeritem=[];

//to store rating value in specific center
   rateNumberList:AngularFireList<any>;
   rateNumberItem=[];

//to show Dive and disable button in rate.html 
   disabled = false;
   hideMe=false;
   
//flags to chick the center name or id is already saved or not
flagNo1:number=0;
flagNo2:number=0;

    notIDSaved:boolean=false
    notCenterNameSaved:boolean=false


 //device info
 public deviceInfo: deviceInterface = {};

 constructor(public navCtrl: NavController,
               private device: Device,
               public navParams: NavParams,
               public myserviceP:MyServiceProvider,
               public alertCtrl: AlertController,
               public db:AngularFireDatabase
              ) {
  
                


                this.itemName = navParams.get('Item');
                console.log(this.itemName)
  
                  //this.testValue='004';

        //to get array of deviceInfoID stored in our database
            this.deviceIDList = db.list('rateAndDeviceInfo');

             this.deviceIDList.snapshotChanges().subscribe( actions => {
               actions.forEach( action =>{
               let y = action.payload.toJSON();
               
                this.deviceitems.push(y['deviceInfoID']);
              
         });
      });

     
    




            //to get array of centers name stored in our database linked with the specific DeviceID
             this.centerNameList = db.list('rateAndDeviceInfo');

              this.centerNameList.snapshotChanges().subscribe( actions => {
                actions.forEach( action =>{
                 let y = action.payload.toJSON();

                 if (this.device.uuid==y['deviceInfoID']) {
                  this.centeritem.push(y['name']);
                 } 
                   
           });
       });

                        
      
       
       

       


       this.printRateNubmer()
  }


 //////////// Functions //////////////

  //function to check not iteration and push rate value
   SaveRate(RateInfo:RateValue){

   RateInfo.rateV=this.rate;
      RateInfo.deviceInfoID=this.device.uuid;
      //RateInfo.deviceInfoID=this.testValue;

       RateInfo.name=this.itemName
  
this.chickSavedOrNot()


       //to check the deviceID is already saved
    


                   // to push rate value or not

          if (this.notIDSaved==true) {
               this.myserviceP.addRate(RateInfo).then(ref=>{
  
                  this.backToSearch()
                  this.showAlert()

                })
           }  else 
 
              if(this.notCenterNameSaved==true){

                   this.myserviceP.addRate(RateInfo).then(ref=>{
                    this.backToSearch()
                     this.showAlert()
                  })

               }
                    else
                  this.showAlert2();
                  this.backToSearch()



   }


        showAlert() {
          const alert = this.alertCtrl.create({
          // title: 'Thank you ',
          subTitle: 'شكرا',
          buttons: ['تم']
          });
         alert.present();
        }


          showAlert2() {
           const alert2 = this.alertCtrl.create({
           title: 'التذكير ',
           subTitle:'تم تقييم هذا المركز مسبقا',
           buttons: ['تم']
           });
           alert2.present();
           }



         //device info
          onModelChange(event){
           this.rate = event;
            console.log(this.rate);
          }


          //device info
           getInfo() {
                  this.deviceInfo.id = this.device.uuid;
                  this.deviceInfo.model = this.device.model;
                  this.deviceInfo.cordova = this.device.cordova;
                  this.deviceInfo.platform = this.device.platform;
                  this.deviceInfo.version = this.device.version;
                  this.deviceInfo.manufacturer = this.device.manufacturer;
                  this.deviceInfo.serial = this.device.serial;
                  this.deviceInfo.isVirtual = this.device.isVirtual;
            
            
                }



 chickSavedOrNot(){


  for (let index = 0; index < this.deviceitems.length; index++) {
  
    if (this.device.uuid==this.deviceitems[index]) {
        this.flagNo1+=1;
       
    } 

 }
 if(this.flagNo1==0){this.notIDSaved=true}



  //to check the centername is already saved
  for (let index = 0; index < this.centeritem.length; index++) {

       if (this.itemName==this.centeritem[index]) {
       
     this.flagNo2+=1;
        } 

   }

   if(this.flagNo2==0){this.notCenterNameSaved=true}

return(this.notCenterNameSaved,this.notIDSaved)

}



//function to get all rating value which saved with specific center name

getRateNumber(){


  this.rateNumberList = this.db.list('rateAndDeviceInfo');

              this.rateNumberList.snapshotChanges().subscribe( actions => {
                actions.forEach( action =>{
                 let y = action.payload.toJSON();

                 if (this.itemName==y['name']) {
                  this.rateNumberItem.push(y['rateV']);
                 } 
                   
           });
       });

return(this.rateNumberItem)
}


// function to generate rating number(r1,r2,r3,r4,r5) showed in html

printRateNubmer(){

  //call function
this.getRateNumber()


for (let index = 0; index < this.rateNumberItem.length; index++) {
  
  switch(this.rateNumberItem[index])
  {
   case(1):
   this.rateNumber.r1+=1
   break
   case(2):
   this.rateNumber.r2+=1
   break
   case(3):
   this.rateNumber.r3+=1
   break
   case(4):
   this.rateNumber.r4+=1
    break
   case(5):
   this.rateNumber.r5+=1
    break
  }
  
}

// to get percent number  of rating  using this global equation

var rData=((this.rateNumber.r1*1)+(this.rateNumber.r2*2)+(this.rateNumber.r3*3)+(this.rateNumber.r4*4)+(this.rateNumber.r5*5))
this.rateNumber.rPersonNumber=((this.rateNumber.r1)+(this.rateNumber.r2)+(this.rateNumber.r3)+(this.rateNumber.r4)+(this.rateNumber.r5))

// this.rateNumber.ratePercent=rData/this.rateNumber.rPersonNumber
this.rateNumber.ratePercent=Math.round ((rData/this.rateNumber.rPersonNumber)*10)/10


return(this.rateNumber.r1,this.rateNumber.r2,this.rateNumber.r3,this.rateNumber.r4,this.rateNumber.r5)

}


backToSearch(){
  this.navCtrl.push (AboutPage);
}



disButton()
{
this.disabled = true;
}
    

showDiv() {
  this.hideMe = true;
}







rateNumber={
  r1:0,
  r2:0,
  r3:0,
  r4:0,
  r5:0,
  ratePercent:0,
  rPersonNumber:0


}


}
