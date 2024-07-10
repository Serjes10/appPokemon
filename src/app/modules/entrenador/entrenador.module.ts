import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntrenadorRoutingModule } from './entrenador-routing.module';
import { PerfilComponent } from './perfil/perfil.component';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { EquipoPokemonComponent } from './equipo-pokemon/equipo-pokemon.component';
import {ScrollingModule} from '@angular/cdk/scrolling';
import { CoreModule } from 'src/app/core/core.module';
import { HomePokemonComponent } from './home-pokemon/home-pokemon.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    PerfilComponent,
    EquipoPokemonComponent,
    HomePokemonComponent
  ],
  imports: [
    CommonModule,
    EntrenadorRoutingModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ScrollingModule,
    CoreModule,
    MatProgressBarModule

  ],
  providers: [provideNgxMask()]
})
export class EntrenadorModule { }
