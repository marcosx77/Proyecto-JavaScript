let monto = 0;
let plazo = 0;
let interes = 0;
let nombre = "";
let direccion = "";
let correo = "";
const  txtNombre = document.getElementById("PresNombre"),
txtApelli = document.getElementById("PresApelli"),
txtCorreo = document.getElementById("PresCorreo"),
txtMonto = document.getElementById("PresMonto"),
cbInteres = document.getElementById("PresInteres"),
cbPlazo = document.getElementById("PresPlazo"),
IdPrestamo = document.getElementById("CardPrestamo"),
idOperaMoneda = document.getElementById("OperaMoneda"),
btnConsultaCotiza = document.getElementById("btnConsultaCotiza"),
btnCalculaPrestamo = document.getElementById("btnCalculaPrestamo"),
btnCalculaComVta = document.getElementById("btnCalculaComVta"),
chkPrestamo = document.getElementById("GuardarSimulaPrestamo"),
SelectPorInt = document.querySelector("#PresInteres"),
SelectPlazo = document.querySelector("#PresPlazo"),
SelectMoneda= document.getElementById("SelecMoneda"),
CarCotiza1=document.getElementById("CardCotiza1"),
CarCotiza2=document.getElementById("CardCotiza2"),
CarCotiza3=document.getElementById("CardCotiza3");

/* IdCotiza = document.getElementById("cotizaciones"), */
PorInt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
PrePlazo = [12, 24, 36, 48, 60, 72, 84];

const crearSelectsMonedas = async () => {
  const respuesta = await fetch('./js/data.json');
  const dataJson = await respuesta.json();
      for (const item of dataJson) {
          SelectMoneda.innerHTML +=`<option value="${item.id}">${item.nombre}</option>`;
      }
      SelectMoneda.addEventListener('change', (e) => {
          mostrarBandera(e.target);
  })
}
crearSelectsMonedas();

const MuestroCotizaciones = async () => {
  const respuesta = await fetch('./js/data.json');
  const dataJson = await respuesta.json();
      for (const item of dataJson) {
        
           CarCotiza1.innerHTML +=` <li class="list-group-item">
          <img class="ImgCotiza" src="https://www.countryflagsapi.com/png/${item.flag}">
           ${item.nombre}</li>`; 

           CarCotiza2.innerHTML +=`<li class="list-group-item">
           $ ${item.precioCompra}</li>`; 

           CarCotiza3.innerHTML +=`<li class="list-group-item">
           $ ${item.precioVenta}</li>`;
      }
}
MuestroCotizaciones();

const mostrarBandera = async (element) => {
  const respuesta = await fetch('./js/data.json');
  const dataJson = await respuesta.json();
  for (const item of dataJson) {
      if (item.id == element.value) {
          let imagen = element.parentElement.querySelector('img');
          imagen.src = `https://www.countryflagsapi.com/png/${item.flag}`;
      }
  }
}


//FUNCION QUE DA FORMATO DE MONEDA
const formatPeso = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  minimumFractionDigits: 0,
});

//funcion para crgar select
function cargarSelect(array, select) {
  array.forEach((element) => {
    let option = `<option>${element}</option>`;
    select.innerHTML += option;
  });
}
cargarSelect(PorInt, SelectPorInt);
cargarSelect(PrePlazo, SelectPlazo);


//MUETRA LA SIMULACION DEL PRESTAMO
const MuestraSimulacionPrestamo = (prestamo) => {
  let texto = "Cuota Mensual: " + prestamo.cuota;

  Swal.fire({
    title: "Simulación Prestamo",
    //text: "Cuota Mensual: " + prestamo.cuota,
    html:
      "<b>Cuota Mensual: " +
      prestamo.cuota +
      "</b> <br> <b>Total a Pagar: " +
      prestamo.Total +
      "</b> <br> <b>Total Interes: " +
      prestamo.interes +
      "</b>",
    imageUrl: "./img/simula_prestamo4.jpg",
    icon: "success",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eviar por Correo",
    cancelButtonText: "Cerrar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Simulación",
        "Enviada al correo: " + prestamo.Correo,
        "success"
      );
    }
  });

  txtNombre.value = prestamo.Nombre;
  txtApelli.value = prestamo.Apellido;
  txtCorreo.value = prestamo.Correo;
  txtMonto.value = prestamo.MontoPre;
  cbInteres.value = prestamo.IntPre;
  cbPlazo.value = prestamo.PlazoPre;
};

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
          MsjError("Interes Ingresado incorrecto");
          return false;
        }
      } else {
        MsjError("Plazo Ingresado incorrecto");
        return false;
      }
    } else {
      MsjError("Monto Ingresado incorrecto");
      return false;
    }
  }
}

