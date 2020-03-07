import {Merma, MermaMixed, Usuario} from "../models/merma.model";

export const DATA_LIST = {
    "categorias":[{"idCategoria":"1","nombre":"Servicio","GrupoCategoria_idGrupoCategoria":"0","localId":null},
    {"idCategoria":"2","nombre":"Corte","GrupoCategoria_idGrupoCategoria":"0","localId":null},
    {"idCategoria":"3","nombre":"CategoriadePrueba","GrupoCategoria_idGrupoCategoria":"0","localId":null},
    {"idCategoria":"4","nombre":"new categoria  2123","GrupoCategoria_idGrupoCategoria":"1","localId":null}],
    
    "usuarios":[{"id":"1","username":"admin","password":"8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918"},
    {"id":"30","username":"Carmen","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"},
    {"id":"31","username":"Oscar","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"},
    {"id":"32","username":"Yanni","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"},
    {"id":"33","username":"Sole","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"},
    {"id":"34","username":"Yanni2","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"},
    {"id":"35","username":"jraz","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"},
    {"id":"36","username":"Cajero","password":"5994471abb01112afcc18159f6cc74b4f511b99806da59b3caf5a9c173cacfc5"}],
    
    "proveedores":[{"idProveedor":"1",
    "razonSocial":"PARESA S.A",
    "tipoDocumento":"1","nroDocumento":"123456-0",
    "direccion":"\u00d1EMBY","celular":"00",
    "mail":"juniorroni.vazquez95@gmail.com","localId":null},
    {"idProveedor":"2","razonSocial":"JUNIOR RODOLFO VAZQUEZ LOPEZ","tipoDocumento":"2","nroDocumento":"4831750-0","direccion":"PARAGUARI","celular":"0995726478","mail":"jrvl91@gmail.com","localId":null},
    {"idProveedor":"3","razonSocial":"JOSE JOSE","tipoDocumento":"1","nroDocumento":"123456-8","direccion":"LIMPIO","celular":"0981123456","mail":"1@gmai.com","localId":null}],
    "tiposDocumento":[{"id":1,"nombre":"DOCUMENTO EXTRANJERO"},{"id":2,"nombre":"CEDULA DE IDENTIDAD"},
    {"id":3,"nombre":"PASAPORTE"}],
    
    "grupoArticulo":[{"id":1,"nombre":"GRUPO PRINCIPAL"},
    {"id":2,"nombre":"GRPO B"},{"id":3,"nombre":"GRUPO GENERAL"}]

}



export const MermaExample = <MermaMixed> {
   
    
    direccion:"",
    celular:"",
    mail:"",
    inactivo: false,
    remoteId: null

   
    

};
