import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'page-showimage-modal',
    templateUrl: 'modal-show-image.html'
})
export class ModalShowImage {

    imageUrl;

    constructor(
        public navParams: NavParams, 
        public viewCtrl: ViewController
      )
        {
            this.imageUrl = navParams.get('image');
        }

    closeModal() {
        this.viewCtrl.dismiss();
    }

}