function MsjError(texto) {
  Swal.fire({
    icon: "error",
    title: "Error...",
    text: texto,
  });
}

//MUESTRA LA OPERACION CON MONEDA EXTRANJERA REALIZADA
function OperaMoneda(arrayMoneda) {
  let cantidad = document.getElementById("MontoCompVta").value;
  let Texto="";
  let operacion="";
  let cotiza=0;
  if (isNaN(cantidad) == false) {
    let valor = document.getElementById("SelecMoneda").value;
    let array = arrayMoneda.filter(arrayMoneda => arrayMoneda.id==valor);
    array.forEach((Moneda)=>{

    if (document.getElementById("RadioCompra").checked) {
      Texto="Necesita: ";
      cotiza=Moneda.precioVenta;
      operacion="Compra"
    }else {
      Texto="Recibe: "
      operacion="Venta"
      cotiza=Moneda.precioCompra;
    }

    Swal.fire({
      imageUrl: "./img/moneda"+ Moneda.id +".jpg",
      title: operacion,
      text: Moneda.nombre +' (' + Moneda.sigla +")",
      html:"<b>Cotización: " + formatPeso.format(cotiza) +" </b> <br> <b> Cantidad a la " + operacion +": " + formatPeso.format(cantidad) +"</b><br><b>" + Texto + formatPeso.format(CompraVentaMonedaExtranjera(cotiza, cantidad)) + "</b>",
    })

    idOperaMoneda.innerHTML = "";
    idOperaMoneda.innerHTML += `
        <div class="col-md-3 card tarjeta" style="width: 18rem;">
            <img src="./img/moneda${Moneda.id}.jpg" class="card-img-top" alt="test">
            <div class="card-body">
                <h5 class="card-title"> ${operacion}</h5>
                <h5 class="card-title"> ${Moneda.nombre} (${
      Moneda.sigla
    })</h5>
                <p class="card-text">
                <b>Cotización: ${formatPeso.format(cotiza)}</b> <br>
                <b>Cantidad a la ${operacion}:  ${formatPeso.format(
      cantidad
    )}</b><br>
                <b> ${Texto} ${formatPeso.format(CompraVentaMonedaExtranjera(cotiza, cantidad))}</b>
                <!--<a href="#" class="btn btn-primary">Cerrar</a>-->
            </div>
        </div>`;
      }) 
  } else {
    MsjError("Cantidad Ingresada incorrecta");
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
  Toastify({
    text: "Simulación Guardada",
    className: "info",
    newWindow: true,
    duration: 3500,
    gravity: "top",
    position: "right",
    close: true,
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    }
  }).showToast();
}

//Esta función va a recuperar un objeto del storage si se guardó (a través de la key), y a devolver false si no existe
function recuperarStoragePrestamo(Prestamo) {
  let prestamo = JSON.parse(localStorage.getItem(Prestamo)) || false;
  return prestamo;
}

//boton calcula prestamo
btnCalculaPrestamo.onclick = () => {
  monto = txtMonto.value;
  interes = cbInteres.value;
  plazo = cbPlazo.value;
  CuotaPrestamo();
};

//boton commpra venta moneda extrajera
btnCalculaComVta.onclick = () => {
  bringData();
};

btnPrestamoSimula.onclick = () => {
  let RecuperaPre = recuperarStoragePrestamo("prestamo");

  RecuperaPre
    ? MuestraSimulacionPrestamo(RecuperaPre)
    : MsjError("No hay simulaciones Guardadas");
};

async function bringData() {
  const response = await fetch('./js/data.json');
  const data = await response.json();
    OperaMoneda(data);
}