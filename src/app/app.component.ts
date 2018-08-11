import { Component } from '@angular/core';
import { Platform, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    app: App,
    alertCtrl: AlertController) {


      platform.registerBackButtonAction(() => {

        let nav = app.getActiveNavs()[0];
        let activeView = nav.getActive();
    
        if (activeView.name === "FirstPage") {
    
          if (nav.canGoBack()) { //Can we go back?
            nav.pop();
          } else {
            const alert = alertCtrl.create({
              title: 'App termination',
              message: 'Do you want to close the app?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Application exit prevented!');
                }
              }, {
                text: 'Close App',
                handler: () => {
                  platform.exitApp(); // Close this application
                }
              }]
            });
            alert.present();
          }
        }
      });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

