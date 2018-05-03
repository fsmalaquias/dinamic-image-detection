import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http, RequestOptions, Headers} from '@angular/http';
import { ImageViewerController } from 'ionic-img-viewer';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  content: string = 'carregando';
  private headersLocal;
  private httpOptionsLocal;

  constructor(
    public navCtrl: NavController,
    private imageViewerCtrl: ImageViewerController,
    public http:Http) {

    this.headersLocal = new Headers({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    });
    this.httpOptionsLocal = new RequestOptions({
      headers: this.headersLocal
    });
    
  }

  presentImage(myImage) {
    const imageViewer = this.imageViewerCtrl.create(myImage);
    imageViewer.present();
  }

  log(texto){
    console.log(texto);
  }

  ionViewDidLoad(){
    this.content = "ionViewDidLoad";
    this.load();
  }

  load(){
    this.http.post('http://www.dev4brothers.com.br/dese/ionic-alert.php', {},this.httpOptionsLocal).subscribe((data: any) => {
      this.content = data._body;
      setTimeout(() => {
        let div: HTMLDivElement = document.querySelector(".dinamic-content");
        let img: NodeListOf<HTMLImageElement> = div.getElementsByTagName('img');
        for (let i = 0; i < img.length; i++) {
          img.item(i).addEventListener('click', (ev: MouseEvent) => {
            //alert('teste');
            this.presentImage(img.item(i));
          })
          console.log(img.item(i));
        }

      }, 1000);

    })
  }
}
