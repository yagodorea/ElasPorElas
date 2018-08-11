import { Component } from '@angular/core';
import { NavController, LoadingController, Loading } from 'ionic-angular';
import { CargosPage } from '../cargos/cargos';
import { ListaService } from '../../providers/lista-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: Loading;

  constructor(
    public navCtrl: NavController,
    public listaService: ListaService,
    public loadingCtrl: LoadingController
  ) {
    this.loading = loadingCtrl.create({
      content: 'Carregando...',
      spinner: 'dots'
    });
    this.loading.present();
    listaService.fetchList(this.callback,this.loading);
  }

  callback(loading) {
    if(loading) {
      loading.dismiss();
    }
  }

  showClicked(state) {
    console.log('stateClicked = ' + state);
    this.navCtrl.push(CargosPage,{estado: state});
  }
}
