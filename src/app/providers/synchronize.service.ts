import {Injectable} from "@angular/core";
import { HTTP } from '@ionic-native/http/ngx';
import {DATA_LIST} from "./data";
import {Storage} from "@ionic/storage";
import {MERMAS_KEY, MermaService} from "./merma.service";
import {ConsultaResponse, proveedor, MermaMixed, MermasResponse, categoriaMixed} from "../models/merma.model";
import {Platform} from "@ionic/angular";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {getObjectById, getUserByUsername} from "../utils/functions";

export const CONSULTA_URL = 'https://www.robsa.com.py/feriaasuncion/servicios/public/parametrica/consulta'
export const MERMAS_URL = 'http://fclero.org.py:8585/ws-paresa/paresa/public/index.php/mermas/mermas'

export const SYNC_URL = 'https://www.robsa.com.py/feriaasuncion/servicios/public/parametrica/sincronizacionProveedor'

export const SYNC_URL_2 = 'https://www.robsa.com.py/feriaasuncion/servicios/public/parametrica/sincronizacionCategoria'
export const SYNC_URL_3 = 'https://www.robsa.com.py/feriaasuncion/servicios/public/parametrica/sincronizacionCompra'


/*
export const CONSULTA_URL = 'http://10.24.89.33:8585/ws-paresa/paresa/public/index.php/mermas/consulta'
export const MERMAS_URL = 'http://10.24.89.33:8585/ws-paresa/paresa/public/index.php/mermas/mermas'
export const SYNC_URL = 'http://10.24.89.33:8585/ws-paresa/paresa/public/index.php/mermas/sincronizacion'
*/

@Injectable({
    providedIn: 'root'
})
export class SynchronizeService {
    allData: ConsultaResponse = new ConsultaResponse()
    localMermas: MermaMixed[]
    localMermas_2 = []
    localMermas_3 = []
    categorias = [] 
    proveedores = []
    compras = []
    constructor( private http: HttpClient,
                 private platform: Platform,
                 private mermaService: MermaService,
                 private storage: Storage) {
        this.platform.ready().then(_=>{
            this.setFromStorage()
        })

        this.loadData()
        this.loadDataCategories()
        this.loadDataCompra()

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


    loadDataCategories(){
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getCategoria().then( categorias =>{
            
         this.categorias = categorias 
          
         resolve(true)
      })
    })
 
