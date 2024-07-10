import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFormReactivePipe } from './search-form-reactive.pipe';
import { SearchPipe } from './search.pipe';



@NgModule({
  declarations: [SearchFormReactivePipe, SearchPipe],
  imports: [
    CommonModule
  ],
  exports:[
    SearchFormReactivePipe,
    SearchPipe
  ]
})
export class CoreModule { }
