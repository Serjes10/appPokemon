import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerfilComponent } from './perfil/perfil.component';
import { EquipoPokemonComponent } from './equipo-pokemon/equipo-pokemon.component';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';

const routes: Routes = [
  {
    path: 'perfil',
    component: PerfilComponent
  },
  {
    path: 'equipo-pokemon',
    component: EquipoPokemonComponent
  },
  {
    path: 'inicio',
    component: HomePokemonComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntrenadorRoutingModule { }
