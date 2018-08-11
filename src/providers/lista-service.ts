import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candidata } from '../interfaces/candidata';

@Injectable()
export class ListaService {

  listaCandidatas = [];
  tableURL = 'https://spreadsheets.google.com/feeds/list/1M43hnUjtTJEAN3ISy_MPsS3yF3cTfAmiXAdV3KkLnSQ/od6/public/values?alt=json';

  constructor(
    public http: HttpClient
  ) { }

  getByState(estado) {
    let newList = [];
    this.listaCandidatas.forEach(element => {
      if (element.estado == estado) {
        let candidata = new Candidata();

        candidata.nome = element.nome;
        candidata.numero = element.numero;
        candidata.cargo = element.cargo;
        candidata.estado = element.estado;
        candidata.foto_url = element.foto_url;
        candidata.descricao = element.descricao;
        candidata.website = element.website;
        candidata.facebook = element.facebook;
        candidata.twitter = element.twitter;
        candidata.instagram = element.instagram;

        newList.push(candidata);
      }
    });
    return newList;
  }

  getByStateAndPost(estado,cargo) {
    let newList = [];
    this.listaCandidatas.forEach(element => {
      if (element.estado == estado && element.cargo == cargo) {
        let candidata = new Candidata();

        candidata.nome = element.nome;
        candidata.numero = element.numero;
        candidata.cargo = element.cargo;
        candidata.estado = element.estado;
        candidata.foto_url = element.foto_url;
        candidata.descricao = element.descricao;
        candidata.website = element.website;
        candidata.facebook = element.facebook;
        candidata.twitter = element.twitter;
        candidata.instagram = element.instagram;

        newList.push(candidata);
      }
    });
    return newList;
  }

  fetchList(callback,loading) {
    this.http.get(this.tableURL)
      .subscribe((res) => {
        if (res != null) {
          let entries = res['feed'].entry;
          if (entries.length > 0) {
            entries.forEach(element => {
              let candidata = new Candidata();

              candidata.nome = element.gsx$nome.$t;
              candidata.numero = element.gsx$número.$t;
              candidata.cargo = element.gsx$cargo.$t;
              candidata.estado = element.gsx$estado.$t;
              candidata.foto_url = element.gsx$fotourl.$t;
              candidata.descricao = element.gsx$descrição.$t;
              candidata.website = element.gsx$website.$t;
              candidata.facebook = element.gsx$facebook.$t;
              candidata.twitter = element.gsx$twitter.$t;
              candidata.instagram = element.gsx$instagram.$t;

              this.listaCandidatas.push(candidata);
            });
            callback(loading);
          }
        }
      });
  }

}