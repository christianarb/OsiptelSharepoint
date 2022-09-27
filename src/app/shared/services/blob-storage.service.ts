import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, Subscriber } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import {
  BLOB_STORAGE_TOKEN,
  IBlobService,
  IBlobStorage,
  ISasToken,
  ISpeedSummary
} from '../interfaces/IAzureStorage';

import { sp } from '@pnp/sp';
import { Web } from '@pnp/sp/webs';
import { IList } from '@pnp/sp/lists';
import { Item, IItemAddResult, IItemUpdateResult, PagedItemCollection } from '@pnp/sp/items';


@Injectable({
  providedIn: 'root'
})
export class BlobStorageService {
  private observerError$ = new Subject<any>();
  private dataFile: any = [];
  private data: any = [];


  constructor(@Inject(BLOB_STORAGE_TOKEN) private blobStorage: IBlobStorage) {
  }

  getError$(): Observable<any> {
    return this.observerError$.asObservable();
  }


  addDataFileImages(file: any){
    this.data.push(file);
  }

  getDataFileImages(){
    return this.data;
  }

  addFileImages(file: any){
    this.dataFile.push(file);
  }

  getFileImages(){
    return this.dataFile;
  }

  deleteImage(index: number): void {
    this.data.splice(index, 1);
    this.dataFile.splice(index, 1);
  }

  clearImage(){
    this.data = [];
    this.dataFile = []
  }

  uploadToBlobStorage(sasToken: ISasToken, file: File): Observable<number> {
    const customBlockSize = this.getBlockSize(file);
    const options = { blockSize: customBlockSize };
    const blobService = this.createBlobService(sasToken.storageAccessToken, sasToken.storageUri);

    blobService.singleBlobPutThresholdInBytes = customBlockSize;

    return this.uploadFile(blobService, sasToken, file, options);
  }

  private createBlobService(accessToken: string, blobUri: string): IBlobService {
    return this.blobStorage
      .createBlobServiceWithSas(blobUri, accessToken)
      .withFilter(new this.blobStorage.ExponentialRetryPolicyFilter());
  }

  private uploadFile(
    blobService: IBlobService,
    accessToken: ISasToken,
    file: File,
    options: { blockSize: number }
  ): Observable<number> {
    return new Observable<number>(observer => {
      const speedSummary = blobService.createBlockBlobFromBrowserFile(
        accessToken.container,
        accessToken.filename,
        file,
        options,
        error => {
          console.log(error);
          this.callback(error, observer)
        }
      );
      speedSummary.on('progress', () => this.getProgress(speedSummary, observer));
      this.observerError$.next({name:"No hay error",fileImage:file});
    }).pipe(
      startWith(0),
      distinctUntilChanged()
    );
  }

 
  

  private getProgress(speedSummary: ISpeedSummary, observer: Subscriber<number>): void {
    const progress = parseInt(speedSummary.getCompletePercent(2), 10);
    observer.next(progress === 100 ? 99 : progress);
  }

  private callback(error: any, observer: Subscriber<number>): void {
    if (error) {
      observer.error(error);
      this.observerError$.next(error);
    } else {
      observer.next(100);
      observer.complete();
    }
  }

  private getBlockSize(file: File): number {
    const size32Mb = 1024 * 1024 * 32;
    const size4Mb = 1024 * 1024 * 4;
    const size512Kb = 1024 * 512;

    return file.size > size32Mb ? size4Mb : size512Kb;
  }

 async grabarBlobStorageSP(idSolicitud:string,urlBlobStorage:string,ImageName:string, Name: string, RandomId: string,withImage: string, heightImage: string): Promise<IItemAddResult> {

  console.log(idSolicitud," ",urlBlobStorage," ",ImageName," ", Name," ", RandomId," ",withImage," ", heightImage," ");
  
    const iar: IItemAddResult = await sp.web.lists.getByTitle("MaestroBlobStorage").items.add({
        Title: idSolicitud,
        UrlBlobImage: urlBlobStorage,
        InternalName:  ImageName,
        name: Name,
        RandomId: RandomId,
        WithImage: withImage,
        HeightImage: heightImage
      });

      console.log(iar);
      

      //{const allItems: any[] = await sp.web.lists.getByTitle("MaestroBlobStorage").items.filter("Title eq '1'").getAll();


      //let list = sp.web.lists.getByTitle("MaestroBlobStorage");

      //


      return iar;
  }
  
  async obtenerBlobStorageSP(idFormularioSolicitud: number): Promise<any[]>{
    const allItems: any[] = await sp.web.lists.getByTitle("MaestroBlobStorage").items.filter(`Title eq ${idFormularioSolicitud.toString()}`).getAll()
    // console.log(allItems);
    return allItems
  }

  async deleteBlobStorageSP(id: number): Promise<any>{
    let list = sp.web.lists.getByTitle("MaestroBlobStorage");
    await list.items.getById(id).delete()
    return null;
  }

}
