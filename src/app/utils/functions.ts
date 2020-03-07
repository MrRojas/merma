import {Producto, Sector, Usuario} from "../models/merma.model";


export function getUserByUsername(users: Usuario[], username) {
    for(let obj of users){
        if(obj.username === username){
            return obj
        }
    }
    return null
}

export function getObjectById(objects, id:number) {
    for(let obj of objects){
        if(obj.id === id){
            return obj
        }
    }
    return null
}
