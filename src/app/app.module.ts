import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CargosPage } from '../pages/cargos/cargos';
import { ListaPage } from '../pages/lista/lista';
import { CandidataPage } from '../pages/candidata/candidata';
import { ListaService } from '../providers/lista-service';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalShowImage } from '../modals/modal-show-image';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CargosPage,
    ListaPage,
    CandidataPage,
    ModalShowImage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CargosPage,
    ListaPage,
    CandidataPage,
    ModalShowImage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    ListaService,
    InAppBrowser,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
