import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {DATA_LIST, MermaExample} from "../../providers/data";
import {Merma, MermaMixed, Motivo, Producto, Sector, Tipo, Turno, UnidadDeMedida, Usuario, Tipodocumento, Grupoarticulo, categoriaMixed} from "../../models/merma.model";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {MermaService} from "../../providers/merma.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {GlobalService} from "../../providers/global.service";
import {IonicSelectableComponent} from "ionic-selectable";



@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.page.html',
  styleUrls: ['./edit-categories.page.scss'],
})
export class EditCategoriesPage implements OnInit {
  productos: Producto[] = []
  all_products: Producto[] = []
  turnos: Tipodocumento[] = []
  grupocategoria:Grupoarticulo[] = []
  tipos: Tipo[] = []
  sectores: Sector[] = []
  motivos: Motivo[] = []
  unidadesDeMedidas: UnidadDeMedida[] = []
  merma: MermaMixed = new MermaMixed()
  categoria:categoriaMixed=new categoriaMixed
  defaultImg = '../../assets/default.png'
  canChange: boolean = true
  currentUser: string = ''
  page = 2;


   constructor(private modalCtrl: ModalController,
              private camera: Camera,
              private router: Router,
              private route: ActivatedRoute,
              private mermaService: MermaService,
              private alertController: AlertController,
              private globalService: GlobalService
  ) {


  this.init()
  this.categoria = JSON.parse(localStorage.getItem("categoria") )[0]
  console.log(this.categoria)

  }

  loadData(){
    let promise = new Promise((resolve, reject) => {
        this.globalService.getProductos().then(productos=>{
          this.productos = productos
         
          this.globalService.getTIPODOCUMENTO().then(turnos=>{
            this.turnos = turnos
            this.globalService.getGRUPOARTICULO().then(grupocategoria=>{
              this.grupocategoria = grupocategoria
              
            this.globalService.getTipos().then(tipos=>{
              this.tipos = tipos
              this.globalService.getMotivos().then(motivos =>{
                this.motivos = motivos
                this.globalService.getUnidadesDeMedidas().then(unidadesDeMedidas =>{
                  this.unidadesDeMedidas = unidadesDeMedidas
                  this.globalService.getSectores().then(sectores =>{
                    this.sectores = sectores
                    this.globalService.getCurrentUser().then( user =>{
                      this.currentUser = user.username
                      resolve(true)
                    })
                  })
                    })
                  })
              
              })
            })
          })
        })
      })
      return promise
  }

   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
      month = '0' + month;
    if (day.length < 2)
      day = '0' + day;

    return [year, month, day].join('-');
  }

  init(){

  this.loadData()
    console.log(this.mermaService.getCategoria())



    this.route.queryParams.subscribe(params =>{
      if (params && params.id) {
        this.mermaService.getMerma(+params.id).then(merma=>{
          this.merma = merma
          console.log("editando", merma)
          if(this.merma.inactivo || this.merma.remoteId){
            this.canChange = false
          }
        })
      }else{
      // this.merma = MermaExample
      }

    })
  }
   
  ngOnInit() {
  }




  save(form){
    
    console.log(this.categoria)
   
    console.log(this.mermaService.updatecategoria(this.categoria))
   
     this.router.navigateByUrl('/menu')
  }

  goTolist(){ 

    this.router.navigateByUrl('/get/categories')
  }




  changeTurno($event){
    for(let i = 0; i < this.grupocategoria.length; i++){
      if (this.grupocategoria[i].id == $event.target.value){
        this.categoria.grupoCategoria = this.grupocategoria[i]
      }
    }
  }

  



  paginate() {
    return this.productos.slice(this.page * 20, (this.page + 1) * 20);
  }
}
