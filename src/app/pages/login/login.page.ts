import { Component, OnInit } from '@angular/core';
import {Producto, Usuario, Tipodocumento} from "../../models/merma.model";
import {Router} from "@angular/router";
import {DATA_LIST} from "../../providers/data";
import {GlobalService} from "../../providers/global.service";
import * as CryptoJS from 'crypto-js';
import {SynchronizeService} from "../../providers/synchronize.service";
import {LoadingController, Platform} from "@ionic/angular";


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logo = '../../assets/logo3.jpeg'
  usuarios: Usuario[] = []



  constructor(private router:  Router,
              private synchronizeService: SynchronizeService,
              private globalService: GlobalService,
              public loadingController: LoadingController,
              private platform: Platform) {



    this.init()
  }

  async init(){
    const loading = await this.loadingController.create({
      message: 'Sincronizando datos ...',
    });
    await loading.present();
    this.platform.ready().then(_=>{
      this.globalService.getCurrentUser().then(usuario=>{
        console.log("comprobando si existe usuario", usuario)

        if(usuario){
          
          localStorage.setItem('usuario', JSON.stringify(usuario));
          
          loading.dismiss()
          this.router.navigateByUrl('/menu')
        }else{
          this.synchronizeService.setup().then(_=>{
            this.globalService.getUsuarios().then(usuarios=>{
              console.log(usuarios)
              this.usuarios = <Usuario[]>usuarios
              loading.dismiss()
            })
          },err=>{
            loading.dismiss()
            alert(JSON.stringify(err))
          })
        }
      }, err=>{
        console.log("no existe usuario")
        this.synchronizeService.setup().then(_=>{
          this.globalService.getUsuarios().then(usuarios=>{
            console.log(usuarios)
            console.log(Tipodocumento)
            this.usuarios = <Usuario[]>usuarios
            loading.dismiss()
          })
        })
      })
    })
  }

  async presentLoading(message) {
    console.log('loading...')
    const loading = await this.loadingController.create({
      message: message,
      duration: 5000
    });
     await loading.present();
  }

  ngOnInit() {


  }

  login(form){
    let usuario: Usuario
    let password = CryptoJS.SHA256(form.value.password).toString(CryptoJS.enc.Hex);
    for(let i = 0; i < this.usuarios.length; i++){
       if(this.usuarios[i].username == form.value.username  && this.usuarios[i].password == password){
         usuario = this.usuarios[i]
         break
       }

    }
    if(usuario){
      this.globalService.setCurrentUser(usuario).then(res=>{
        this.synchronizeService.getRemoteMermas(usuario.username).then(mermas=>{
            this.router.navigateByUrl('/menu')
        })

      }, err=>{
        console.log(err)
      })
    }else{
      this.globalService.presentToast('Usuario y/o contraseña incorrectos')
    }
  }
}
