import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { ListaPage } from '../lista/lista';

@Component({
  selector: 'cargos',
  templateUrl: 'cargos.html'
})
export class CargosPage {

  estado: string;
  cargosList = [
    'Deputada Federal', 'Deputada Estadual', 'Senadora', 'Governadora'
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
    this.estado = navParams.get('estado');
  }

  goToList(post) {
    console.log('goToList: ' + post);
    this.navCtrl.push(ListaPage,{
      estado: this.estado,
      cargo: post
    });
  }

}