$(document).ready(function() {
    var usuario = JSON.parse(localStorage.getItem('usuario'));
    console.log(usuario.id);
    if (usuario) {
        $("#user_name").text(usuario.nombre);
    } else {
        window.location.href = 'index.html';
    }

    const calendar = $('#calendar');
    const form = $('#appointmentForm');
    const monthSelect = $('<select id="month"></select>');
    const yearSelect = $('<select id="year"></select>');

    for (let month = 0; month < 12; month++) {
        const option = $('<option></option>').val(month).text(new Date(2024, month, 1).toLocaleString('es-ES', { month: 'long' }));
        monthSelect.append(option);
    }

    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year <= currentYear + 5; year++) {
        const option = $('<option></option>').val(year).text(year);
        yearSelect.append(option);
    }

    calendar.before(monthSelect);
    calendar.before(yearSelect);

    function updateCalendar(month, year) {
        calendar.empty();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        for (let i = 1; i <= daysInMonth; i++) {
            const day = $('<div></div>').text(i);
            day.click(function() {
                $('#fecha').val(`${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
            });
            calendar.append(day);
        }
    }

    const currentMonth = new Date().getMonth();
    const currentYearVal = new Date().getFullYear();

    monthSelect.val(currentMonth);
    yearSelect.val(currentYearVal);

    updateCalendar(currentMonth, currentYearVal);

    monthSelect.change(function() {
        updateCalendar(parseInt($(this).val()), parseInt(yearSelect.val()));
    });

    yearSelect.change(function() {
        updateCalendar(parseInt(monthSelect.val()), parseInt($(this).val()));
    });

    
    const timeSelect = $('#hora');
    function populateTimeSelect() {
        const times = [];
        const addTimes = (start, end) => {
            for (let hour = start; hour < end; hour++) {
                for (let minutes = 0; minutes < 60; minutes += 15) {
                    const time = `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
                    times.push(time);
                }
            }
        };
        addTimes(8, 14); 
        addTimes(16, 20); 

        times.forEach(time => {
            const option = $('<option></option>').val(time).text(time);
            timeSelect.append(option);
        });
    }
    populateTimeSelect();

    form.submit(function(event) {
        event.preventDefault();
        const fecha = $('#fecha').val();
        const hora = $('#hora').val();
        const servicio = $('#servicio').val();
        const barbero = $('#barbero').val();
        insertCita(fecha, hora, servicio,barbero);
        if (fecha && hora && servicio && barbero) {
            
            console.log(`Nombre:${usuario.id} , Fecha: ${fecha}, Hora: ${hora}, Servicio: ${servicio}, barbero: ${barbero}`);
            
            form[0].reset();
        } else {
            alert('Por favor complete todos los campos');
        }
    });

    function insertCita(fecha, hora, servicio,barbero) {
        return $.ajax({
            type: 'POST',
            url: '../php/insertCita.php',
            data: {
                Cliente: usuario.id,
                Fecha: fecha,
                Hora: hora,
                Servicio: servicio,
                ID_barbero: barbero,
            },
            dataType: 'json',
            error: function(e) {
                console.error(e);
            }
        });
    }

    function loadBarberos() {
        $.ajax({
            type: 'GET',
            url: '../php/obtenerbarberos.php',
            dataType: 'json',
            success: function(data) {
                const barberoSelect = $('#barbero');
                data.forEach(barbero => {
                    const option = $('<option></option>').val(barbero.Nombre).text(barbero.Nombre);
                    barberoSelect.append(option);
                });
            },
            error: function(e) {
                console.error(e);
            }
        });
    }
    loadBarberos();
    CargarServicios();
    function CargarServicios() {
        $.ajax({
            type: 'GET',
            url: '../php/obtenerservicios.php',
            dataType: 'json',
            success: function(data) {
                const servicioSelect = $('#servicio');
                data.forEach(servicio => {
                    const option = $('<option></option>').val(servicio.Nombre).text(servicio.Nombre);
                    servicioSelect.append(option);
                });
            },
            error: function(e) {
                console.error(e);
            }
        });
    }
    
    CargarServicios();
    
});
