import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavParams} from '@ionic/angular';
import {DATA_LIST, MermaExample} from "../../providers/data";
import {Merma, MermaMixed, Motivo, Producto, Sector, Tipo, Turno, UnidadDeMedida, Usuario, Tipodocumento, Grupoarticulo} from "../../models/merma.model";
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {MermaService} from "../../providers/merma.service";
import {ActivatedRoute, NavigationExtras, Router} from "@angular/router";
import {GlobalService} from "../../providers/global.service";
import {IonicSelectableComponent} from "ionic-selectable";

@Component({
  selector: 'app-edit-proveedor',
  templateUrl: './edit-proveedor.page.html',
  styleUrls: ['./edit-proveedor.page.scss'],
})
export class EditProveedorPage implements OnInit {

  productos: Producto[] = []
  all_products: Producto[] = []
  turnos: Tipodocumento[] = []
  grupoCategoria: Grupoarticulo[] = []
  tipos: Tipo[] = []
  sectores: Sector[] = []
  motivos: Motivo[] = []
  unidadesDeMedidas: UnidadDeMedida[] = []
  merma: MermaMixed = new MermaMixed()
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
  this.merma  = JSON.parse(localStorage.getItem("proveedor") )[0];
  }

  loadData(){
    let promise = new Promise((resolve, reject) => {
        this.globalService.getProductos().then(productos=>{
          this.productos = productos
         this.globalService.getGRUPOARTICULO().then(grupocategoria=>{
           this.grupoCategoria=grupocategoria
          this.globalService.getTIPODOCUMENTO().then(turnos=>{
            this.turnos = turnos
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
    
    console.log(this.merma)
  
   this.mermaService.updateMerma(this.merma)
   
   // this.router.navigateByUrl('/menu')
  }




  changeTurno($event){
    for(let i = 0; i < this.turnos.length; i++){
      if (this.turnos[i].id == $event.target.value){
        this.merma.tipodocumento = this.turnos[i]
      }
    }
  }

  



  paginate() {
    return this.productos.slice(this.page * 20, (this.page + 1) * 20);
  }


  goTolist(){ 

    this.router.navigateByUrl('/get/partner')
  }



}
