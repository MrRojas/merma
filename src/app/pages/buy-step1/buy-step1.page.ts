import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {DATA_LIST, MermaExample} from "../../providers/data";
import {CompraHeader , Merma, MermaMixed, Motivo, Producto, Sector, Tipo, Turno, UnidadDeMedida, Usuario, Tipodocumento, Grupoarticulo, categoriaMixed} from "../../models/merma.model";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {MermaService} from "../../providers/merma.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {GlobalService} from "../../providers/global.service";
import {IonicSelectableComponent} from "ionic-selectable";

@Component({
  selector: 'app-buy-step1',
  templateUrl: './buy-step1.page.html',
  styleUrls: ['./buy-step1.page.scss'],
})
export class BuyStep1Page implements OnInit {
  proveedores = []
  provee = 0
  factura = "" 
 
  constructor(private modalCtrl: ModalController,
  private router: Router,
private mermaService: MermaService) { 

  	this.loadData()

  }

  loadData(){
   
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getMermas().then( proveedores =>{
        	
         this.proveedores = proveedores 
          
       	 resolve(true)
      })
    })

   }

   goTolist(){

   	if(this.provee){

   		let compra = new CompraHeader()

      compra.idProveedor =  this.provee
      compra.factura = this.factura
      compra.idCompra = this.formatId(Date.now())
      compra.fecha = this.getDateHours()
      let usuario = JSON.parse(localStorage.getItem("usuario") )
      compra.usuario = (usuario) ? usuario.username : 'admin'
      compra.detalle = []
      

   		localStorage.setItem('factura_compra', JSON.stringify(compra));
   		this.router.navigateByUrl('/buy/step2')
   	}

   	
   }


   formatId(id){

     let valor = id.toString()
     let x = "" ; 

     for( let i = 0 ;  i <= 9; i++ )  
         x += valor[i] ;

     return parseInt(x);
     
    }

        getDateHours()
        {
            let hoy = new Date();
            let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
            let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();

            return  fecha + ' ' + hora;

        }




  ngOnInit() {
  }

}
