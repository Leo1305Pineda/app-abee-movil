import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class MonedasProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'moneda','s')
  }

  getAll(){
    return super.getAll();
  }

}