import { NavParams, ModalController } from 'ionic-angular';
import { Component } from '@angular/core';
import { Candidata } from '../../interfaces/candidata';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { ModalShowImage } from '../../modals/modal-show-image';

@Component({
  selector: 'candidata',
  templateUrl: 'candidata.html'
})
export class CandidataPage {

  candidata = new Candidata();

  constructor(
    public navParams: NavParams,
    public browser: InAppBrowser,
    public modalCtrl: ModalController
  ) {
    this.candidata = navParams.get('candidata');
  }

  openPage(page) {
    if (page != null && page != "") {
      this.browser.create(page,"_system");
    }
  }

  showImage(image) {
    let modal = this.modalCtrl.create(ModalShowImage, {image: image});
    modal.present();
  }
}