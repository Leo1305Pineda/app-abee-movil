import { Component } 	 from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';

import { AppservicioProvider } 	from '../../providers/appservicio/appservicio';
import { ProductoProvider } 	from '../../providers/producto/producto';
import { MonedasProvider } 		from '../../providers/monedas/monedas';
import { ClientesProvider } 	from '../../providers/clientes/clientes';
import { RegistrosProvider } 	from '../../providers/registros/registros';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public selected;
  public editing = {}; 
  public columns: any;
  public rows: any =[];

  public TAG: string = 'HomePage ';
  segmento_registro_producto;
  esCredito='none';
  public registro:any = {
  	"moneda":{},
  	"cliente":{},
  	"contingencia":'no',
  	"exoneracion":'no',
  	"credito":'no',
  	"dias":0,
  	"descuento":0,
  	"observaciones":"",
  	"detalle_registro": this.rows
  };
  public productos: any[];
  public monedas: any[];
  public clientes: any[];
  public subTotal=0;
  public descuentoTotal=0;
  public total=0;

  constructor(
  	public navCtrl: NavController, 
  	public alertCtrl: AlertController,
  	public serviApp: AppservicioProvider,
  	public productoProv: ProductoProvider,
  	public monedasProv: MonedasProvider,
  	public clientesProv: ClientesProvider,
  	public registrosProv: RegistrosProvider) {
  	this.segmento_registro_producto = 'seg_productos';
  	this.columns = [
        { prop: 'id_producto' },
        { name: 'nombre' },
        { name: 'descripcion' },
        { name: 'precio' },
        { prop: 'cantidad' },
        { prop: 'total' }
     ];
  }

  ionViewDidLoad(): void
  {
    this.getProductos();
  }

  async getProductos():Promise<void>{
    this.serviApp.activarProgreso(true);
    await this.productoProv.getAll()
    .subscribe(
      (res)=>{
        this.productos = res['data'];
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    ); 
  }

  cargarProducto(producto){
  	console.log(this.TAG,'cargarProducto: '+ JSON.stringify(producto));
  	let enc: boolean = true;
  	for ( let i in this.rows ){
  		if (this.rows[i].id_producto == producto.id_producto) {
  			this.serviApp.alecrtMsg('El producto ya esta registrado en el detalle');
  			enc = false
  		}
  	}
  	if(enc){
  		this.rows.push({
  			id_producto: producto.id_producto,
  			nombre: producto.nombre,
        descripcion: producto.descripcion,
  			precio: producto.precio,
  			cantidad:1,
  			total: producto.precio
  		})
  	}
  	this.registro.detalle = this.rows;
  	this.calcutarTotales();
  	this.segmento_registro_producto = 'seg_registro';
  }

  showSegment(){
  	console.log(this.TAG,'showSegment');
  }

  seleccion(entidad,title) {
  	if (entidad == 'moneda') this.getMonedas(entidad,title);
    else if (entidad == 'cliente') this.getClientes(entidad,title);
  }

  async getMonedas(entidad,title): Promise<void> {
    this.serviApp.activarProgreso(true);
    await this.monedasProv.getAll()
      .subscribe(
      (res)=>{
        let objetos: any[] = res['data'];
        let myImputs:any =[];
        for ( let i in objetos ){
          let checkeded: boolean = false;
          let valor  = objetos[i].nombre + ' ' + objetos[i].simbolo;
		  let valor2 = this.registro.moneda.nombre + ' ' + this.registro.simbolo;
          if ( valor == valor2 ) 
          	checkeded = true;
          let data:any = { 
            type: 'radio',
            label: valor,
            value: objetos[i],
            checked: checkeded 
          };
          myImputs.push(data);
        }
        this.alertSelection(entidad,title,myImputs);
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  async getClientes(entidad,title): Promise<void> {
    this.serviApp.activarProgreso(true);
    await this.clientesProv.getAll()
      .subscribe(
      (res)=>{
        let objetos: any[] = res['data'];
        let myImputs:any =[];
        for ( let i in objetos ){
          let checkeded: boolean = false;
          let valor  = objetos[i].nombres;
		  let valor2 = this.registro.cliente.nombres;
          if ( valor == valor2 ) 
          	checkeded = true;
          let data:any = { 
            type: 'radio',
            label: valor,
            value: objetos[i],
            checked: checkeded 
          };
          myImputs.push(data);
        }
        this.alertSelection(entidad,title,myImputs);
        this.serviApp.activarProgreso(false);
      },
      (error)=>{
        this.serviApp.errorConeccion(error);
      }
    );  
  }

  alertSelection(entidad,title,myImputs){
   let editar = this.alertCtrl.create({
      title: title,
      inputs: myImputs,
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log(entidad+ 'Cancelar clicked' + JSON.stringify(data) );
          }
        },
        {
          text: 'Ok',
          handler: data => {
            if ( entidad == 'moneda' )
              this.registro.moneda = data;
            else if ( entidad == 'cliente' )
              this.registro.cliente = data;
            else console.log('entidad no exite');
          }
        }
      ]
    });
    editar.present();
  }

  onSelect({ selected }) {
  	console.log('Select Event', JSON.stringify(selected), this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);	
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  quitarProducto(valor){
  	let aux:any = this.rows.filter(function(el) {
    	return el !== valor;
	});
	this.rows = aux;
  }

  checkBox(campo){
  	if(campo=='contingencia'){
  		if(this.registro.contingencia=='no')
  		 	this.registro.contingencia ='si'; 
  		else this.registro.contingencia ='no'; 
  		
  	} else if(campo=='exoneracion'){
  		if(this.registro.exoneracion=='no')
  		 	this.registro.exoneracion ='si'; 
  		else this.registro.exoneracion ='no'; 
  		
  	} else if(campo=='credito'){
  		if(this.registro.credito=='no'){
  		 	this.registro.credito ='si'; 
  		} else {
  			this.registro.credito ='no'; 
  			this.registro.dias = 0;
  		}
  		
  	} else console.log(this.TAG,'campo no existe');
  }

  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    if( event.target.value == 0 ){
    	this.serviApp.alecrtMsg('La cantidad no puede ser 0');	
    	this.rows[rowIndex][cell] = 1;
    } 
    else this.rows[rowIndex][cell] = event.target.value;
	this.rows = [...this.rows];
    this.updateTotal(event,'total',rowIndex);
  }

  updateTotal(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = this.rows[rowIndex]['cantidad'] * this.rows[rowIndex]['precio'];
    this.rows = [...this.rows];
    //auto calculados
    this.calcutarTotales();
  }

  calcutarTotales(){
  	let acumTotalProducto = 0;
  	for( let i in this.rows){
  		acumTotalProducto = acumTotalProducto + this.rows[i].precio*this.rows[i].cantidad;
  	}
  	this.subTotal = acumTotalProducto;
    this.descuentoTotal = acumTotalProducto * this.registro.descuento/100;
    this.total =  acumTotalProducto - this.descuentoTotal;
  }

  esvalido(){
  	if(JSON.stringify(this.registro.moneda)=='{}'){
  		this.serviApp.alecrtMsg('Seleccione la moneda');
  		return false;
  	} else if(JSON.stringify(this.registro.cliente)=='{}'){
  		this.serviApp.alecrtMsg('Seleccione al cliente');
  		return false;
  	} else return true
  }

  async registrar(){
  	console.log(this.TAG, "registrar venta: " + JSON.stringify(this.registro));
  	if(this.esvalido()){
  		await this.serviApp.activarProgreso(true);
  		this.registrosProv.create({
  			"id_moneda":this.registro.moneda.id_moneda,
  			"id_cliente":this.registro.cliente.id_cliente,
  			"contingencia":this.registro.contingencia,
  			"exoneracion":this.registro.exoneracion,
  			"credito":this.registro.credito,
  			"dias":this.registro.dias,
  			"descuento":this.registro.descuento,
  			"observaciones":this.registro.observaciones
  		})
        .subscribe(
          (res)=>{
          	this.registroDetalle(res['data'].id_registro,this.rows.length-1);
          },
          (error)=>{
            this.serviApp.errorConeccion(error);
          }
        ); 
  	}
  }

  async registroDetalle(id_registro,i){	
  	if(i>=0) {
  		await this.registrosProv.createDetalle({
  			"id_registro": id_registro,
  			"id_producto": this.rows[i].id_producto,
  			"cantidad": this.rows[i].cantidad
  		})
    	.subscribe(
      		(res)=>{
      			console.log(res);
      			this.registroDetalle(id_registro,i-1);
        	},
       		(error)=>{
	           	this.serviApp.errorConeccion(error);
    	    }
    	); 
    } else {
    	this.serviApp.activarProgreso(false);
    	this.serviApp.alecrtMsg('Registrado exitosamente'); 
      this.segmento_registro_producto = 'seg_productos';
      this.rows =[];
    }
 }

}
