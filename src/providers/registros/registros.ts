import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class RegistrosProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'registro','s')
  }

  create(body){
    return super.create(body);
  }

  createDetalle(body){
    return super.createDetalle(body);
  }  

}