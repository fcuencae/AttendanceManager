addEvent(window,'load',inicializarEventos,false);

function inicializarEventos()
{
  var obj=document.getElementById('submitButton');
  addEvent(obj,'click',opcionSeleccionada,false);
}

function opcionSeleccionada(e)
{
var ob1=document.getElementById("servidor");
var ob2=document.getElementById("login");
var ob3=document.getElementById("password");
  CargarLogin(ob1.value,ob2.value,ob3.value);
}

var conexion1;
function CargarLogin(servidor, login, password)
{
  conexion1=crearXMLHttpRequest();
  conexion1.open('GET','http://'+servidor+'/AMWebService?action=getProfe&login='+login+'&password='+password, true);
  conexion1.onreadystatechange = procesarEventos;
  conexion1.send(null);
}

function procesarEventos()
{
  if(conexion1.readyState == 4 && conexion1.status == 200)
  {
    var myJSONObject =conexion1.responseText;
    var datos=JSON.parse(myJSONObject);
    if (datos.id == undefined)
    {
    	alert("Login/Password incorrecto");
    }
    else
    {
    var idprofe = datos.id;
    var nombre = datos.nombreCompleto;
    var server=document.getElementById("servidor").value;
	$.mobile.changePage($('#page2'));
    document.getElementById("idProfe").value = idprofe;
    document.getElementById("server").value = server;
	alert("Bienvenido "+nombre);
    }
  } 
  else 
  {
   // resultados.innerHTML = "Cargando...";
  }
}

//***************************************
//Funciones comunes a todos los problemas
//***************************************
function addEvent(elemento,nomevento,funcion,captura)
{
  if (elemento.attachEvent)
  {
    elemento.attachEvent('on'+nomevento,funcion);
    return true;
  }
  else  
    if (elemento.addEventListener)
    {
      elemento.addEventListener(nomevento,funcion,captura);
      return true;
    }
    else
      return false;
}

function crearXMLHttpRequest() 
{
  var xmlHttp=null;
  if (window.ActiveXObject) 
    xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
  else 
    if (window.XMLHttpRequest) 
      xmlHttp = new XMLHttpRequest();
  return xmlHttp;
}
