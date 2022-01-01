var cuotas = [ '12 Cuotas', '24 Cuotas', '48 Cuotas' ];

function cargarCuotas(cuotas) {
	var select_cuotas = $('#cuotas');

	for (let cuota of cuotas) {
		select_cuotas.append("<option value='" + cuota + "'>" + cuota + '</option>');
	}
}
cargarCuotas(cuotas);

var motivo = [ 'Viaje y Turismo', 'Adquisición de Inmueble', 'Compra de Auto', 'Otro' ];

function cargarMotivos() {
	var select_motivos = $('#motivoPrestamo');

	for (let motivos of motivo) {
		select_motivos.append("<option value='" + motivos + "'>" + motivos + '</option>');
	}
}
cargarMotivos(motivo);

function camposValidados(nombre1, nombre2, estado) {
	var nombre1 = $('#' + nombre1);
	var nombre2 = $('#' + nombre2);

	if (estado == 'ok') {
		nombre1.removeClass('borde_error');
		nombre1.addClass('borde_ok');
		nombre2.removeClass('texto_error');
		nombre2.addClass('texto_ok');
	} else {
		nombre1.removeClass('borde_ok');
		nombre1.addClass('borde_error');
		nombre2.removeClass('texto_ok');
		nombre2.addClass('texto_error');
	}
}

function validarFormulario() {
	var nombre = $('#nombre');
	var textoNombre = $('#textoNombre');

	if (nombre.val() == '') {
		textoNombre.html('Error! Ingrese un nombre!');
		camposValidados('nombre', 'textoNombre', 'error');
		nombre.focus();
		return false;
	} else {
		textoNombre.html('Datos validados!');
		camposValidados('nombre', 'textoNombre', 'ok');
	}

	var apellido = $('#apellido');
	var textoApellido = $('#textoApellido');

	if (apellido.val() == '') {
		textoApellido.html('Error! Ingrese un apellido!');
		camposValidados('apellido', 'textoApellido', 'error');
		apellido.focus();
		return false;
	} else {
		textoApellido.html('Datos validados!');
		camposValidados('apellido', 'textoApellido', 'ok');
	}

	var documento = $('#documento');
	var textoDocumento = $('#textoDocumento');

	if (documento.val() == '') {
		textoDocumento.html('Error! Ingrese un número de documento válido!');
		camposValidados('documento', 'textoDocumento', 'error');
		documento.focus();
		return false;
	} else if (documento.val() >= 100000) {
		textoDocumento.html('Datos validados!');
		camposValidados('documento', 'textoDocumento', 'ok');
	}

	var email = $('#email');
	var textoEmail = $('#textoEmail');

	if (email.val() == '') {
		textoEmail.html('Error! Email inválido!');
		camposValidados('email', 'textoEmail', 'error');
		email.focus();
		return false;
	} else {
		textoEmail.html('Datos validados!');
		camposValidados('email', 'textoEmail', 'ok');
	}
	var cantidad = $('#cantidad');
	var textoCantidad = $('#textoCantidad');

	if (cantidad.val() == '') {
		textoCantidad.html('Error! Ingrese una cantidad mayor o igual a $30.000!');
		camposValidados('cantidad', 'textoCantidad', 'error');
		cantidad.focus();
		return false;
	} else if (cantidad.val() >= 30000) {
		textoCantidad.html('Datos validados!');
		camposValidados('cantidad', 'textoCantidad', 'ok');
	}
	var tyc = $('#tyc');
	var textoTYC = $('#textoTYC');

	if (!tyc.is(':checked')) {
		textoTYC.html('Por favor, confirme los Términos y Condiciones!');
		camposValidados('tyc', 'textoTYC', 'error');
		tyc.focus();
		return false;
	} else {
		textoTYC.html('Términos y Condiciones aprobados!');
		camposValidados('tyc', 'textoTYC', 'ok');
	}

	return true;
}
function agregarPrestamo() {
	if (validarFormulario()) {
		let datos = [];
		if (localStorage.getItem('prestamos')) {
			datos = JSON.parse(localStorage.getItem('prestamos'));
		}
		datos.push({
			id: datos.length + 1,
			nombre: $('#nombre').val(),
			apellido: $('#apellido').val(),
			documento: $('#documento').val(),
			email: $('#email').val(),
			cantidad: $('#cantidad').val(),
			cuotas: $('#cuotas').val(),
			motivoPrestamo: $('#motivoPrestamo').val(),
			TNA: $('#cantidad').val() * 1.49
		});
		localStorage.setItem('prestamos', JSON.stringify(datos));

		console.log('formulario enviado');
	}
}

