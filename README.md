# app-abee-movil
app-abee-movil aplicacion demo para facturacion digital

Esta aplicacion esta implementada con el consumo desde una api con despliegue en heroku
ir a [https://github.com/Leo1305Pineda/api-abee](https://github.com/Leo1305Pineda/api-abee)

# instalacion y puesta en marcha

```
mkdir $HOME/git && cd $HOME/git
mkdir $HOME/git/abee && cd $HOME/git/abee
git clone https://github.com/Leo1305Pineda/api-abee.git
git clone https://github.com/Leo1305Pineda/app-abee-movil.git
cd $HOME/git/abee/api-abee && npm install
cd $HOME/git/abee/app-abee-movil && npm install
cd $HOME/git/abee/api-abee && npm run start
cd $HOME/git/abee/app-abee-movil && npm run ionic:serve

```

## ajuste para trabajar localmente editar el archivo en la linea 7 por la linea 6

$HOME/git/abee/app-abee-movil/src/providers/general.service.ts
```
   private urlBaseApi = "http://localhost:5000";
// private urlBaseApi = "https://api-abee.herokuapp.com";

```

# Requerimientos

A nivel de la App

• Modulo de facturación

• Búsqueda de productos desde un listado

• Búsqueda de cliente

• Selección de moneda (Dólares)

• Que permita tildar crédito, y al tildarlo habilitar el campo días para colocar la cantidad

• Que agregue el producto a la tabla permitiendo colocar cantidad en ella, como también eliminarlo

• Realizar el calculo automático de la factura a medida que se manipule la tabla

• Utilizar data [estática] consuno de la api-abee para la asignación de productos, clientes, monedas entre otros



