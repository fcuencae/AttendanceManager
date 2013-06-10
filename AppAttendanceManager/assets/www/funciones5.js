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

var ajax=objetoAjax();
//Funcion que añade/quita faltas.
//Comprueba si el alumno tiene falta: Si no la tiene la añade. Si la tiene, la quita.
function AsignarFalta(alumn){
var inicio = document.getElementById('horainicio').value;
var fin = document.getElementById('horafinal').value;
var idalumno = alumn.value;
var bloqueclase = document.getElementById('classblock').value;
var server = document.getElementById('server').value;
var idprof = document.getElementById('idProfe').value;
var url = 'http://'+server+'/AMWebService?action=hasMiss&start='+inicio+'&end='+fin+'&idStudent='+idalumno+"&tmp="+new Date().getTime();
ajax.open("GET", url);
ajax.onreadystatechange=function() {
if (ajax.readyState==4){
	var myJSONObject4 =ajax.responseText;
	var datos4=JSON.parse(myJSONObject4);
	if (datos4.miss == "false")
	{
		var idsubject = document.getElementById('idgrupo').value;
		var url2 = 'http://'+server+'/AMWebService?action=addMiss&idProfe='+idprof+'&idStudent='+idalumno+'&idSubject='+idsubject+'&idClassblock='+bloqueclase+'&start='+inicio;
		ajax2=objetoAjax();
		ajax2.open("GET", url2);
		ajax2.onreadystatechange=function() {
			if (ajax2.readyState==4){
				alert("Falta colocada");
			}
		}
		ajax2.send(null);
	}
	else 
	{	
	var url3 = 'http://'+server+'/AMWebService?action=deleteMiss&idStudent='+idalumno+'&idClassblock='+bloqueclase+'&start='+inicio;
	ajax3=objetoAjax();
		ajax3.open("GET", url3);
		ajax3.onreadystatechange=function() {
			if (ajax3.readyState==4){
				alert("Falta quitada");
			}
		}
		ajax3.send(null);
	}
	}
}
ajax.send(null);
}
