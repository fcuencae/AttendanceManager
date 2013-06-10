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

function muestraAlumnos(){
var opcion = document.getElementById('clases').value;
var idgrupo = opcion.split("/",1);
document.getElementById("idgrupo").value = idgrupo;
var inicioclase = opcion.split("/",2);
document.getElementById('horainicio').value = inicioclase[1]; 
var finalclase = opcion.split("/",3);
document.getElementById('horafinal').value = finalclase[2];
var classblock = opcion.split("/",4);
document.getElementById('classblock').value = classblock[3];
var server = document.getElementById('server').value;
var url = 'http://'+server+'/AMWebService?action=getStudents&idGroup='+idgrupo;
ajax=objetoAjax();
ajax.open("GET", url);
ajax.onreadystatechange=function() {
if (ajax.readyState==4){
	var myJSONObject3 =ajax.responseText;
	var datos3=JSON.parse(myJSONObject3);
	divResultados2 = document.getElementById('table');
	divResultados2.innerHTML = '';
	divResultados2.innerHTML += '<br />';
	for (var numeroalumnos in datos3)
	    {
		divResultados2.innerHTML += '<tr>';
	    divResultados2.innerHTML += '<td>'+datos3[numeroalumnos].fullName+'</td>'+'<td>'+'<input class="faltas" type="checkbox" name="falta" id="falta" value='+datos3[numeroalumnos].idStudent+' onclick="AsignarFalta(this)"></input></td>';
		divResultados2.innerHTML += '<br/>';
		divResultados2.innerHTML += '</tr>';
	}
	var contadorAlumnos = document.getElementsByName("falta");
	for (x=0; x<contadorAlumnos.length; x++)
	{
		VerFalta(datos3[x].idStudent);
	}
}
}
ajax.send(null)
}
