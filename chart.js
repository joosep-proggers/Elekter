const ctx = document.getElementById('myChart').getContext('2d');
// Mahutab graafiku kasutaja aknale.
// SCALING TELEFONIS VEITS SUS
ctx.canvas.width = window.innerWidth * 0.95;
ctx.canvas.height = window.innerHeight * 0.5;
const myChart = new Chart(ctx, {
    type: 'bar',
    color: '#999',
    data: {

        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00','06:00', '07:00', '08:00', '09:00', '10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        fontColor: 'rgba(66, 245, 120, 0.8)',
        fontSize: 20,
        datasets: [{
            // TODO: Elektrihind ei tohiks olla roheline (bug imo)
            label: 'Elektrihind Tunni Kohta',
            // TODO: Kuidagi siia nordpool APIga andmed saada.
            data: [15.64, 148.44, 15.64, 108.44, 15.64, 108.44, 15.64, 108.44, 15.64, 108.44, 15.64, 108.44, 15.64, 108.44, 15.64, 137.65, 15.64, 108.44, 15.64, 108.44, 15.64, 108.44, 15.64, 108.44],
            // TODO: Võta eelmine hind ja võrrelda seda uue hinnaga KUI uus hind on eelmisest hinnast soodsam, siis on uus hind rohelist värvi muidu punast.
            backgroundColor: [
                'rgba(66, 245, 120, 0.8)',
                'rgba(245, 90, 66, 0.8)',
            ],
            borderWidth: 4
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: false,
        // EEMALDAB VÕIMALUSE LEGENDI PEITA
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            yAxis: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Value'
                },
                // Max peaks olema selle päeva kõige kõrgem elektrihind
                min: 0,
                max: 150,
                ticks: {
                    stepSize: 20
                }
            },
            // SEE VIST EI TEE MIDAGI
            xAxis: {
                ticks: {
                    stepSize: 1
                }
            }
        }
    }
});