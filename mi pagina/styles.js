// ==============================
// FILTRADO POR CATEGORÍA (navbar)
// ==============================

// Selecciona todos los enlaces del nav que tienen data-categoria
var enlaces = document.querySelectorAll('.menu a[data-categoria]');

enlaces.forEach(function(enlace) {
    enlace.addEventListener('click', function(e) {
        e.preventDefault(); // evita que recargue la página

        var categoriaElegida = this.getAttribute('data-categoria');

        // Quita la clase "activo" de todos los enlaces
        enlaces.forEach(function(a) {
            a.classList.remove('activo');
        });

        // Le pone "activo" al que se hizo clic
        this.classList.add('activo');

        // Filtra las cards
        var todasLasCards = document.querySelectorAll('#lista-restaurantes > div[data-categoria]');
        var hayResultados = false;

        todasLasCards.forEach(function(card) {
            if (categoriaElegida === 'todas' || card.getAttribute('data-categoria') === categoriaElegida) {
                card.style.display = 'block';
                hayResultados = true;
            } else {
                card.style.display = 'none';
            }
        });

        // Muestra u oculta el mensaje de "sin resultados"
        var mensaje = document.getElementById('sin-resultados');
        if (hayResultados) {
            mensaje.style.display = 'none';
        } else {
            mensaje.style.display = 'block';
        }
    });
});


// ==============================
// MIS RESERVAS
// ==============================

// Lee las reservas guardadas en localStorage
function obtenerReservas() {
    var datos = localStorage.getItem('reservas');
    if (datos) {
        return JSON.parse(datos);
    }
    return [];
}

// Guarda la lista de reservas en localStorage
function guardarReservas(lista) {
    localStorage.setItem('reservas', JSON.stringify(lista));
}

// Muestra las reservas en pantalla
function mostrarReservas() {
    var contenedor = document.getElementById('contenedor-reservas');
    var sinReservas = document.getElementById('sin-reservas');
    var lista = obtenerReservas();

    // Borra lo que haya antes (menos el párrafo de "sin reservas")
    contenedor.innerHTML = '';

    if (lista.length === 0) {
        contenedor.innerHTML = '<p id="sin-reservas" style="text-align:center; color:#555; margin-top:20px;">No tienes reservas aún. ¡Haz tu primera reserva!</p>';
        return;
    }

    // Crea una tarjeta por cada reserva
    lista.forEach(function(reserva) {
        var tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta-reserva';

        tarjeta.innerHTML =
            '<div>' +
                '<p><strong>Restaurante:</strong> ' + reserva.restaurante + '</p>' +
                '<p><strong>Nombre:</strong> ' + reserva.nombre + ' ' + reserva.apellido + '</p>' +
                '<p><strong>Fecha:</strong> ' + reserva.fecha + '  |  <strong>Hora:</strong> ' + reserva.hora + '</p>' +
                '<p><strong>Personas:</strong> ' + reserva.personas + '  |  <strong>Zona:</strong> ' + (reserva.zona || 'No indicada') + '</p>' +
                (reserva.notas ? '<p><strong>Notas:</strong> ' + reserva.notas + '</p>' : '') +
            '</div>' +
            '<button class="btn-eliminar" onclick="eliminarReserva(' + reserva.id + ')">Eliminar</button>';

        contenedor.appendChild(tarjeta);
    });
}

// Elimina una reserva por su id
function eliminarReserva(id) {
    var lista = obtenerReservas();
    // Filtra y queda con todas menos la que tiene ese id
    var nueva = lista.filter(function(r) {
        return r.id !== id;
    });
    guardarReservas(nueva);
    mostrarReservas(); // vuelve a pintar
}

// Al cargar la página, muestra las reservas
mostrarReservas();