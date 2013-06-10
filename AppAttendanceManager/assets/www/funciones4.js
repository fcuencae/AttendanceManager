function objetoAjax(){
var xmlhttp=false;
try {
xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
} catch (e) {
try {
xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
} catch (E) {
xmlhttp = false;
}
}

if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
xmlhttp = new XMLHttpRequest();
}
return xmlhttp;
}

//Funcion que se ejecuta al cargar los CheckBox. 
//Comprueba si el alumno ya tenía una falta puesta y, si la tiene, marca la casilla
function VerFalta(idalumno)
{
var inicio = document.getElementById('horainicio').value;
var fin = document.getElementById('horafinal').value;
var alumnoid = idalumno;
var server = document.getElementById('server').value;
var direccion = 'http://'+server+'/AMWebService?action=hasMiss&start='+inicio+'&end='+fin+'&idStudent='+alumnoid+"&tmp="+new Date().getTime();
aj=objetoAjax();
aj.open("GET", direccion, false);
aj.onreadystatechange=function(){
if(aj.readyState==4)
{
var myJSONObjectX = aj.responseText;
var resp = JSON.parse(myJSONObjectX);
if(resp.miss == "true")
{
	var contador = document.getElementsByName("falta");
	var input, i=contador.length;
	while (i--)
	{
		input = contador[i];
		if ('checkbox' == input.type)
		{
			if(input.value == alumnoid)
			{
				input.checked = true;
			}
		}
	}
}
}	
}
aj.send(null);
}