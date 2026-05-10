// ==============================
// reserva.js
// Guarda la reserva en localStorage
// ==============================

function confirmarReserva() {

    // Lee los valores del formulario
    var nombre   = document.getElementById('nombre').value.trim();
    var apellido = document.getElementById('apellido').value.trim();
    var email    = document.getElementById('email').value.trim();
    var telefono = document.getElementById('telefono').value.trim();
    var fecha    = document.getElementById('fecha').value;
    var hora     = document.getElementById('hora').value;
    var personas = document.getElementById('personas').value;
    var zona     = document.getElementById('zona').value;
    var notas    = document.getElementById('notas').value.trim();
    var terminos = document.getElementById('terminos').checked;

    // Validación: todos los campos obligatorios deben estar llenos
    if (!nombre || !apellido || !email || !telefono || !fecha || !hora || !personas) {
        alert('Por favor completa todos los campos obligatorios (*).');
        return;
    }

    if (!terminos) {
        alert('Debes aceptar los Términos y Condiciones para continuar.');
        return;
    }

    // Crea el objeto con los datos de la reserva
    var nuevaReserva = {
        id:          Date.now(),   // número único basado en la hora actual
        restaurante: obtenerNombreRestaurante(),
        nombre:      nombre,
        apellido:    apellido,
        email:       email,
        telefono:    telefono,
        fecha:       fecha,
        hora:        hora,
        personas:    personas,
        zona:        zona,
        notas:       notas
    };

    // Lee las reservas que ya hay guardadas
    var reservasGuardadas = localStorage.getItem('reservas');
    var lista = reservasGuardadas ? JSON.parse(reservasGuardadas) : [];

    // Agrega la nueva reserva a la lista
    lista.push(nuevaReserva);

    // Guarda la lista actualizada
    localStorage.setItem('reservas', JSON.stringify(lista));

    // Muestra el modal de éxito (Bootstrap)
    var modal = new bootstrap.Modal(document.getElementById('modalExito'));
    modal.show();

    // Limpia el formulario
    document.getElementById('nombre').value   = '';
    document.getElementById('apellido').value = '';
    document.getElementById('email').value    = '';
    document.getElementById('telefono').value = '';
    document.getElementById('fecha').value    = '';
    document.getElementById('hora').value     = '';
    document.getElementById('personas').value = 2;
    document.getElementById('zona').value     = '';
    document.getElementById('notas').value    = '';
    document.getElementById('terminos').checked = false;
}



function obtenerNombreRestaurante() {
    var params = new URLSearchParams(window.location.search);
    return params.get('restaurante') || 'Restaurante';
}