      return promise
  
   }


    loadDataCompra(){
    let promise = new Promise((resolve, reject) => {
        this.mermaService.getCompra().then( compras =>{
            
         this.compras = compras 
          
         resolve(true)
      })
    })
 
      return promise
  
   }


    setFromStorage(){
        return this.mermaService.getMermas().then(mermas=>{
            this.localMermas = mermas
        })
    }


    setFromStorage_2(){
        return this.mermaService.getCategoria().then(categoria=>{
            this.localMermas_2 = categoria
        })
    }

    setFromStorage_3(){
        return this.mermaService.getCompra().then(compra=>{
            this.localMermas_3 = compra
        })
    }

    setup(){


        let promise = new Promise((resolve, reject) => {
            this.populate().then(_=>{
                resolve(true)
            }, err=>{
                reject(err)
            })
        });
        return promise;
    }

    synchronize(){
        let promise = new Promise((resolve, reject) => {
            
                 this.sendData().then(_=>{
                     resolve(true)
                 }, err=>{
                     reject(err)
                     console.log(err)
                 })
             
        })
        return promise
    }


     synchronize_2(){
        let promise = new Promise((resolve, reject) => {
            
                 this.sendData_2().then(_=>{
                     resolve(true)
                 }, err=>{
                     reject(err)
                     console.log(err)
                 })
             
        })
        return promise
    }

     synchronize_3(){
        let promise = new Promise((resolve, reject) => {
            
                 this.sendData_3().then(_=>{
                     resolve(true)
                 }, err=>{
                     reject(err)
                     console.log(err)
                 })
             
        })
        return promise
    }

    getOneMonthAgoDate(){
        var d = new Date();
        var m = d.getMonth();
        d.setMonth(d.getMonth() - 1);
        if (d.getMonth() == m){
            d.setDate(0)
        }
        d.setHours(0, 0, 0);
        d.setMilliseconds(0);
        return d
    }


    prepareData(){
        return this.setFromStorage().then(_=>{

            let mermas: proveedor[] = []
            console.log(mermas)
            console.log(this.proveedores)

            if(!this.localMermas) this.localMermas = [];

            for (let i = 0; i < this.localMermas.length; i++) {
                let m = this.localMermas[i]
                if (!m.localId) {
                    let merma: proveedor = {
                        idProveedor: m.idProveedor,
                        tipodocumentoid:m.tipodocumentoid,
                        razonSocial:m.razonSocial,
                        tipoDocumento: parseInt(m.tipodocumentoid),
                        nroDocumento:m.nroDocumento,
                        direccion:m.direccion,
                        celular:m.celular,
                        mail:m.mail,
                      
                     
                        inactivo: m.inactivo,
                      
                        remoteId: m.remoteId, 
                        localId: m.localId
                    }
                    mermas.push(merma)
                }
            }
            return mermas
        })



    }

    prepareData_2(){
        return this.setFromStorage_2().then(_=>{

            let categorias = []
            console.log(categorias)
            console.log(this.categorias)

            if(!this.localMermas_2) this.localMermas_2 = []

            for (let i = 0; i < this.localMermas_2.length; i++) {
                let m = this.localMermas_2[i]
                if (!m.localId) {
                    let categoria = {
                         idCategoria: m.idCategoria,
                        nombre: m.nombre,
                        GrupoCategoria_idGrupoCategoria: m.GrupoCategoria_idGrupoCategoria,
                        usuarioInsercion: m.usuarioInsercion,
                        fechaInsercion: m.fechaInsercion
                    }
                    categorias.push(categoria)
                }
            }
            return categorias
        })



    }

    prepareData_3(){
        return this.setFromStorage_3().then(_=>{

            let compras = []
            console.log(compras)
            console.log(this.compras)

            if(!this.localMermas_3) this.localMermas_3  = [];

            for (let i = 0; i < this.localMermas_3.length; i++) {
                let m = this.localMermas_3[i]
                if (!m.localId) {
                    let compra = {
                         idCompra: m.idCompra,
                      
                     
                        idProveedor: m.idProveedor,
                        detalle: m.detalle,
                        usuario: m.usuario,
                        fecha: m.fecha,

                    }
                    compras.push(compra)
                }
            }
            return compras
        })



    }

    sendData(){
        let promise = new Promise((resolve, reject) => {
            this.prepareData().then(data =>{
console.log("TEST")
console.log(data)

                this.http.post(SYNC_URL, {"proveedores":data},
                ).subscribe((res: any) => {
                    console.log(res)
                    this.setMermas(res.proveedores)
                    resolve(true)
                }, error => {
                    reject(error)
                    console.log(error)
                })
            })


        })
        return promise
    }


    sendData_2(){
        let promise = new Promise((resolve, reject) => {
            this.prepareData_2().then(data =>{
            console.log("TEST 2")
            console.log(data)

                this.http.post(SYNC_URL_2, {"categorias":data},
                ).subscribe((res: any) => {
                    console.log(res)
                    this.setMermas_2(res.categorias)
                    resolve(true)
                }, error => {
                    reject(error)
                    console.log(error)
                })
            })


        })
        return promise
    }

      sendData_3(){
        let promise = new Promise((resolve, reject) => {
            this.prepareData_3().then(data =>{
            console.log("TEST 3")
            console.log(data)

                this.http.post(SYNC_URL_3, {"compras":data},
                ).subscribe((res: any) => {
                    console.log(res)
                    this.setMermas_3(res.compras)
                    resolve(true)
                }, error => {
                    reject(error)
                    console.log(error)
                })
            })


        })
        return promise
    }


    populate(){

        let promise = new Promise((resolve, reject) => {

            console.log("poblando")
            this.http.get(CONSULTA_URL ).subscribe((data: any) => {
                this.allData = data
                this.setUsuarios(data.usuarios || []).then(_=>{
                    this.setGRUPOACATEGORIA(data.grupoCategoria || []).then(_=>{
                        this.setTIPODOCUMENTO(data.tiposDocumento || []).then(_=>{
                                            resolve(true)
                                        }, err=>{
                                            reject(err)
                                        })
                                    }, err=>{
                                        reject(err)
                                    })
                                    
                                }, err=>{
                                    reject(err)
                                })
                            }, err=>{
                                reject(err)
                            })
            
        })

        console.log("fin")
       return promise
    }

    setProductos(productos){
        return this.storage.set('productos', productos)
    }

    setUsuarios(usuarios){
        return this.storage.set('usuarios', usuarios)
    }

    setMotivos(motivos){
        return this.storage.set('motivos', motivos)
    }

    setTipos(tipos){
        return this.storage.set('tipos', tipos)
    }

    setUnidadesDeMedida(unidadesDeMedidas){
        return this.storage.set('unidadesDeMedidas', unidadesDeMedidas)
    }

    setTIPODOCUMENTO(tiposDocumento){
        return this.storage.set('tiposDocumento',tiposDocumento)
    }


    setGRUPOACATEGORIA(grupoCategoria){
        return this.storage.set('grupoCategoria',grupoCategoria)
    }

    setSectores(sectores){
        return this.storage.set('sectores',sectores )
    }


    setMermas(mermas:any[]){
        for(let i = 0; i < mermas.length; i++){
            for(let j = 0; j < this.localMermas.length; j++){
                console.log(mermas[i].idProveedor, this.localMermas[j].idProveedor)
                if(mermas[i].idProveedor == this.localMermas[j].idProveedor){
                    this.localMermas[j].remoteId = mermas[i].remoteId
                }
            }
        }

        console.log(MERMAS_KEY)

        this.storage.set(MERMAS_KEY, mermas)
    }


     setMermas_2(categorias:any[]){

        for(let i = 0; i < categorias.length; i++){

            for(let j = 0; j < this.localMermas_2.length; j++){
                
                console.log(categorias[i].idCategoria, this.localMermas_2[j].idCategoria)

                if(categorias[i].idCategoria == this.localMermas_2[j].idCategoria){
                    this.localMermas_2[j].remoteId = categorias[i].remoteId
                }
            }
        }

        console.log('--------categorias----------')

        this.storage.set('categorias', categorias )
    }

    setMermas_3(compra:any[]){

        for(let i = 0; i < compra.length; i++){

            for(let j = 0; j < this.localMermas_3.length; j++){
                
                console.log(compra[i].idCompra, this.localMermas_3[j].idCompra)

                if(compra[i].idCompra == this.localMermas_3[j].idCompra){
                    this.localMermas_3[j].locationId = compra[i].locationId
                }
            }
        }

        console.log('--------Compras----------')

        this.storage.set('compra', compra )
    }
    getRemoteMermas(username){
        let promise = new Promise((resolve, reject) => {

            this.http.get<MermasResponse>(MERMAS_URL, {
                params: {'usuarioId': username}
            }).subscribe((data) => {
                let mermas = []
               for (let obj of data.mermas){
                   mermas.push(this.parseMerma(obj))
               }
               this.storage.set(MERMAS_KEY,mermas)
                resolve(true)
            }, error => {
                console.log(error)
                reject(error)
            })
        })
        return promise
    }