$('#enviar_form').click(function() {
	agregarPrestamo();
});

$('#nombre').focusout(function() {
	validarFormulario();
});
$('#apellido').focusout(function() {
	validarFormulario();
});

$('#documento').focusout(function() {
	validarFormulario();
});

$('#email').focusout(function() {
	validarFormulario();
});
$('#cantidad').focusout(function() {
	validarFormulario();
});
$('#tyc').focusout(function() {
	validarFormulario();
});

function mostrarMensaje() {
	$('#modelos').fadeIn(2000);
}

function ocultarMensaje() {
	$('#modelos').fadeOut(2000);
}

$('#boton1').click(function() {
	cargarAjax();
	mostrarMensaje();
});

$('#boton2').click(function() {
	ocultarMensaje();
});

$('footer').append('<p class="footer text-center">©2021 CoderHouse Todos los derechos Reservados.</p>');
$('.footer').animate(
	{
		height: '150px',
		margin: '0'
	}, //1er parámetro propiedades
	'5000'
); //2do parámetro duración

$('#btnSecundario').click(function() {
	const prestamos = JSON.parse(localStorage.getItem('prestamos'));

	console.log('PRESTAMOS', prestamos);
	if (prestamos && prestamos.length) {
		$('#contenido-historial').html(
			prestamos
				.map((prestamo) => {
					return `
                <div>
                    <h2>Prestamo ${prestamo.id}</h2>
                    <p><b>Nombre:</b> ${prestamo.nombre}</p>
                    <p><b>Apellido:</b> ${prestamo.apellido}</p>
                    <p><b>Documento:</b> ${prestamo.documento}</p>
                    <p><b>Email:</b> ${prestamo.email}</p>
                    <p><b>Cuotas:</b> ${prestamo.cuotas}</p>
                    <p><b>Motivo de Prestamo:</b> ${prestamo.motivoPrestamo}</p>
                    <p><b>TNA:</b> ${prestamo.TNA}</p>
                </div>
            `;
				})
				.join('')
		);
	}
});

function cargarAjax() {
	$.ajax({
		method: 'GET',
		url: 'premios.json',
		dataType: 'json',
		headers: {
			'Access-Control-Allow-Origin': '*'
		},
		success: function(premios) {
			console.log(premios);
			$('.container').fadeIn(2000);
			var contenido = '';

			for (let premio of premios) {
				contenido += "<div class='col-4'>";
				contenido += "<div class='card rounded shadow' >";
				contenido +=
					"<div><h5 id='premio_auto" +
					premio.id +
					"' class='text-black fw-bold'>" +
					premio.nombre +
					'</h5></div>';
				contenido +=
					"<img id='premio_imagen" +
					premio.id +
					"' src='img/" +
					premio.imagen +
					"' class='card-img-top' alt='" +
					premio.nombre +
					"' onclick=asignarDatos('premio_auto" +
					premio.id +
					"');>";
				contenido += "<div class='card-body'>";
				contenido += "<div class='row'>";
				contenido += "<div class='col'><p class='text-black'>puntos:</p></div>";
				contenido +=
					"<div class='col text-end'><strong id='premio_puntos" +
					premio.id +
					"' class='text-danger'>" +
					premio.puntos +
					'</strong></div>';
				contenido += '</div>';
				contenido += '</div>';
				contenido += '</div>';
				contenido += '</div>';
			}
			var contenedor_premios = $('#modelos');
			contenedor_premios.html(contenido);
			$('#estado').html('El Ajax se cargó correctamente!');
			$('#estado').removeClass('bg-danger');
			$('#estado').addClass('bg-success text-white p-3 mt-3');
			$('#estado').fadeIn(2000);
		},
		error: function(premios) {
			$('#estado').html('<b>Error!</b> El Ajax no se cargó correctamente!');
			$('#estado').removeClass('bg-success');
			$('#estado').addClass('bg-danger text-white p-3 mt-3');
			$('#estado').fadeIn(2000);
		}
	});
}
