let monto = 0;
let plazo = 0;
let interes = 0;
let nombre = "";
let direccion = "";
let correo = "";
let txtNombre = document.getElementById("PresNombre");
let txtApelli = document.getElementById("PresApelli");
let txtCorreo = document.getElementById("PresCorreo");
let txtMonto = document.getElementById("PresMonto");
let cbInteres = document.getElementById("PresInteres");
let cbPlazo = document.getElementById("PresPlazo");
let IdCotiza = document.getElementById("cotizaciones");
let IdPrestamo = document.getElementById("CardPrestamo");
let idOperaMoneda = document.getElementById("OperaMoneda");
let btnConsultaCotiza = document.getElementById("btnConsultaCotiza");
let btnCalculaPrestamo = document.getElementById("btnCalculaPrestamo");
let btnCalculaComVta = document.getElementById("btnCalculaComVta");
let chkPrestamo = document.getElementById("GuardarSimulaPrestamo");

//FUNCION QUE DA FORMATO DE MONEDA
const formatPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

//APLICAMOS DOM
//MUESTRA LAS COTIZACIONES
const mostrarCotizaciones = () => {
  let contador = 0;
  IdCotiza.innerHTML = "";
  for (const cot of moneda) {
    IdCotiza.innerHTML += `
      <div class="card tarjeta shadow-lg" style="width: 15rem;">
          <img src="./img/moneda${contador}.jpg" class="card-img-top" alt="test">
          <div class="card-body">
              <h5 class="card-title">${cot.nombre} (${cot.sigla})</h5>
              <p class="card-text">
              <b>Compra: ${formatPeso.format(cot.precioCompra)}</b> <br>
              <b>Venta:  ${formatPeso.format(cot.precioVenta)}</b>
              <!--<a href="#" class="btn btn-primary">Cerrar</a>-->
          </div>
      </div>`;
    contador++;
  }
};

//MUETRA LA SIMULACION DEL PRESTAMO
const MuestraSimulacionPrestamo = (prestamo) => {
  IdPrestamo.innerHTML = "";
  IdPrestamo.innerHTML = `
    <div class="card tarjeta shadow-lg" style="width: 15rem;">      
      <img src="./img/simula_prestamo4.jpg" class="card-img-top" alt="test">
      <div class="card-body">
        <h5 class="card-title">Simulación del Prestamo</h5>
        <p class="card-text">
        <b>Cuota Mensual: ${prestamo.cuota}</b> <br>
        <b>Total a Pagar: ${prestamo.Total}</b> <br>
        <b>Total Interes: ${prestamo.interes}</b>
        <!--<a href="#" class="btn btn-primary">Cerrar</a>-->
      </div>
    </div>`;

  txtNombre.value = prestamo.Nombre;
  txtApelli.value = prestamo.Apellido;
  txtCorreo.value = prestamo.Correo;
  txtMonto.value = prestamo.MontoPre;
  cbInteres.value = prestamo.IntPre;
  cbPlazo.value = prestamo.PlazoPre;
  /* IdPrestamo.append(Tarjeta);*/
};
//MUESTRA LA OPERACION CON MONEDA EXTRANJERA REALIZADA
const MuestraOperacionMonedaExtrajera = (
  idmoneda,
  operacion,
  cotiza,
  cantidad,
  resultado
) => {
  idOperaMoneda.innerHTML = "";
  idOperaMoneda.innerHTML += `
      <div class="col-md-3 card tarjeta" style="width: 18rem;">
          <img src="./img/moneda${idmoneda}.jpg" class="card-img-top" alt="test">
          <div class="card-body">
              <h5 class="card-title"> ${operacion}</h5>
              <h5 class="card-title"> ${moneda[idmoneda].nombre} (${
    moneda[idmoneda].sigla
  })</h5>
              <p class="card-text">
              <b>Cotización: ${formatPeso.format(cotiza)}</b> <br>
              <b>Cantidad a la ${operacion}:  ${formatPeso.format(
    cantidad
  )}</b><br>
              <b>Recibe:  ${formatPeso.format(resultado)}</b>
              <!--<a href="#" class="btn btn-primary">Cerrar</a>-->
          </div>
      </div>`;
};

