$(document).ready(function() {
    // Recuperar la información del usuario desde localStorage
    var usuario = JSON.parse(localStorage.getItem('usuario'));
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
                $('#date').val(`${year}-${(month + 1).toString().padStart(2, '0')}-${i.toString().padStart(2, '0')}`);
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

    form.submit(function(event) {
        event.preventDefault();

        const name = $('#name').val();
        const date = $('#date').val();
        const time = $('#time').val();
        const servicio = $('#servicio').val();

        if (name && date && time && servicio) {
            // Aquí puedes enviar los datos a tu backend para agendar la cita
            console.log(`Nombre: ${name}, Fecha: ${date}, Hora: ${time}, Servicio: ${servicio}`);
            alert('Cita agendada exitosamente');
            form[0].reset();
        } else {
            alert('Por favor complete todos los campos');
        }
    });
});
