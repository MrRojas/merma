import { Component, OnInit } from '@angular/core';
import {MermaService} from "../../providers/merma.service";
import { categoria} from "../../models/merma.model";
import { AlertController } from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-list-proveedores',
  templateUrl: './list-proveedores.page.html',
  styleUrls: ['./list-proveedores.page.scss'],
})

export class ListProveedoresPage implements OnInit {
  
  proveedores = null

  constructor(  private mermaService: MermaService , private alertCtrl: AlertController ,
private router: Router
   ) { 

   this.loadData();



  }

  ngOnInit() {
  }

  edit(id ){

  

  		let proveedor = this.proveedores.filter( e =>{

  			return e.idProveedor = id 
  		})

  		 localStorage.setItem('proveedor', JSON.stringify(proveedor));

  		console.log(proveedor)


  		this.router.navigateByUrl('/storage/proveedor')
  }

  delete(id , name){

  	this.mermaService.deleteProveedor(id)
  	this.loadData()
  
  	this.presentAlert("Proveedor Eliminado " ,  ` ( ${name} ) ` )
 	this.router.navigateByUrl('/menu')
  }

  loadData(){
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getMermas().then( proveedores =>{
        	
         this.proveedores = proveedores 
          
       	 resolve(true)
      })
    })
 
      return promise
  
   }




   async presentAlert(title = ""   , subtitle = "" ) {
    const alert = await this.alertCtrl.create({
    message: subtitle,
    subHeader: title,
    buttons: ['Ok']
   });
   	await alert.present(); 
	}




}
