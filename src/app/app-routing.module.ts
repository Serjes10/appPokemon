import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContenedorPrincipalComponent } from './layout/contenedor-principal/contenedor-principal.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/entrenador/perfil',
    pathMatch: 'full',
  },
  {
    path: 'app',
    component: ContenedorPrincipalComponent,
    children: [
      {
        path: 'entrenador',
        loadChildren: () => import('./modules/entrenador/entrenador.module').then(m => m.EntrenadorModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
