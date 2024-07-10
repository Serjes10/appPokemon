import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { EquipoPokemonFacadeService } from '../equipo-pokemon/equipo-pokemon-facade.service';

@Component({
  selector: 'app-home-pokemon',
  templateUrl: './home-pokemon.component.html',
  styleUrls: ['./home-pokemon.component.scss']
})
export class HomePokemonComponent {

  public profile_info:any = null;
  public equipoPokemon:any[] = [];
  public ageNumber:number = 0;
  public searchForm = new FormControl('');

  constructor(public router:Router, public equipoPokemonService:EquipoPokemonFacadeService){
    if(localStorage.getItem("user_info")){
      this.profile_info = JSON.parse( localStorage.getItem("user_info") || '');
    }else{
      this.router.navigateByUrl('/app/entrenador/perfil')
    }

    if(localStorage.getItem("equipo_pokemon") != null && localStorage.getItem("equipo_pokemon") != ''){
      this.equipoPokemon = JSON.parse(localStorage.getItem("equipo_pokemon") || '');
    }else{
      this.router.navigateByUrl('/app/entrenador/equipo-pokemon')
    }

    this.equipoPokemon.forEach(async (result:any)=>{
      console.log(result);
      result.info = await this.obtenerInfoPokemon(result.name);
    });

    console.log(this.equipoPokemon);
  }



  obtenerInfoPokemon(params:string) {
    return new Promise((resolve, reject) => {
      this.equipoPokemonService.getInfoPokemon(params, (result:any) => {
        if (result) {
          resolve(result);
        } else {
          resolve(null);
        }
      })
    });
  }
}
