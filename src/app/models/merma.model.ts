export interface Deserializable {
    deserialize(input: any): this;
}

export class Usuario {
    id: number
    username: string
    password: string
}

export class Grupoarticulo 
{
    id: number
    nombre: string
}

export class Tipodocumento
{
    id: number
    nombre: string
}

export class Producto {
    id: number
    nombre: string
    codigoContenido: string
    codigoVacio: string
}

export class Sector {
    id: number
    nombre: string

   
}

export class UnidadDeMedida {
    id: number
    nombre: string

   
}

export class Turno {
    id: number
    nombre: string
}

export class Tipo {
    id: number
    nombre: string
}

export class Motivo {
    id: number
    nombre: string
}


export class proveedor {
    idProveedor: number
    tipodocumentoid:string
    razonSocial:string
    tipoDocumento:number
    nroDocumento:string
    direccion:string
    celular:string
    mail:string
    inactivo: boolean = false
    localId: number
    remoteId: number
 




}

export class categoria {
    idCategoria: number
    usuarioId: string
    grupoarticuloid:string
    GrupoCategoria_idGrupoCategoria: number
    nombre: string
    inactivo: boolean = false
    usuarioInsercion: string
    usuarioModificacion: string
    fechaInsercion: string
    localId: number
    remoteId: number
    limite: number 


}

export class Compra{     
    precio:number     
    cantidad:number    
    idCategoria:number
    img:string
    descripcion:string 
}


export class CompraHeader{
    idCompra:number    
    usuario:string    
    factura:string    
    fecha:string 
    idProveedor:number
    locationId:string
    detalle: any
    completado: boolean 
    status: any
}


export class Merma {
    id: number
    usuarioId: string
    productoId: number
    sectorId: number
    unidadDeMedidaId: number
    turnoId: number
    tipoId: number
    motivoId: number
    fecha: string
    codigoContenido: string
    codigoVacio: string
    observaciones: string
    cantidad: number
    inactivo: boolean = false
    fechaInactivo: string
    imagen: string
    remoteId: number
}

export class categoriaMixed extends categoria {
    usuario: Usuario
    grupoCategoria:Grupoarticulo

}

export class MermaMixed extends proveedor {
    usuario: Usuario
    tipodocumento: Tipodocumento
    grupoCategoria:Grupoarticulo

}

export class MermasResponse {
    mermas: MermaMixed[]
}

export class ConsultaResponse{
    productos: Producto[]
    usuarios: Usuario[]
    sectores: Sector[]
    unidadesDeMedida: UnidadDeMedida[]
    tipodocumentos: Tipodocumento[]
    tipos: Tipo[]
    grupoCategorias:Grupoarticulo[]
    motivos: Motivo[]

}
