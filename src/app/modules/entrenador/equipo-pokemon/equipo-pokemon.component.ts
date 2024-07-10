import { Component } from '@angular/core';
import { EquipoPokemonFacadeService } from './equipo-pokemon-facade.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-equipo-pokemon',
  templateUrl: './equipo-pokemon.component.html',
  styleUrls: ['./equipo-pokemon.component.scss']
})
export class EquipoPokemonComponent {

  public pokemonesForm:any = new FormArray([]);
  public profile_info:any = null;
  public ageNumber:number = 0;
  public searchForm = new FormControl('');
  public equipoPokemon:any[] = [];

  constructor(public equipoPokemonService:EquipoPokemonFacadeService, public fb:FormBuilder, public toast:ToastrService, public router:Router){

    if(localStorage.getItem("user_info")){
      this.profile_info = JSON.parse( localStorage.getItem("user_info") || '');
    }else{
      this.router.navigateByUrl('/app/entrenador/perfil')
    }

    this.equipoPokemon = JSON.parse(localStorage.getItem("equipo_pokemon") || '');

    this.equipoPokemonService.getPokemon('1', (result:any)=>{
      this.pokemonesForm = this.construirFormulario(result.pokemon_species);

      if(this.equipoPokemon != null ){
        this.equipoPokemon.forEach((pokemon)=>{
          this.pokemonesForm.controls.forEach((pokemonForm:any) => {
            if(pokemonForm.get('name').value === pokemon.name){
              pokemonForm.get('seleccionado').setValue(true);
            }
          });
        })
      }
    })

  }

  construirFormulario(data: any[]) {
    let datosFinales:any = new FormArray([]);
    data.forEach((result:any) => {
      const formGroup:any = {};
      for (const item in result) {
        formGroup[item] = [result[item]];
        formGroup['seleccionado'] = [false];
        let segment = result['url'].split('/');
        formGroup['id'] = segment[segment.length - 2];
      }
      datosFinales.push(this.fb.group(formGroup));
    })

    return datosFinales;
  }

  seleccionaPokemon(item:FormGroup){
    item.get('seleccionado')?.setValue(!item.value.seleccionado)
  }

  guardarEquipo(){
    let pokemones:any[] =  this.pokemonesForm.controls.filter((control:FormGroup) => control.get('seleccionado')?.value).map((control:FormGroup) => control.value);

    if(pokemones.length === 0){
      this.toast.warning('Es requerido seleccionar al menos 3 pokemon');
      return;
    }

    localStorage.setItem("equipo_pokemon", JSON.stringify(pokemones));
    this.router.navigateByUrl('/app/entrenador/inicio')
  }

}
