import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{locations} from '../../model/locations'
import { AngularFireDatabase } from 'angularfire2/database';
import{RateValue}from '../../model/RateValue';
/*
  Generated class for the MyServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MyServiceProvider {
private gpsListref=this.db.list<locations>('centerLoc')

private rateAndinfo=this.db.list<RateValue>('rateAndDeviceInfo')
  constructor(public db:AngularFireDatabase) {
    console.log('Hello MyServiceProvider Provider');
  }

  getLocations(){
    return this.gpsListref
  }
  addLocation(loc:locations){
    return this.gpsListref.push(loc)

  }

  
  //for adding vale of rate to datavase
  addRate(RateInfo:RateValue){
    return this.rateAndinfo.push(RateInfo)
}
}