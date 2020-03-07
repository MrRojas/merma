import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import {MermaService} from "../../providers/merma.service";
import {Compra , CompraHeader} from "../../models/merma.model";
import {Router} from "@angular/router";
import {AlertController, ModalController, NavParams} from '@ionic/angular';


@Component({
  selector: 'app-buy-step2',
  templateUrl: './buy-step2.page.html',
  styleUrls: ['./buy-step2.page.scss'],
})
export class BuyStep2Page implements OnInit {

  capturedSnapURL:string;
  compra = new Compra();
  compraHeader = new CompraHeader()
  categorias = null 
 
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  }
 
  constructor(
  	private camera: Camera , 
  	 private mermaService: MermaService ,     
  	  private router: Router,

		private alertController: AlertController,
  	  ) { 

  	this.capturedSnapURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXU1NT////R0dHn5+ft7e3b29vW1tbi4uLw8PDq6ur8/Pz4+Pjf39/l5eXz8/Pa2tqkX4ycAAADAklEQVR4nO3d3XqqMBCF4TAKqKDc/91W1Fo1K1hPSPde33vWszBP/maS2JQAAAAAAAAAAAAAAAAA4L8WZ9009rOx7c5/1W5RXRHTcTscmkeH3WayjUt0x1OjHbatYVQi+qEQkKuhN4tKpP1iQK6dZXSKSmzeR2R26mq3dC0xHt6H48alq2x/HZGzvUVQjp+EpGl2DkGJ348cn6D0n8XEYvh82lGasXaLVzB+GJOmdoNXEMs72JzDlNJ+2lEM9m5Ryv2cO8r0+MGHbT91XTeNx21xUNVu8Apid//a0/hTLInoCrnhsWZrV9LdvnWYXkZFJDmuTgaDJ65Jj6qRhMyHDGKS0txJOvmlcgae1m5fBbEvLyadiInDXjalchrzMAPfbdZs2l8kskSHRHDRlMdk6x6TRExyxCTHfJIRebP7uqOOf/rajapMFScd9rFLVG2ydpsqU6XJwXyKVd3EfSlWRx0eKWCJSgCbg3U3CXlK6L1jE+mf/aojz02tu4k+IbSeTQpnYc6Ljq7YW+9NCjf/nLewehW2OD8vKtxKaWu3qyK9MbG5DCrpC11H45AUri5tnEOiEj/zkOhV2Dkkhftt1iERxznuIdFZjvOKU7hrbt1L9FVz85CoNcc5FZ6JkDjcclwiuolzdWCmZhPn6sBMpMPOpcZZ5HfJHd4bLBL5cO0m1cfOJJMXHGu3qLp8w2Y/m4hakvuio1Ji+26S79jcd/VJxMT6BsFVFhP3a7BJxMT51O8m28a6p39J3K4gJnktlpikLN9hPsk3bQ7vzd96GTzuxemLeI6Jeyn24nXlqd2eP2HaPGHhAQAAwD8jYhr7sU0kO9+i/T75GrwvO/7oHksoXr/fXhCvd6ipoIiLBfan6Orn6czPAvWzHe9CtX4WaV2ALP2CuXNHKbyLtF57Sv8mwnjwFN7iN863lQovIxvnEw1ikmPsCMyxOdbiHHs2gb19jhxQoFYgUFPKUXtUnmrU8r+KGHo4y+Dh293lzKsfOfMCAAAAAAAAAAAAAAAAYOQL+5wS39dycaQAAAAASUVORK5CYII='
  	this.loadDataCategories();


  }

 
  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      // this.camera.DestinationType.FILE_URI gives file URI saved in local
      // this.camera.DestinationType.DATA_URL gives base64 URI
      
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.capturedSnapURL = base64Image;
    }, (err) => {
      
      console.log(err);
      // Handle error
    });

  }

  saveNext(){ 

  	this.compra.img = this.capturedSnapURL ;
  	
  	let compraHeader =  JSON.parse(localStorage.getItem("factura_compra") ); 

  	 console.log(compraHeader)
    

  	if(compraHeader.idProveedor){

  			compraHeader.detalle.push(this.compra) 

        this.compraHeader = compraHeader  

         let limit = this.getLimitCategory()
         console.log("limite = "+limit)
         let qtyCantidad =  this.getQtyCategory()
         console.log("cantidad = "+ qtyCantidad)


         let li = +limit
         let ca = +qtyCantidad

         if(  li < ca ) 
            this.presentAlert("Alerta Limite Superado para Esta Categoria" )

  			localStorage.setItem('factura_compra', JSON.stringify(compraHeader));
  	}


  	this.compra = new Compra()
  	this.capturedSnapURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXU1NT////R0dHn5+ft7e3b29vW1tbi4uLw8PDq6ur8/Pz4+Pjf39/l5eXz8/Pa2tqkX4ycAAADAklEQVR4nO3d3XqqMBCF4TAKqKDc/91W1Fo1K1hPSPde33vWszBP/maS2JQAAAAAAAAAAAAAAAAA4L8WZ9009rOx7c5/1W5RXRHTcTscmkeH3WayjUt0x1OjHbatYVQi+qEQkKuhN4tKpP1iQK6dZXSKSmzeR2R26mq3dC0xHt6H48alq2x/HZGzvUVQjp+EpGl2DkGJ348cn6D0n8XEYvh82lGasXaLVzB+GJOmdoNXEMs72JzDlNJ+2lEM9m5Ryv2cO8r0+MGHbT91XTeNx21xUNVu8Apid//a0/hTLInoCrnhsWZrV9LdvnWYXkZFJDmuTgaDJ65Jj6qRhMyHDGKS0txJOvmlcgae1m5fBbEvLyadiInDXjalchrzMAPfbdZs2l8kskSHRHDRlMdk6x6TRExyxCTHfJIRebP7uqOOf/rajapMFScd9rFLVG2ydpsqU6XJwXyKVd3EfSlWRx0eKWCJSgCbg3U3CXlK6L1jE+mf/aojz02tu4k+IbSeTQpnYc6Ljq7YW+9NCjf/nLewehW2OD8vKtxKaWu3qyK9MbG5DCrpC11H45AUri5tnEOiEj/zkOhV2Dkkhftt1iERxznuIdFZjvOKU7hrbt1L9FVz85CoNcc5FZ6JkDjcclwiuolzdWCmZhPn6sBMpMPOpcZZ5HfJHd4bLBL5cO0m1cfOJJMXHGu3qLp8w2Y/m4hakvuio1Ji+26S79jcd/VJxMT6BsFVFhP3a7BJxMT51O8m28a6p39J3K4gJnktlpikLN9hPsk3bQ7vzd96GTzuxemLeI6Jeyn24nXlqd2eP2HaPGHhAQAAwD8jYhr7sU0kO9+i/T75GrwvO/7oHksoXr/fXhCvd6ipoIiLBfan6Orn6czPAvWzHe9CtX4WaV2ALP2CuXNHKbyLtF57Sv8mwnjwFN7iN863lQovIxvnEw1ikmPsCMyxOdbiHHs2gb19jhxQoFYgUFPKUXtUnmrU8r+KGHo4y+Dh293lzKsfOfMCAAAAAAAAAAAAAAAAYOQL+5wS39dycaQAAAAASUVORK5CYII='


  }


  saveFinish(){

  	this.compra.img = this.capturedSnapURL ;
  	
  	let compraHeader =  JSON.parse(localStorage.getItem("factura_compra") ); 
     
     console.log(compraHeader)

  	if(compraHeader.idProveedor){

  			compraHeader.detalle.push(this.compra)  
        this.compraHeader = compraHeader

         let limit = this.getLimitCategory()
         console.log("limite = "+limit)
         let qtyCantidad =  this.getQtyCategory()
         console.log("cantidad = "+ qtyCantidad)
         if(limit < qtyCantidad) this.presentAlert("Alerta Limite Superado para Esta Categoria" )

          this.presentAlertConfirm_estatus() 

        console.log("------------ compraheader preview----------------")
        console.log(this.compraHeader)
        console.log("------------------------------------------------")




  	}


  	this.compra = new Compra()
  	this.capturedSnapURL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARMAAAC3CAMAAAAGjUrGAAAAMFBMVEXU1NT////R0dHn5+ft7e3b29vW1tbi4uLw8PDq6ur8/Pz4+Pjf39/l5eXz8/Pa2tqkX4ycAAADAklEQVR4nO3d3XqqMBCF4TAKqKDc/91W1Fo1K1hPSPde33vWszBP/maS2JQAAAAAAAAAAAAAAAAA4L8WZ9009rOx7c5/1W5RXRHTcTscmkeH3WayjUt0x1OjHbatYVQi+qEQkKuhN4tKpP1iQK6dZXSKSmzeR2R26mq3dC0xHt6H48alq2x/HZGzvUVQjp+EpGl2DkGJ348cn6D0n8XEYvh82lGasXaLVzB+GJOmdoNXEMs72JzDlNJ+2lEM9m5Ryv2cO8r0+MGHbT91XTeNx21xUNVu8Apid//a0/hTLInoCrnhsWZrV9LdvnWYXkZFJDmuTgaDJ65Jj6qRhMyHDGKS0txJOvmlcgae1m5fBbEvLyadiInDXjalchrzMAPfbdZs2l8kskSHRHDRlMdk6x6TRExyxCTHfJIRebP7uqOOf/rajapMFScd9rFLVG2ydpsqU6XJwXyKVd3EfSlWRx0eKWCJSgCbg3U3CXlK6L1jE+mf/aojz02tu4k+IbSeTQpnYc6Ljq7YW+9NCjf/nLewehW2OD8vKtxKaWu3qyK9MbG5DCrpC11H45AUri5tnEOiEj/zkOhV2Dkkhftt1iERxznuIdFZjvOKU7hrbt1L9FVz85CoNcc5FZ6JkDjcclwiuolzdWCmZhPn6sBMpMPOpcZZ5HfJHd4bLBL5cO0m1cfOJJMXHGu3qLp8w2Y/m4hakvuio1Ji+26S79jcd/VJxMT6BsFVFhP3a7BJxMT51O8m28a6p39J3K4gJnktlpikLN9hPsk3bQ7vzd96GTzuxemLeI6Jeyn24nXlqd2eP2HaPGHhAQAAwD8jYhr7sU0kO9+i/T75GrwvO/7oHksoXr/fXhCvd6ipoIiLBfan6Orn6czPAvWzHe9CtX4WaV2ALP2CuXNHKbyLtF57Sv8mwnjwFN7iN863lQovIxvnEw1ikmPsCMyxOdbiHHs2gb19jhxQoFYgUFPKUXtUnmrU8r+KGHo4y+Dh293lzKsfOfMCAAAAAAAAAAAAAAAAYOQL+5wS39dycaQAAAAASUVORK5CYII='
  	localStorage.setItem('factura_compra', JSON.stringify( [] ));
  	this.router.navigateByUrl('/menu')

  }

  save(){

  	this.presentAlertConfirm()
  }


  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Mensaje de Confirmacion',
      message: 'Message <strong>¿Agregar otro producto a la compra?</strong>!!!',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel ');
            this.saveFinish()
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm');
            this.saveNext()
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlertConfirm_estatus() {
    const alert = await this.alertController.create({
      header: 'Confirmar la compra',
      message: 'Message <strong>¿Usted Deseas Confirmar Esta Compra?</strong>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
              this.compraHeader.completado = false

              if(!this.compraHeader.status )
                this.mermaService.addCompra(this.compraHeader).then(res=>{})
              else
                this.mermaService.updateCompra(this.compraHeader).then(res=>{})

          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm');
            this.compraHeader.completado = true 
            
            if(!this.compraHeader.status )
              this.mermaService.addCompra(this.compraHeader).then(res=>{})
            else 
              this.mermaService.updateCompra(this.compraHeader).then(res=>{})
          }
        }
      ]
    });

    await alert.present();
  }

  async presentAlert(title = ""   , subtitle = "" ) {
    const alert = await this.alertController.create({
    message: subtitle,
    subHeader: title,
    buttons: ['Ok']
   });
    await alert.present(); 
  }





  ngOnInit(){
  	
  }

    loadDataCategories(){
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getCategoria().then( categorias =>{
        	
         this.categorias = categorias 
          
       	 resolve(true)
      })
    })
 
      return promise
  
   }


   getLimitCategory(){


    console.log(this.categorias)

     let limite = this.categorias.filter( e => {
       


             if( e.idCategoria == this.compra.idCategoria ){

                console.log("--- limite = "+ e.limite)
              
                return e.limite 
              
              } 


         



      })
     limite = (limite.length > 0) ? limite[0].limite : 9999
     console.log("resultado limite")
     console.log(limite)
     console.log("fin de resultado limite")

     return limite 
   }


   getQtyCategory(){


      let compraLines = this.compraHeader.detalle
      console.log(compraLines)
      let qtyTotal = 0

     
        for(let i=0; i < compraLines.length; i++   ){

          console.log(compraLines[i])

            let x = parseInt(  compraLines[i].cantidad )

            if(this.compra.idCategoria == compraLines[i].idCategoria   )
   
              qtyTotal += x
        }
        
    

      return qtyTotal; 


   }




}
