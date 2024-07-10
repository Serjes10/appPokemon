import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ArchivoService } from 'src/app/services/archivo.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {

  public imgBase64: string = '';
  public nameImagen: string = '';
  public profileForm: FormGroup;
  public hobbyArray: string[] = ['Jugar Fútbol', 'Jugar Basquetball', 'Jugar Tennis', 'Jugar Voleibol', 'Jugar Fifa',
    'Jugar Videojuegos'
  ];
  public fechaActual = new Date();
  public edad:number = 0;
  public mask = '00000000-0';
  public titleDocument = 'Documento';
  public profileUser:any;

  constructor(public archivoService: ArchivoService, public toast:ToastrService, private datePipe:DatePipe, public router:Router) {
    this.profileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      hobby: new FormControl(''),
      age: new FormControl('', [Validators.required]),
      numDocument: new FormControl('', [Validators.required]),
      img: new FormControl(''),
      nameImg: new FormControl(''),
      ageNumber: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.profileUser = JSON.parse(localStorage.getItem("user_info") || '');

    if(this.profileUser){
      this.profileForm = new FormGroup({
        name: new FormControl(this.profileUser?.name, [Validators.required]),
        hobby: new FormControl(this.profileUser?.hobby),
        age: new FormControl(this.profileUser?.age, [Validators.required]),
        numDocument: new FormControl(this.profileUser?.numDocument || '', [Validators.required]),
        img: new FormControl(this.profileUser?.img || ''),
        nameImg: new FormControl(this.profileUser?.nameImg || ''),
        ageNumber: new FormControl(this.profileUser?.ageNumber || '')
      });

      this.imgBase64 = this.profileUser.img;
      this.nameImagen = this.profileUser.nameImg;
    }

    this.profileForm.get('age')?.valueChanges.subscribe((result)=>{
      this.edad = this.calculateAge(result);
      this.profileForm.get('ageNumber')?.setValue(this.edad);
      if(this.edad < 18){
        this.profileForm.get('numDocument')?.clearValidators();
        this.profileForm.get('numDocument')?.updateValueAndValidity();
        this.titleDocument = 'Carnet de Minoridad';
        this.mask = '0000-000000'
      }else{
        this.profileForm.get('numDocument')?.setValidators([Validators.required]);
        this.profileForm.get('numDocument')?.updateValueAndValidity();
        this.titleDocument = 'Documento';
        this.mask = '00000000-0';
      }
    });
  }

  onFileSelect(event: any) {
    this.archivoService.readImage(event, (resultLectura) => {
      this.imgBase64 = resultLectura.base64;
      this.nameImagen = resultLectura.nameFile;
    });
  }

  saveProfile(){
    if(this.profileForm.invalid){
      this.toast.warning("Es requerido ingresar los campos indicados como obligatorios");
      this.profileForm.markAllAsTouched();
      return;
    }

    this.profileForm.get('img')?.setValue(this.imgBase64);
    this.profileForm.get('nameImg')?.setValue(this.nameImagen);

    localStorage.setItem("user_info", JSON.stringify(this.profileForm.value));
    this.toast.success("Se guardaron los datos con éxito");

    this.router.navigateByUrl('/app/entrenador/equipo-pokemon');
  }

  calculateAge(birthdate: Date): number {
    const today = new Date();
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
      age--;
    }
    return age;
  }
}
