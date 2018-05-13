import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class GeneralService {

  //private urlBaseApi = "http://localhost:5000";
  private urlBaseApi = "https://api-abee.herokuapp.com";

  constructor(protected http: HttpClient, protected urlModulo: String, protected plural: String) { }

  public getAll(): Observable<any> {
  	return this.http.get(this.getUrl());
  }

  public getAllTipo(id): Observable<any> {
    return this.http.get(this.getUrlTipo(id));
  }

  public get(id): Observable<any> {
    return this.http.get(this.getUrlById(id));
  }

  public create (data): Observable<any> {
    return this.http.post(this.getUrl(),data);
  }

  public createDetalle (data): Observable<any> {
    return this.http.post(this.getUrl()+'/detalle',data);
  }

  public delete(id): Observable<any> {
		return this.http.delete(this.getUrlById(id));  	
  }

	public update(id,data): Observable<any> {
		return  this.http.put(this.getUrlById(id),data); 	
	}

  public getUrl(){
    return `${this.urlBaseApi}/${this.urlModulo}${this.plural}`;     
  }

  public getUrlById(id: any){
    return `${this.urlBaseApi}/${this.urlModulo}/${id}`;     
  }

  public getUrlTipo(id: any){
    return `${this.urlBaseApi}/${this.urlModulo}${this.plural}_tipo/${id}`;     
  }
}
