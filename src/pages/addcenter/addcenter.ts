import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,App } from 'ionic-angular';
import{locations} from '../../model/locations';
import{MyServiceProvider} from '../../providers/my-service/my-service';
import { AlertController } from 'ionic-angular';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppRate } from '@ionic-native/app-rate';

import { LoginPage } from '../login/login';
/**
 * Generated class for the AddcenterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addcenter',
  templateUrl: 'addcenter.html',
})
export class AddcenterPage {

  loc:locations={
name:'',
latitude:'',
longitude:''

  }

  constructor(public navCtrl: NavController, 
                 public navParams: NavParams,
                  public myserviceP:MyServiceProvider,
                  public alertCtrl: AlertController,
                   private appRate: AppRate, private app: App, private Auth: AngularFireAuth,
                  private Database: AngularFireDatabase,
                 ) {
  }

  // add hcenter to database
  addHcenter(loc:locations){
  
  if (this.loc.name!=""&&this.loc.latitude!=""&&this.loc.longitude!="") {

    this.myserviceP.addLocation(loc).then(ref=>{

      this.showAlert()
      
      this.loc.name=""
      this.loc.longitude=""
      this.loc.latitude=""
      
      })
    
  } else {
    this.showAlert2()
    
  }


  }



// alert of added success
  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'رائع ',
      subTitle: 'شكرا للاضافة',
      buttons: ['OK']
    });
    alert.present();
  }

// alert if empty field when add
  showAlert2() {
    const alert = this.alertCtrl.create({
      title: 'عذرا',
      subTitle: 'املئ بيانات',
      buttons: ['OK']
    });
    alert.present();
  }

  //function logout
  out(): Promise<void> {
    // const root = this.app.getRootNav();
    //     root.popToRoot();

    // this.app.getRootNav().setRoot(LoginPage);

    // this.navCtrl.push(LoginPage);


    const userId: string = this.Auth.auth.currentUser.uid;
    this.Database.database.ref(`/userProfile/${userId}`).off();
    return this.Auth.auth.signOut()
      .then(data => {
        console.log('got some data', this.Auth.auth.currentUser);
        this.alert('تم الخروج بنجاح :) ');
        this.navCtrl.setRoot(LoginPage);
      })
      .catch(error => {
        console.log('got an error', error);
        this.alert(error.message);
      })
  }

  //alert function
  alert(message: string) 
{
  this.alertCtrl.create({
    title: 'Info!',
    subTitle: message,
    buttons: ['OK']
  }).present();
}

}
