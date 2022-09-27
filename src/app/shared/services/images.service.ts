import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  public imagenes: any[] = [];
  private listaImagenesSubject: BehaviorSubject<any>;
  public listaImagenes: Observable<any>;

  public imagenesAzure: any[] = [];
  private listaImagenesAzureSubject: BehaviorSubject<any>;
  public listaImagenesAzure: Observable<any>;

  constructor() { 
    this.listaImagenesSubject = new BehaviorSubject<any>(this.imagenes);
    this.listaImagenes = this.listaImagenesSubject.asObservable();
    this.listaImagenesAzureSubject = new BehaviorSubject<any>(this.imagenesAzure);
    this.listaImagenesAzure = this.listaImagenesAzureSubject.asObservable();
  }

  public get listaImagenesValue(): any {
    return this.listaImagenesSubject.value;
  }

  public get listaImagenesAzureValue(): any {
    return this.listaImagenesAzureSubject.value;
  }

  public addImagenes(listaImagenes, listaImagenesAzure){
    console.log("Estoy anadiendo");
    this.imagenes = listaImagenes
    this.imagenesAzure = listaImagenesAzure
    this.listaImagenesSubject.next(this.imagenes);
    this.listaImagenesAzureSubject.next(this.imagenesAzure);
  }

  public deleteImagenes(index){
    console.log("Estoy eliminando");
    this.imagenes.splice(index, 1);
    this.imagenesAzure.splice(index, 1);
    this.listaImagenesSubject.next(this.imagenes);
    this.listaImagenesAzureSubject.next(this.imagenesAzure);

  }

  clearImages(){
    console.log("Estoy limpiando todo");
    this.imagenes = [];
    this.imagenesAzure = [];
    this.listaImagenesSubject.next(this.imagenes);
    this.listaImagenesAzureSubject.next(this.imagenesAzure);
  }
  

  
}
