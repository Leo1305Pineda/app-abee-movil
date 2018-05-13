import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { ProductoProvider } from '../providers/producto/producto';
import { AppservicioProvider } from '../providers/appservicio/appservicio';
import { MonedasProvider } from '../providers/monedas/monedas';
import { ClientesProvider } from '../providers/clientes/clientes';
import { RegistrosProvider } from '../providers/registros/registros';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ProductoProvider,
    AppservicioProvider,
    MonedasProvider,
    ClientesProvider,
    RegistrosProvider
  ]
})
export class AppModule {}
