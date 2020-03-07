import { Component, OnInit } from '@angular/core';
import {SynchronizeService} from "../../providers/synchronize.service";
import { LoadingController, Platform, ToastController } from '@ionic/angular';
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {MermaService} from "../../providers/merma.service";
import {GlobalService} from "../../providers/global.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  constructor(private synchronizeService: SynchronizeService,
              private router: Router,
              private storage: Storage,
              public globalService: GlobalService,
              private mermaService: MermaService,
              private platform: Platform,
              public loadingController: LoadingController,public toastController: ToastController
              ) {

    this.platform.ready().then(() => {
      document.addEventListener('backbutton', () => {
        this.router.navigateByUrl('/menu')
      })
    })
  }

  ngOnInit() {
  }

  logout(){
    this.globalService.logout().then(_=>{
      this.router.navigateByUrl('/')
    })
  }



  listMermas() {
    this.router.navigateByUrl('/mermas')
  }

  addMerma() {
    this.router.navigateByUrl('/create')
  }

  addCategoria()  {
    this.router.navigateByUrl('/categoria')
  }

  goRouter( id )  {

    console.log(id)
  }


  
  clearStorage(){
    this.storage.set('mermas',[])
  }

  async synchronize(){
    const loading = await this.loadingController.create({
      message: 'Sincronizando datos ...',
    });
    await loading.present();

    this.synchronizeService.synchronize_2().then(_=>{
      loading.dismiss()
      this.presentToast()

    }, err=>{
      console.log(err)
      alert(JSON.stringify(err))
      loading.dismiss()
    })

    this.synchronizeService.synchronize().then(_=>{
      loading.dismiss()
      this.presentToast()

    }, err=>{
      console.log(err)
      alert(JSON.stringify(err))
      loading.dismiss()
    })


    this.synchronizeService.synchronize_3().then(_=>{
      loading.dismiss()
      this.presentToast()

    }, err=>{
      console.log(err)
      alert(JSON.stringify(err))
      loading.dismiss()
    })
  }


  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Sincronizacion exitosa.',
      duration: 3000,
      color: "success"
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

}
