// Establece la fecha mínima como hoy,
// así el usuario no puede elegir fechas pasadas
document.addEventListener('DOMContentLoaded', function () {
    const hoy = new Date().toISOString().split('T')[0];
    document.getElementById('fecha').min = hoy;
});


// Se ejecuta al hacer clic en "Confirmar Reserva"
function confirmarReserva() {

    // Campos obligatorios que deben estar llenos
    const campos = [
        { id: 'nombre',   nombre: 'Nombre' },
        { id: 'apellido', nombre: 'Apellido' },
        { id: 'email',    nombre: 'Correo electrónico' },
        { id: 'telefono', nombre: 'Teléfono' },
        { id: 'fecha',    nombre: 'Fecha' },
        { id: 'hora',     nombre: 'Hora' },
    ];

    // Recorre cada campo y verifica que no esté vacío
    for (const campo of campos) {
        const input = document.getElementById(campo.id);

        if (input.value.trim() === '') {
            alert('Por favor completa el campo: ' + campo.nombre);
            input.focus();
            return; // Detiene la función si hay un campo vacío
        }
    }

    // Verifica que el checkbox de términos esté marcado
    if (!document.getElementById('terminos').checked) {
        alert('Debes aceptar los Términos y Condiciones.');
        return;
    }

    // Si todo está bien, muestra el modal de confirmación
    const modal = new bootstrap.Modal(document.getElementById('modalExito'));
    modal.show();
}