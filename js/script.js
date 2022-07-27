//const cotizaDolarVenta = 310;
//const cotizaDolarCompra = 300;

let monto = 0;
let plazo = 0;
let interes = 0;
let nombre = "";
let direccion = "";
let correo = "";

//array con valores de cotizacion Venta/Compra
const cotizaDolar = [330, 322];

//OBJETO MONEDAEXTRANJERA
class MonedaExtranjera{
  constructor(nombre, sigla, precioCompra, precioVenta ) {
    this.nombre=nombre;
    this.sigla=sigla;
    this.precioCompra=precioCompra;
    this.precioVenta=precioVenta;
  }
}
//ARRAYS DE MONEDAS
const moneda=[];
moneda.push(new MonedaExtranjera("Dolar Estadounidense","USD",318,320));
moneda.push(new MonedaExtranjera("Euro","EUR",132,134));
moneda.push(new MonedaExtranjera("Real Brasileño","R$",4,5))


function cotizaciones(){
  let muestra="Cotizaciones \n";
  for(const cot of moneda) {
    muestra+="Moneda: " + cot.nombre +" ("+ cot.sigla +")\n"+
              "   Compra: " + cot.precioCompra +
              "   Venta: " + cot.precioVenta + "\n\n"
  }
  return muestra;
}

function OpcionesMoneda() {
  let opcion = prompt(
    "SERVICIOS FINANCIEROS\n Seleccione la Moneda:\n" +
      "1 - Dolar Estadounidense\n" +  
      "2 - Euro\n" +
      "3 - Real Brasileño\n" +
      "4 - Salir"
  );
  return opcion;
}

//funcion compar-Vender moneda extranjera
const CompraVentaMonedaExtranjera = (cotiza, cantidad) => cantidad * cotiza;
//funcion venta-compra Moneda extranjera (ingresar Pesos)
const CompVtaMonedaExtranjera = (cotiza, cantidad) => cantidad / cotiza;


//OBJETO PRESTAMO 
class prestamo {
  constructor(Nombre, Apellido, Correo) {
    this.Nombre = Nombre;
    this.Apellido = Apellido;
    this.Correo = Correo;
    this.cuota = 0;
    this.Total = 0;
    this.Interes = 0;
  }
  CalculaCuotaPrestamo(monto, plazo, interes) {
    let valor = 0;
    let Coeficiente = 0;
    let Coeficiente1 = 0;

    Coeficiente = 1 + interes / 100;
    Coeficiente1 = Coeficiente;

    for (let i = 1; i < plazo; i++) {
      Coeficiente1 = Coeficiente1 * Coeficiente;
    }

    Coeficiente1 = 1 / Coeficiente1;
    Coeficiente1 = 1 - Coeficiente1;
    valor = ((interes / 100) * monto) / Coeficiente1;
    this.cuota = Intl.NumberFormat().format(valor);
    this.Total = Intl.NumberFormat().format(valor * plazo);
    this.interes = Intl.NumberFormat().format(valor * plazo - monto);
  }

  ValidarDatos(monto, plazo, interes) {
    if (isNaN(monto) == false) {
      if (isNaN(plazo) == false) {
        if (isNaN(interes) == false) {
          return true;
        } else {
          alert("Interes Ingresado incorrecto");
          return false;
        }
      } else {
        alert("Plazo Ingresado incorrecto");
        return false;
      }
    } else {
      alert("Monto Ingresado incorrecto");
      return false;
    }
  }
}

function OpcionesInicio() {
  let opcion = prompt(
    "SERVICIOS FINANCIEROS\n Seleccione la opcion:\n" +
      "1 - Cotizaciones Moneda Extranjera\n" +  
      "2 - Compra Moneda Extranjera\n" +
      "3 - Venta Moneda Extranjera\n" +
      "4 - Prestamos Personales\n" +
      "5 - Salir"
  );
  return opcion;
}


let opcion = OpcionesInicio();

while (opcion != "5") {
  switch (opcion) {
    case "1":
      alert(cotizaciones());
      /*CompraMoneda();*/
      break;
    case "2":
      CompraMoneda();
      break;
    case "3":
      VenderMoneda();
      break;
    case "4":
      CuotaPrestamo();
      break;
    default:
      alert("Opción Incorrecta");
      break;
  }
  opcion = OpcionesInicio();
}
if (opcion=="5") {
  alert("Gracias por confiar en Te Presto");
}

function CompraMoneda() {
  opcion=OpcionesMoneda() 
  while (opcion != "4") {
    switch (opcion) {
      case "1":
        /*dolar*/
        OprecionConMonedas("Comprar",moneda[0].nombre, moneda[0].sigla,moneda[0].precioVenta)
        break;
      case "2":
        /*euro*/
        OprecionConMonedas("Comprar",moneda[1].nombre, moneda[1].sigla,moneda[1].precioVenta)
        break;
      case "3":
        /*real brasilero*/
        OprecionConMonedas("Comprar",moneda[2].nombre, moneda[2].sigla,moneda[2].precioVenta)
        break;
      default:
        alert("Opción Incorrecta");
        break;
    }
    opcion = OpcionesMoneda();
  }
}

function VenderMoneda() {
  opcion=OpcionesMoneda() 
  while (opcion != "4") {
    switch (opcion) {
      case "1":
        /*dolar*/
        OprecionConMonedas("Vender",moneda[0].nombre, moneda[0].sigla,moneda[0].precioCompra)
        break;
      case "2":
        /*euro*/
        OprecionConMonedas("Vender",moneda[1].nombre, moneda[1].sigla,moneda[1].precioCompra)
        break;
      case "3":
        /*real brasilero*/
        OprecionConMonedas("Vender",moneda[2].nombre, moneda[2].sigla,moneda[2].precioCompra)
        break;
      default:
        alert("Opción Incorrecta");
        break;
    }
    opcion = OpcionesMoneda();
  }
}

function OprecionConMonedas(Accion,nombre,sigla,cotiza){
  let cantidad = prompt(Accion+ "   " +nombre+ " ("+sigla+")"+
      "\n" +
      "Cotización: " +
      cotiza +
      "\n" +
      "Ingrese Cantidad a "+Accion +":"
  );
  if (isNaN(cantidad) == false) {
    let msj="";
    if (Accion=="Comprar"){
      msj="Necesita ";  
    }else {
      msj="Recibe ";    
    }
    msj+=CompraVentaMonedaExtranjera (cotiza, cantidad) +
    " Pesos para " + Accion + " " +
    cantidad +"  " +nombre+ " ("+sigla+")";
    alert(msj);
  } else {
    alert("Cantidad Ingresada incorrecta");
  }
}


function CuotaPrestamo() {
  monto = prompt("Ingresá Monto del Prestamo: ");
  plazo = prompt("Cantidad de Cuotas a Pagar: ");
  interes = prompt("Interes: ");
  const prestamo1 = new prestamo("Marcos", "Martin", "Marcos@gmail.com");
  if (prestamo1.ValidarDatos(monto, plazo, interes)) {
    prestamo1.CalculaCuotaPrestamo(monto, plazo, interes);
    alert(
      "Cuota Mensual: " +
        prestamo1.cuota +
        "\nTota a Pagar: " +
        prestamo1.Total +
        "\nTotal Intereses: " +
        prestamo1.interes
    );
  }
}
