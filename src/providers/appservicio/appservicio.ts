import { Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';

@Injectable()
export class AppservicioProvider {

  public TAG: string = 'AppservicioProvider ';
  public loading: Loading;

  constructor(
    public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {}

  activarProgreso(enc: boolean){
  	if (enc){
      this.loading = this.loadingCtrl.create();
      this.loading.present();
  	} else {
  	  this.loading.dismiss();
  	}
  }

  errorConeccion(error){
    this.loading.dismiss();
    console.log(this.TAG, JSON.stringify(error) );
    const alert: Alert = this.alertCtrl.create({
      message: 'Problema con la coneccion a internet',
      buttons:  ['OK']
    });
    alert.present();
  }

  alecrtMsg(msg){
    const alert: Alert = this.alertCtrl.create({
      message: msg,
      buttons:  ['OK']
    });
    alert.present();
  }

}
