import {Injectable} from "@angular/core";
import {ToastController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {Motivo, Producto, Sector, Tipo, Turno, UnidadDeMedida, Usuario, Tipodocumento, Grupoarticulo} from "../models/merma.model";

export const USUARIOS_KEY = 'usuarios'
export const USUARIO_KEY = 'usuario'
export const PRODUCTOS_KEY = 'productos'
export const TIPOS_KEY = 'tipos'
export const TURNOS_KEY = ''
export const TIPODOCUMENTO_KEY = 'tiposDocumento'
export const GRUPOARTICULO_KEY = 'grupoCategoria'

export const MOTIVOS_KEY = 'motivos'
export const UNIDADESDEMEDIDAS_KEY = 'unidadesDeMedidas'
export const SECTORES_KEY = 'sectores'


@Injectable({
    providedIn: 'root'
})
export class GlobalService {

    constructor(private toastCtrl: ToastController,
                private storage: Storage) {

    }


    getProductos():Promise<Producto[]>{
        return this.storage.get(PRODUCTOS_KEY)
    }

    getMotivos():Promise<Motivo[]>{
        return this.storage.get(MOTIVOS_KEY)
    }

    getUnidadesDeMedidas():Promise<UnidadDeMedida[]>{
        return this.storage.get(UNIDADESDEMEDIDAS_KEY)
    }

    getSectores():Promise<Sector[]>{
        return this.storage.get(SECTORES_KEY)
    }

    getTurnos():Promise<Turno[]>{
        return this.storage.get(TURNOS_KEY)
    }
    getTIPODOCUMENTO():Promise<Tipodocumento[]>{
        return this.storage.get(TIPODOCUMENTO_KEY)
    }
    getGRUPOARTICULO():Promise<Grupoarticulo[]>{
        return this.storage.get(GRUPOARTICULO_KEY)
    }


    getTipos():Promise<Tipo[]>{
        return this.storage.get(TIPOS_KEY)
    }

    getUsuarios():Promise<Usuario[]>{
       return this.storage.get(USUARIOS_KEY)
    }

    setCurrentUser(usuario:Usuario){
        return this.storage.set(USUARIO_KEY, usuario)
    }

    getCurrentUser():Promise<Usuario>{
        return this.storage.get(USUARIO_KEY)
    }

    presentToast(message) {
        console.log("Toast", message)
        this.toastCtrl.create({
            message: message,
            duration: 3000,
            position: 'top'
        });

    }

    logout(){
        return this.storage.remove(USUARIO_KEY)
    }





}