parseCategoria(categorias):categoriaMixed{
    let categoriasMixed = new categoriaMixed()
  
    categoriasMixed.inactivo = categorias.inactivo
    categoriasMixed.remoteId = categorias.remoteId
    categoriasMixed.fechaInsercion=categorias.fechaInsercion
    categoriasMixed.localId=categorias.fechaModificacion
    categoriasMixed.idCategoria=+categorias.id
    categoriasMixed.nombre=categorias.nombre
    categorias.grupoArticulo=categorias.grupoArticulo


    categoriasMixed= getObjectById(this.allData.grupoCategorias, categorias.grupoarticuloid)
    categorias.grupoarticuloid = categorias.grupoarticuloid
   


    categoriasMixed.usuario = getUserByUsername(this.allData.usuarios, categorias.usuarioId)
    categoriasMixed.usuarioId = categorias.usuarioId

    
  


    return categoriasMixed

}

    parseMerma(categoria): MermaMixed{
        let categoriaMixed = new MermaMixed()
        categoriaMixed.idProveedor = +categoria.id
        categoriaMixed.razonSocial=categoria.razonSocial
        categoriaMixed.nroDocumento=categoria.nroDocumento
        categoriaMixed.direccion=categoria.direccion
        categoriaMixed.celular=categoria.celular
        categoriaMixed.mail=categoria.mail
        categoriaMixed.inactivo = categoria.inactivo
        categoriaMixed.remoteId = categoria.remoteId
     
        categoria.grupoArticulo=categoria.grupoArticulo


      


        

        categoriaMixed.tipoDocumento = getObjectById(this.allData.tipodocumentos, categoria.tipodocumentoid)
        categoria.tipodocumentoid = categoria.tipodocumentoid
       
      

   
        return categoriaMixed

    }





}
