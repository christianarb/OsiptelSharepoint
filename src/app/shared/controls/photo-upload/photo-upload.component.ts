import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { LogLevel } from '@pnp/logging';
import { BehaviorSubject, from, Observable, Subscription } from 'rxjs';
import { SafeSubscriber } from 'rxjs/internal/Subscriber';
import { combineAll, map } from 'rxjs/operators';
import { ISasToken } from '../../interfaces/IAzureStorage';
import { BlobStorageService } from '../../services/blob-storage.service';
import { FormularioAT } from 'src/app/shared/pages/formularioAT';
import { IDialogData } from '../modal/modal.component';
import { ModalType } from '../../models/fisics/State';
import { MatDialog } from '@angular/material/dialog';
import { THIS_EXPR, ThrowStmt } from '@angular/compiler/src/output/output_ast';
import { ImagesService } from '../../services/images.service';



interface IUploadProgress {
  filename: string;
  progress: number;
}

interface IUimagen {
  name: string;
  src: number;
}


@Component({
  selector: 'app-photo-upload',
  templateUrl: './photo-upload.component.html',
  styleUrls: ['./photo-upload.component.scss']
})
export class PhotoUploadComponent {
  @Input() chooseLabel = 'Choose';
  @Input() width;
  @Input() height;
  @ViewChild('photoUpload') photoUpload: ElementRef;

  uploadProgress$: Observable<IUploadProgress[]>;
  filesSelected = false;
  
  public listaImagenes: any[] = [];
  public listaImagenesAzure: any[] = [];

  public dialog: MatDialog;
  // uploadProgress$: Observable<IUploadProgress[]>;
  // filesSelected = false;
  showFiles = true;
  data: any = [];
  dataFile: any = [];
  displayedColumns: string[] = ['file', 'name', 'tamanio', 'permission', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>(this.data);
  mostrarTabla400X400: boolean = false;
  mostrarTabla200X200: boolean = false;
  errorUploadFiles$: Observable<any>;
  suscripcionErrorUploadFiles: Subscription;

  constructor(
    private blobStorage: BlobStorageService,
    private imagesService: ImagesService
  ) { }

  onFileSelected(event): void {
    console.log('Entre por primera vez');
    
    const listaImagenes: any[] = [];
    const imagesPreview: any[] = event.dataTransfer ? event.dataTransfer.files : event.target.files;
    
    for (let i = 0; i < imagesPreview.length; i++) {
      const img = imagesPreview[i];
      let formato: any[] = img['name'].split('.');
      let formatoMiniscula = formato[1].toLowerCase();
      
      if( formatoMiniscula == 'jpg' || formatoMiniscula =='png' || formatoMiniscula =='jpeg' || formatoMiniscula =='gif' || formatoMiniscula =='svg' || formatoMiniscula =='jfif'){
        var imgAzure = imagesPreview[i];
        const reader = new FileReader();
        reader.readAsDataURL(img as Blob);
        reader.onload = (e) => {
          var image = new Image();
          var height = 0;
          var width = 0;
          var numRadom = Math.floor(100000 + Math.random() * 900000);
          image.src = e.target.result as string;
          image.onload = (i) => {
              height = i["path"][0].height;
              width = i["path"][0].width;
              console.log(width," ", height);
              
              let ruta = reader.result as string;
              var element = {
                internalName: `${formato[0]}-${numRadom}.${formato[1]}`,
                ramdomId: numRadom,
                name: img['name'],
                src: ruta,
                width: width,
                height: height
              }
              if ((width == 200 && height == 200) || (width == 400 && height == 400)) {
                element["permission"] = "Tamaño permitido";
              } else {
                element["permission"] = "Tamaño no permitido";
              }
              this.listaImagenes.push(element);
              this.listaImagenesAzure.push(imgAzure);
              console.log(this.listaImagenes);
              this.imagesService.addImagenes(this.listaImagenes, this.listaImagenesAzure);
              this.mostrarTabla200X200 = true;
              console.log(this.imagesService.listaImagenesValue);
              this.dataSource = new MatTableDataSource<PeriodicElement>(this.imagesService.listaImagenesValue);
          }
        }
      }
    }

    
    

  }


  eliminarAdjunto(index: number): void {
    this.imagesService.deleteImagenes(index);
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.imagesService.listaImagenesValue);
  }

  onClick(): void {
    if (this.photoUpload) {
      this.photoUpload.nativeElement.click();
    }
  }

}

export interface PeriodicElement {
  name: string;
  src: string;
  width: number;
  height: number;
  valor: string;
}