//OBJETO MONEDAEXTRANJERA
class MonedaExtranjera {
  constructor(nombre, sigla, precioCompra, precioVenta) {
    this.nombre = nombre;
    this.sigla = sigla;
    this.precioCompra = precioCompra;
    this.precioVenta = precioVenta;
  }
}
//ARRAYS DE MONEDAS
const moneda = [];
moneda.push(new MonedaExtranjera("Dolar EEUU", "USD", 275, 280));
moneda.push(new MonedaExtranjera("Euro", "EUR", 134, 135));
moneda.push(new MonedaExtranjera("Real Brasileño", "R$", 4.02, 4.02));

//funcion compar-Vender moneda extranjera
const CompraVentaMonedaExtranjera = (cotiza, cantidad) => cantidad * cotiza;
//funcion venta-compra Moneda extranjera (ingresar Pesos)
const CompVtaMonedaExtranjera = (cotiza, cantidad) => cantidad / cotiza;

//OBJETO PRESTAMO
class prestamo {
  constructor(Nombre, Apellido, Correo, MontoPre, IntPre, PlazoPre) {
    this.Nombre = Nombre;
    this.Apellido = Apellido;
    this.Correo = Correo;
    this.MontoPre = MontoPre;
    this.IntPre = IntPre;
    this.PlazoPre = PlazoPre;
    this.cuota = 0;
    this.Total = 0;
    this.interes = 0;
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

    valor = (monto * (interes / 100)) / Coeficiente1;
    this.cuota = formatPeso.format(valor);
    this.Total = formatPeso.format(valor * plazo);
    this.interes = formatPeso.format(valor * plazo - monto);
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

function OperaMoneda() {
  let cantidad = document.getElementById("MontoCompVta").value;

  if (isNaN(cantidad) == false) {
    let valor = document.getElementById("SelecMoneda").value;

    document.getElementById("RadioCompra").checked
      ? MuestraOperacionMonedaExtrajera(
          valor,
          "Compra",
          moneda[valor].precioVenta,
          cantidad,
          CompraVentaMonedaExtranjera(moneda[valor].precioVenta, cantidad)
        )
      : MuestraOperacionMonedaExtrajera(
          valor,
          "Venta",
          moneda[valor].precioCompra,
          cantidad,
          CompraVentaMonedaExtranjera(moneda[valor].precioCompra, cantidad)
        );
  } else {
    alert("Cantidad Ingresada incorrecta");
  }
}

function CuotaPrestamo() {
  const prestamo1 = new prestamo(
    txtNombre.value,
    txtApelli.value,
    txtCorreo.value,
    txtMonto.value,
    cbInteres.value,
    cbPlazo.value
  );
  if (prestamo1.ValidarDatos(monto, plazo, interes)) {
    prestamo1.CalculaCuotaPrestamo(monto, plazo, interes);

    MuestraSimulacionPrestamo(prestamo1);
    chkPrestamo.checked && guardarStoragePrestamo(prestamo1);
  }
}

function guardarStoragePrestamo(Prestamo) {
  localStorage.setItem("prestamo", JSON.stringify(Prestamo));
}

//Esta función va a recuperar un objeto del storage si se guardó (a través de la key), y a devolver false si no existe
function recuperarStoragePrestamo(Prestamo) {
  let prestamo = JSON.parse(localStorage.getItem(Prestamo))||false;
  return prestamo;
}
//APLICAMOS EVENTOS
//boton consultar cotizaciones
btnConsultaCotiza.onclick = () => {
  mostrarCotizaciones();
};

//boton calcula prestamo
btnCalculaPrestamo.onclick = () => {
  monto = txtMonto.value;
  interes = cbInteres.value;
  plazo = cbPlazo.value;
  CuotaPrestamo();
};

//boton commpra venta moneda extrajera
btnCalculaComVta.onclick = () => {
  OperaMoneda();
};

btnPrestamoSimula.onclick = () => {
  let RecuperaPre = recuperarStoragePrestamo("prestamo");

  RecuperaPre
    ? MuestraSimulacionPrestamo(RecuperaPre)
    : alert("No hay simulaciones Guardadas");
};
