import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController, Loading, Content, Gesture, ToastController, MenuController } from 'ionic-angular';
import { CargosPage } from '../cargos/cargos';
import { ListaService } from '../../providers/lista-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) content: Content;
  @ViewChild('zoom') zoom: ElementRef;
  @ViewChild('fabMenu') fabMenu: ElementRef;

  listaEstados = [
    "Acre", "Alagoas", "Amapá", "Amazonas", "Bahia", "Ceará", "Distrito Federal", "Espírito Santo",
    "Goiás", "Maranhão", "Mato Grosso", "Mato Grosso do Sul", "Minas Gerais", "Pará", "Paraíba",
    "Paraná", "Pernambuco", "Piauí", "Rio de Janeiro", "Rio Grande do Sul", "Rondônia",
    "Roraima", "Santa Catarina", "São Paulo", "Sergipe", "Tocantins"
  ]

  loading: Loading;
  gesture: Gesture;
  counter: number;
  counter2: number;
  myTransform: string;
  dx: number;
  dy: number;

  max_x: number;
  max_y: number;
  min_x: number;
  min_y: number;
  x: number;
  y: number;
  last_x: number;
  last_y: number;
  scale: number;
  base: number;
  original_x: number;
  original_y: number;
  ow: number;
  oh: number;

  constructor(
    public navCtrl: NavController,
    public listaService: ListaService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public menuCtrl: MenuController
  ) {

    this.myTransform = 'scale3d(1,1,1);';

    this.loading = loadingCtrl.create({
      content: 'Carregando...',
      spinner: 'dots'
    });
    this.loading.present();
    listaService.fetchList(this.callback, this.loading);
  }

  presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      showCloseButton: true,
      duration: 10,
      position: 'bottom'
    });

    toast.present();
  }

  ionViewDidLoad() {
    let mapa = this.zoom.nativeElement;
    //create gesture obj w/ ref to DOM element
    this.gesture = new Gesture(mapa);

    this.ow = 0;
    this.oh = 0;
    for (let i = 0; i < mapa.children.length; i++) {
      let c = <HTMLElement>mapa.children.item(i);
      this.ow = c.offsetWidth;
      this.oh += c.offsetHeight;
    }
    this.original_x = this.content.contentWidth - this.ow;
    this.original_y = this.content.contentHeight - this.oh;

    //listen for the gesture
    this.gesture.listen();

    this.onPanStart();

    //turn on listening for pinch or rotate events
    this.gesture.on('pinch', e => this.onPinch(e));
    // this.gesture.on('pinchstart', e => this.presentToast(e.type));
    this.gesture.on('pinchcancel', e => this.onPinchend());
    this.gesture.on('pinchend', e => this.onPinchend());
    this.gesture.on('pan', e => this.onPan(e));
    // this.gesture.on('panstart', e => this.presentToast(e.type));
    this.gesture.on('pancancel', e => this.onPanend());
    this.gesture.on('panend', e => this.onPanend());
    // this.gesture.on('pan', e => this.zoomEvent(e));
    // this.gesture.on('tap', e => this.panEvent(e));
  }

  onPanStart() {
    this.max_x = this.original_x;
    this.max_y = this.original_y;
    this.min_x = 0;
    this.min_y = 0;
    this.x = 0;
    this.y = 0;
    this.last_x = 0;
    this.last_y = 0;
    this.scale = 1;
    this.base = this.scale;
  }

  onPan(ev) {
    // this.presentToast('onPan');
    this.setCoor(ev.deltaX, ev.deltaY);
    this.transform();
  }
  onPanend() {
    // remembers previous position to continue panning.
    this.last_x = this.x;
    this.last_y = this.y;
  }

  onPinch(ev) {
    // this.presentToast('onPinch');
    // formula to append scale to new scale
    this.scale = this.base + (ev.scale * this.scale - this.scale) / this.scale

    this.setBounds();
    this.transform();
  }

  onPinchend() {
    // this.presentToast('onPinchend');
    if (this.scale > 4) {
      this.scale = 4;
    }
    if (this.scale < 0.5) {
      this.scale = 0.5;
    }
    // lets pinch know where the new base will start
    this.base = this.scale;
    this.setBounds();
    this.transform();
  }

  setCoor(xx: number, yy: number) {
    this.x = this.last_x + xx;
    // if (this.x > this.max_x)
    //   this.x = this.max_x;
    // else if (this.x < this.min_x)
    //   this.x = this.min_x;

    this.y = this.last_y + yy;
    // if (this.y > this.max_y)
    //   this.y = this.max_y;
    // else if (this.y < this.min_y)
    //   this.y = this.min_y;
  }

  transform() {
    // console.log(`translate3d(${this.x}px, ${this.y}px, 0) scale3d(${this.scale}, ${this.scale}, 1)`);
    this.zoom.nativeElement.style.transform = `translate3d(${this.x}px, ${this.y}px, 0) scale3d(${this.scale}, ${this.scale}, 1)`;
  }

  setBounds() {
    let elm = this.zoom.nativeElement;
    // I am scaling the container not the elements
    // since container is fixed, the container scales from the middle, while the
    // content scales down and right, with the top and left of the container as boundaries
    // scaled = absolute width * scale - already set width divided by 2;
    let scaled_x = Math.ceil((elm.offsetWidth * this.scale - elm.offsetWidth) / 2);
    let scaled_y = Math.ceil((elm.offsetHeight * this.scale - elm.offsetHeight) / 2);
    // for max_x && max_y; adds the value relevant to their overflowed size
    let overflow_x = Math.ceil(this.original_x * this.scale - this.original_x); // returns negative
    let overflow_y = Math.ceil(this.oh * this.scale - this.oh);

    this.max_x = this.original_x - scaled_x + overflow_x;
    this.min_x = 0 + scaled_x;
    // remove added height from container
    this.max_y = this.original_y + scaled_y - overflow_y;
    this.min_y = 0 + scaled_y;

    this.setCoor(-scaled_x, scaled_y);
    // this.presentToast(`x: ${this.x}, scaled_x: ${scaled_x}, y: ${this.y}, scaled_y: ${scaled_y}`);
  }

  callback(loading) {
    if (loading) {
      loading.dismiss();
    }
  }

  showClicked(state) {
    console.log('stateClicked = ' + state);
    this.navCtrl.push(CargosPage, { estado: state });
  }
}
