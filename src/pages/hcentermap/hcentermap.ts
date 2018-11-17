import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController } from 'ionic-angular';
import { ViewChild , ElementRef } from '@angular/core'

import { locations } from './../../model/locations';
 import { AngularFireDatabase , AngularFireList } from 'angularfire2/database'


 declare const google:any;


@IonicPage()
@Component({
  selector: 'page-hcentermap',
  templateUrl: 'hcentermap.html',
})
export class HcentermapPage {

  
  @ViewChild('map') mapElement:ElementRef
  map:any  
  itemList : AngularFireList<any>;
  itemArray=[];
  itemName:string;


  constructor(
                      public navCtrl: NavController, 
                      public navParams: NavParams,
                      public db:AngularFireDatabase,
                      public alertCtrl:AlertController,
                    ) {

        this.itemName = navParams.get('Item');
        console.log(this.itemName);

        // Database
        this.itemList = db.list('centerLoc');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HcentermapPage');
    
    this.loadMap();
    
    
  }


  
  loadMap()
  {

      let LatLng = new google.maps.LatLng( 35.547483 , 44.4748 );
      let mapOptions =
      {
          center:LatLng,
          zoom: 10,
          mapTypeId: google.maps.MapTypeId.ROADMAP
      }
      
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      this.itemList.snapshotChanges().subscribe( actions => {
          actions.forEach( action =>{
          let y = action.payload.toJSON();
          y['key'] = action.key;
          this.itemArray.push(y as Location);
        });

        for (const value of this.itemArray) 
        {
          if(value['name'] === this.itemName )
          {
              console.log(value['name']);
              console.log(value['latitude']);
              console.log(value['longitude']);
              // let marker = new google.maps.Marker({
              // position : new google.maps.LatLng(value['latitude'],value['longitude']),
              // map: new google.maps.Map(this.mapElement.nativeElement, mapOptions)
              let marker = new google.maps.Marker
              ({
                  position : new google.maps.LatLng(value['latitude'],value['longitude']),
                  map: new google.maps.Map(
                                        this.mapElement.nativeElement,
                                        {     
                                          center:new google.maps.LatLng(value['latitude'],value['longitude']),
                                          zoom: 13,
                                          mapTypeId: google.maps.MapTypeId.ROADMAP
                                        }
                                      )
              });
              marker.info = new google.maps.InfoWindow({
                content: value['name']
              });
              google.maps.event.addListener(marker , 'click' , function(){
                let marker_map = this.getMap();
                this.info.open(marker_map,this)
                alert(this.info.content)
              });
              break;
          }
        }; // End for
        
        
      });
      
  }
  
  
}
