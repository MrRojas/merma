import { Component, OnInit } from '@angular/core';
import {MermaService} from "../../providers/merma.service";
import { CompraHeader } from "../../models/merma.model";
import { AlertController } from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import { ColumnMode, SelectionType } from '@swimlane/ngx-datatable/esm5/public-api'; 
import { Observable } from 'rxjs';


@Component({
  selector: 'app-list-buy',
  templateUrl: './list-buy.page.html',
  styleUrls: ['./list-buy.page.scss'],
})
export class ListBuyPage implements OnInit {
  compras:any = []
  compra_tmp : CompraHeader
  rows:any = []
  proveedores:any = []
  columns:any = null
    selected = [];
    aux:any = null
   ColumnMode = ColumnMode;
  SelectionType = SelectionType;

   


  constructor(private mermaService: MermaService , private alertController: AlertController ,
private router: Router) { 

  	this.loadData()
  	this.loadDataProveedor()

  	
  	this.columns = [
        { prop: 'Id' },
        { prop: 'Proveedor' },
        { prop: 'Factura' },
        { prop: 'Estado' } 
       
      ];
     
    setTimeout(  () => {

		this.loadDataTable()

    } , 2000 )
	
 
  }

  ngOnInit() {} 

 onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    console.log(" --------- ID -----------")
    let row = this.selected[0]
    console.log(row.Id)
    
    console.log("-------------------------")

     console.log(" --------- Status -----------")
    console.log(row.Estado)
    console.log("------------.------------------")

    if(row.Estado == "Cerrada"){
    	// Esta Compra Esta Sincronizada

    this.presentAlert("Esta Compra esta Cerrada")

    }else if(row.Estado == "Completada"){
    	// Esta Compra Esta Finalizada mas no sincronizada
    	this.presentAlertConfirm(row.Id , 'delete')

    }else if(row.Estado == "Abierta"){
    	// Esta Compra no esta Cerrada y puedo continuarse 

    	console.log("--------- Cargar Compra -------------")

    	this.aux = row.Id

    	console.log(this.compras)
    	let compra = this.compras.filter( (e) =>{

    		console.log( parseInt(this.aux ) + " = " + e.idCompra )

    		return parseInt(e.idCompra) == this.aux
    	})

    	this.compra_tmp = compra[0]
    	console.log(this.compra_tmp)
    	console.log("-------------------------------------")

    	this.presentAlertConfirm(row.Id , 'complete')


    }

  }

  onActivate(event) {
    console.log('Activate Event', event);
  }






  loadData(){
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getCompra().then( compra =>{
        	
         this.compras = compra 
		  console.log(this.compras)          
       	 resolve(true)
      })
    })
 
      return promise
  
   }

   loadDataTable(){

   	 this.rows = []	
  	
  	console.log(this.compras)
   	 
   	 this.compras.forEach( (e) =>{

   	
   	 	if(!e.idProveedor) e.idProveedor = e.Proveedor_idProveedor;
   	 	
   	 	if(!e.factura) e.factura = e.nroFactura;
    
   	 	if(e.localId > 0) e.status = 'Cerrada'
   	 	else if(e.completado) e.status = 'Completada'
   	 	else  e.status = 'Abierta'

   	 	let proveedor = this.proveedores.reduce( proveedor => {

   	 		return proveedor.idProveedor == e.idProveedor
   	 	})


   	 	if(e.status  != 'Cerrada'){
        
         this.rows.push({
        "Id" : e.idCompra ,  
        "Factura" : e.factura , 
        "Proveedor" : proveedor.razonSocial ,  
              "Estado" : e.status 
        })


      }
       

   	 })
   }

    loadDataProveedor(){
   
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getMermas().then( proveedores =>{
        	
         this.proveedores = proveedores 
          
       	 resolve(true)
      })
    })
   }

  async presentAlertConfirm( idCompra , type  ) {

  	let config = {message : ""}
  	
  	if(type == 'delete'){
  		config.message = `<strong>Esta Seguro de Eliminar Esta Compra (${idCompra}) ?</strong>`
  	}

  	if(type == 'complete'){
  		config.message = `<strong>Deseas Confirmar Esta Compra (${idCompra}) ?</strong>`
  	}

  	 if(type == 'add'){
  		config.message = `<strong>Deseas Agregar Mas Productos a esta Compra (${idCompra}) ?</strong>`
  	}


    const alert = await this.alertController.create({
      header: 'Mensaje de Confirmacion',
      message: config.message ,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel ');

            if(type == "complete"){

            	this.presentAlertConfirm(idCompra , "add")
            }
           
          }
        }, {
          text: 'Si',
          handler: () => {
            console.log('Confirm');

             if(type == 'delete'){
              	this.mermaService.deleteCompra(idCompra)
           	 	
           	 	setTimeout(  () => {

					this.loadData()

			    } , 1000 )
           	 	setTimeout(  () => {

					this.loadDataTable()

			    } , 3000 )

			    console.log("----- ACA -----------")
           	 }

           	 else if(type == 'complete'){

           	 	this.compra_tmp.completado = true 
           	 	this.compra_tmp.status = "Cerrada" 
           	 	console.log("La compra ha actualizar")
           	 	console.log(this.compra_tmp)
              	this.mermaService.updateCompra(this.compra_tmp)
           	 	
           	 	setTimeout(  () => {

					this.loadData()

			    } , 1000 )
           	 	setTimeout(  () => {

					this.loadDataTable()

			    } , 3000 )

			    console.log("----- ACA 2-----------")
           	 }

           	  else if(type == 'add'){

			   	localStorage.setItem('factura_compra', JSON.stringify(this.compra_tmp));
			   	this.router.navigateByUrl('/buy/step2')
           	 	
			    console.log("----- ACA 3-----------")
           	 }





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



}
