import { Component } from '@angular/core';
import { NavController, App, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import { AppRate } from '@ionic-native/app-rate';


@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})

export class ContactPage {


  public part1: boolean = false;
  public part2: boolean = false;
  public part3: boolean = false;




  constructor(public navCtrl: NavController, private appRate: AppRate, private app: App, private Auth: AngularFireAuth,
    private Database: AngularFireDatabase,
    public alertCtrl: AlertController) {
  }

//  Create Alert 

  




public isToggled: boolean = true;
YES1()
{
  console.log("Toggled: " + this.isToggled);
  if (this.isToggled == true) {
    console.log('true');
    window.open("https://play.google.com/", '_system', 'location=yes');
  }
  else {
    console.log('false');
  }
}
}



