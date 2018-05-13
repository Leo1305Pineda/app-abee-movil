import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class ProductoProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'producto','s')
  }

  getAll(){
    return super.getAll();
  }

}