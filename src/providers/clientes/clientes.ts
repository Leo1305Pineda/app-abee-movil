import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralService } from './../general.service'; 

@Injectable()
export class ClientesProvider extends GeneralService {

  constructor(protected http: HttpClient) {
    super(http,'cliente','s')
  }

  getAll(){
    return super.getAll();
  }

}