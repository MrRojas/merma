import { Component, OnInit } from '@angular/core';
import {MermaService} from "../../providers/merma.service";
import { categoria} from "../../models/merma.model";
import { AlertController } from '@ionic/angular';
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";


@Component({ 
  selector: 'app-list-categories',
  templateUrl: './list-categories.page.html',
  styleUrls: ['./list-categories.page.scss'],
})
export class ListCategoriesPage implements OnInit {
   
  categorias = null
  aux = null

  constructor(  private mermaService: MermaService , private alertCtrl: AlertController ,
private router: Router
   ) { 

   this.loadDataCategories();

  setTimeout(()=>{

  	console.log(this.categorias)
  }, 1000)

  }

  ngOnInit() {
  }

  edit(id ){

      this.aux = id 

  		let categoria = this.categorias.filter( e =>{

          console.log("Categoria")
          console.log(e.idCategoria)
          console.log(this.aux)


  			return e.idCategoria == this.aux  
  		})

  		 localStorage.setItem('categoria', JSON.stringify(categoria));

  		console.log(categoria)


  		this.router.navigateByUrl('/storage/categorie')
  }

  delete(id , name){
  	this.mermaService.deleteCategoria(id)
  	this.loadDataCategories()
  	console.log(this.categorias)
  	this.presentAlert("Categoria Articulo Eliminada " ,  ` ( ${name} ) ` )
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




   async presentAlert(title = ""   , subtitle = "" ) {
    const alert = await this.alertCtrl.create({
    message: subtitle,
    subHeader: title,
    buttons: ['Ok']
   });
   	await alert.present(); 
	}

	async presentQuestion() {
    const alert = await this.alertCtrl.create({
    message: 'Low battery',
    subHeader: '10% of battery remaining',
    buttons: ['Dismiss']
   });
   	await alert.present(); 
	}


}
