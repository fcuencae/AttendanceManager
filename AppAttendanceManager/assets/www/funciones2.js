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

function refrescardiv(){
	selResultado = document.getElementById('clases');
	hResultado = document.getElementById('titulo');
	var server = document.getElementById('server').value;
	var idprof = document.getElementById('idProfe').value;
	var dia = document.getElementById("dia").value;
	var mes = document.getElementById("mes").value;
	var anyo = document.getElementById("anyo").value;
	var url = 'http://'+server+'/AMWebService?action=getclassblocksOfTeacherOnDate&idProfe='+idprof+'&anyo='+anyo+"&mes="+mes+"&dia="+dia+"&hora=00&minutos=0";
	ajax=objetoAjax();
	ajax.open("GET", url);
	ajax.onreadystatechange=function() {
	if (ajax.readyState==4){
	var myJSONObject2 =ajax.responseText;
	var datos2=JSON.parse(myJSONObject2);
	selResultado.innerHTML = '';
	hResultado.innerHTML = "Tus cursos:";
	for (var f in datos2)
	    {
	    selResultado.innerHTML += '<option value='+datos2[f].idGroup+"/"+datos2[f].start+"/"+datos2[f].end+"/"+datos2[f].idClassblock+'>'+datos2[f].nombreClase+'</option>';
	    }
	}
	}
ajax.send(null)
}
