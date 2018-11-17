import { AddcenterPage } from '../addcenter/addcenter';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { User } from './../../model/USER';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams,
              private Auth:AngularFireAuth,
              private Database:AngularFireDatabase,
              public alertCtrl:AlertController
            ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  // Create alert
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  // Login Function

  loginUser(user:User):Promise<any>
  {
    if(user.email != null && user.password !=null)
    {
      return this.Auth.auth.signInWithEmailAndPassword(user.email,user.password).then( data => 
        {
          console.log('got some data', this.Auth.auth.currentUser);
          this.alert('تم تسجيل الدخول بنجاح');
          this.navCtrl.setRoot( AddcenterPage );
          // user is logged in
        })
        .catch( error => {
          console.log('got an error', error);
          this.alert(error.message);
        })
    }
    else
    {
      this.alert('ادخل البريد الالكتروني والباسورد');
    }
  }


  

  // SignUp which means login to the app for the first time 
  signUpUser(user:User):Promise<any>
  {
    if(user.email != null && user.password !=null)
    {
      return this.Auth.auth.createUserWithEmailAndPassword(user.email , user.password).
      then(newUser => 
        {
          this.Database.database.ref(`/userProfile/${newUser.user.uid}/email`).set(user.email);
        }).then( data => 
        {
          console.log('got some data', this.Auth.auth.currentUser);
          this.alert('تم التسجيل بنجاح');
          this.navCtrl.setRoot(TabsPage);
        })
        .catch( error => {
          console.log('got an error', error);
          this.alert(error.message);
        })
    }
    else
    {
      this.alert('ادخل البريد الالكتروني والباسورد');
    }
  }

  
}
