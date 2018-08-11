import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CandidataPage } from '../candidata/candidata';
import { ListaService } from '../../providers/lista-service';

@Component({
  selector: 'lista',
  templateUrl: 'lista.html'
})
export class ListaPage {

  estado: string;
  cargo: string;

  none: boolean;

  listaCandidatas = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public listaService: ListaService) {
    this.estado = navParams.get('estado');
    this.cargo = navParams.get('cargo');
    this.listaCandidatas = listaService.getByStateAndPost(this.estado,this.cargo);
  }

  verCandidata(candidata) {
    this.navCtrl.push(CandidataPage,{ candidata: candidata });
  }
}