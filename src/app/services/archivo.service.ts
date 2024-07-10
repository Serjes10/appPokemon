import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

interface readFileResponse {
  file: any;
  nameFile: string;
  base64: string;
  extesion: string;
};

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(public toast:ToastrService) { }

  readImage(event:any, callback: (readInfo: readFileResponse) => void) {
    let file:any;
    let nameFile:any;
    let base64;

    const allowed_typesImages = ["image/png", "image/jpeg", "image/jpg"];

    if (event.target.files.length === 0) {
      this.toast.warning('Es requerido seleccionar un archivo', '');
      return;
    } else {
      file = event.target.files[0];
    }

    if ((file.size / 1024 / 1024) > 5) {
      this.toast.warning('El tamaño maximo del archivo es mayor a 5mb', '');
      return;
    }

    //Metodo para la carga de imagenes
    if (allowed_typesImages.includes(file.type)) {

      nameFile = event.target.files[0].name;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          base64 = e.target.result;
          callback({ base64: base64, file: file, nameFile: nameFile, extesion: nameFile.slice(-3) });
        };
      };

      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.toast.warning('El formato del archivo no es valido', '');
      return;
    }
  }
}
