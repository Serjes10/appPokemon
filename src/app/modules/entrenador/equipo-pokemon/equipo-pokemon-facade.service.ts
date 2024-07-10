import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EquipoPokemonFacadeService {

  constructor(public http:HttpClient) {

  }

  getPokemon(generation:string,callback:any){
    this.http.get(`https://pokeapi.co/api/v2/generation/${generation}`).subscribe((result)=>{
      if(result){
        callback(result);
      }
    });
  }

  getInfoPokemon(nombre:string, callback:any){
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${nombre}`).subscribe((result)=>{
      if(result){
        callback(result);
      }
    });
  }


}
