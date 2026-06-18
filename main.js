const PRECIO_FUTBOL = 150;
const PRECIO_BALONCESTO = 100;
const PRECIO_VOLEIBOL = 75;

let reservas = JSON.parse(localStorage.getItem('reservas')) || [];

let tabla;

$(document).ready(function () {

    $('#titulo').hide().fadeIn(1500);

    tabla = $('#tabla').DataTable();

    cargarReservas();

    actualizar();

    document.getElementById('formReserva')
        .addEventListener('submit', guardarReserva);

    $('#tabla tbody').on('click', '.btnEliminar', function () {

        let fila = tabla.row($(this).parents('tr'));
        let indice = fila.index();

        reservas.splice(indice, 1);

        localStorage.setItem(
            'reservas',
            JSON.stringify(reservas)
        );

        fila.remove().draw();

        actualizar();

        Swal.fire({
            icon: 'success',
            title: 'Reserva eliminada',
            text: 'La reserva fue eliminada correctamente'
        });

    });

});

function guardarReserva(e) {

    e.preventDefault();

    let nombre = document.getElementById('nombre').value;
    let telefono = document.getElementById('telefono').value;
    let fecha = document.getElementById('fecha').value;
    let cancha = document.getElementById('cancha').value;

    if (nombre === '' || telefono === '' || fecha === '') {

        Swal.fire(
            'Error',
            'Complete todos los campos',
            'error'
        );

        return;

    } else {

        console.log('Validación correcta');

    }

    let precio = 0;

    switch (cancha) {

        case 'Fútbol':
            precio = PRECIO_FUTBOL;
            break;

        case 'Baloncesto':
            precio = PRECIO_BALONCESTO;
            break;

        default:
            precio = PRECIO_VOLEIBOL;

    }

    let reserva = {
        nombre,
        telefono,
        fecha,
        cancha,
        precio
    };

    reservas.push(reserva);

    let contador = 0;

    while (contador < reservas.length) {
        contador++;
    }

    localStorage.setItem(
        'reservas',
        JSON.stringify(reservas)
    );

    tabla.row.add([
        nombre,
        telefono,
        fecha,
        cancha,
        'Q' + precio,
        '<button class="btn btn-danger btnEliminar">Eliminar</button>'
    ]).draw();

    actualizar();

    Swal.fire({
        icon: 'success',
        title: 'Reserva Guardada',
        text: 'La reserva se registró correctamente'
    });

    document.getElementById('formReserva').reset();

    $('#tabla').hide().slideDown();

}

function cargarReservas() {

    for (let i = 0; i < reservas.length; i++) {

        tabla.row.add([
            reservas[i].nombre,
            reservas[i].telefono,
            reservas[i].fecha,
            reservas[i].cancha,
            'Q' + reservas[i].precio,
            '<button class="btn btn-danger btnEliminar">Eliminar</button>'
        ]).draw();

    }

}

function actualizar() {

    document.getElementById('total').textContent =
        reservas.length;

}
