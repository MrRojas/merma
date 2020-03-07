import {Injectable} from "@angular/core";
import {Merma, MermaMixed, Producto, Usuario,Tipodocumento, categoriaMixed} from "../models/merma.model";
import {Storage} from "@ionic/storage";

export const MERMAS_KEY = 'proveedores'

export const MERMAS1_KEY = 'categorias'
@Injectable({
    providedIn: 'root'
})
export class MermaService {

    constructor(private storage: Storage ) {

    }

    addMerma(merma:MermaMixed): Promise<any>{
        merma.idProveedor =  this.formatId( Date.now() )
        return this.storage.get(MERMAS_KEY).then(mermas=>{
            if (!mermas){

                return this.storage.set(MERMAS_KEY, [merma])
            }else{
                mermas.push(merma)
                return this.storage.set(MERMAS_KEY, mermas)
            }
        })

    }

    addCompra(compra): Promise<any>{

        return this.storage.get("compra").then(compras=>{
            if (!compras){

                return this.storage.set('compra', [compra])
            }else{
                compras.push(compra)
                return this.storage.set('compra', compras)
            }
        })

    }


    addcategoria(categoria:categoriaMixed): Promise<any>{
        categoria.idCategoria = this.formatId(Date.now())

        return this.storage.get(MERMAS1_KEY).then(categorias=>{
            if (!categorias){

                return this.storage.set(MERMAS1_KEY, [categoria])
            }else{
                categorias.push(categoria)
                return this.storage.set(MERMAS1_KEY, categorias)
            }
        })

    }


   formatId(id){

     let valor = id.toString()
     let x = "" ; 

     for( let i = 0 ;  i <= 9; i++ )  
         x += valor[i] ;

     return parseInt(x);
     
       }


    getCategoria(){

         return   this.storage.get(MERMAS1_KEY)
       
    }

    getCompra(){

         return   this.storage.get('compra')
       
    }

   deleteCategoria(id: number){
        return this.storage.get(MERMAS1_KEY).then(categoria=>{  
            if(!categoria || categoria.length == 0){
                return null;
            }
            let newMermas = []
            for(let m of categoria){
                if (m.idCategoria !== id){
                    newMermas.push(m)
                }
            }
            return this.storage.set(MERMAS1_KEY, newMermas)
        })
    }


   deleteCompra(id: number){
        return this.storage.get('compra').then(compra=>{  
            if(!compra || compra.length == 0){
                return null;
            }
            let newMermas = []
            for(let m of compra){
                if (m.idCompra !== id){
                    newMermas.push(m)
                }
            }
            return this.storage.set('compra', newMermas)
        })
    }

     deleteProveedor(id: number){
        return this.storage.get(MERMAS_KEY).then(proveedor=>{  
            if(!proveedor || proveedor.length == 0){
                return null;
            }
            let newMermas = []
            for(let m of proveedor){
                if (m.idProveedor !== id){
                    newMermas.push(m)
                }
            }
            return this.storage.set(MERMAS1_KEY, newMermas)
        })
    }

    deleteMermas(){
        this.storage.set(MERMAS_KEY,[])
    }

    getMermas():Promise<MermaMixed[]>{
       return this.storage.get(MERMAS_KEY)
    }

    getMerma(id: number):Promise<MermaMixed>{
        return this.storage.get(MERMAS_KEY).then(mermas=>{
            for(let merma of mermas){
                console.log(+merma.idProveedor,+id)
                if (+merma.idProveedor == +id){
                    return merma
                }
            }
            return null

        })
    }

    updateMerma(merma: MermaMixed):Promise<any>{
        return this.storage.get(MERMAS_KEY).then(mermas=>{
            if(!mermas || mermas.length == 0){
                return null
            }
            let newMermas: MermaMixed[] = []
            for(let m of mermas){
                if (m.idProveedor === merma.idProveedor){
                    console.log(m)
                    console.log(merma)
                    if (merma.inactivo && !m.inactivo){
                    }
                    newMermas.push(merma)
                }else{
                    newMermas.push(m)
                }
            }

            return this.storage.set(MERMAS_KEY, newMermas)
        })

    }

   
      updateCompra(comp_params):Promise<any>{
        return this.storage.get('compra').then(compra_e=>{
            if(!compra_e || compra_e.length == 0){
                console.log("Nulo")
                return null
            }
            let compra_new_tmp= []
            for(let m of compra_e){

                if (m.idCompra == comp_params.idCompra){
                    console.log("entro aqui")
                    comp_params.fechaInsercion = new Date().toISOString()
                     
                    compra_new_tmp.push(comp_params)
                }else{
                    compra_new_tmp.push(m)
                }
            }
            console.log(compra_new_tmp)
            return this.storage.set('compra', compra_new_tmp)
        })

    }

    updatecategoria(categoria: categoriaMixed):Promise<any>{
        return this.storage.get(MERMAS1_KEY).then(categorias=>{
            if(!categorias || categorias.length == 0){
                console.log("Nulo")
                return null
            }
            let newMermas: categoriaMixed[] = []
            for(let m of categorias){

                if (m.idCategoria == categoria.idCategoria){
                    console.log("entro aqui")
                    categoria.fechaInsercion = new Date().toISOString()
                     
                    newMermas.push(categoria)
                }else{
                    newMermas.push(m)
                }
            }
            console.log(newMermas)
            return this.storage.set(MERMAS1_KEY, newMermas)
        })

    }
    deleteMerma(id: number):Promise<MermaMixed>{
        return this.storage.get(MERMAS_KEY).then(mermas=>{  
            if(!mermas || mermas.length == 0){
                return null
            }
            let newMermas: MermaMixed[] = []
            for(let m of mermas){
                if (m.id !== id){
                    newMermas.push(m)
                }
            }
            return this.storage.set(MERMAS_KEY, newMermas)
        })
    }





}
