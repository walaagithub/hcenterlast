import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HcentermapPage } from '../hcentermap/hcentermap';
import { LoadingController } from 'ionic-angular';
import{RatePage}from '../rate/rate';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  itemList: AngularFireList<any>;
  //copy array 
  public loadeditemlist: Array<any>;
  searchQuery: string = '';
  items = [];
  
  constructor(private navCtrl: NavController, public db: AngularFireDatabase, public loadingCtrl: LoadingController) {
    //loading
     {
      let loading = this.loadingCtrl.create({
        spinner :'ios',
       content:'جاري التحميل'
        
      });
    
      loading.present();
    
      setTimeout(() => {
        loading.dismiss();
      }, 1000);
    }



    
    // Database
    this.itemList = db.list('centerLoc');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        this.items.push(y['name']);


      });
    });
    //equle data from first array to second array
    this.loadeditemlist = this.items;
    this.initializeItems();

  }



  initializeItems() {

    // console.log(this.items);
    // console.log(this.loadeditemlist);
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.items = this.loadeditemlist;
    // this.initializeItems();

    // set val to the value of the searchbar
    const val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      // console.log(this.items);
      // console.log(this.loadeditemlist);
    }
  }

  GotoHcentermap(Item: string) {
    this.navCtrl.push(HcentermapPage, { Item: Item });
  }



  rating(Item:string){
    this.navCtrl.push( RatePage,{Item:Item});
   } 

}