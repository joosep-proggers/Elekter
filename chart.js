const ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.width = window.innerWidth * 0.95;
ctx.canvas.height = window.innerHeight * 0.5;

tänaneKuupäev = new Date()
kuu = tänaneKuupäev.getMonth() + 1

tänaneKuupäevAPIsse = tänaneKuupäev.getFullYear() + '-' + kuu + '-' + tänaneKuupäev.getDate()

homneKuupäev = new Date()
homneKuupäev.setDate(homneKuupäev.getDate() + 1)
homneKuupäevAPIsse = homneKuupäev.getFullYear() + '-' + kuu + '-' + homneKuupäev.getDate()

/*
// SIIN OLI ÕLEKÕRT VAJA!! (seda me ei saanud)
// APIst info otse chartile

async function apiFetchPrice(algTimeStamp, lõppTimeStamp)
{
    let päevHinnad = [];
    const response = await fetch('https://dashboard.elering.ee/api/nps/price?start=' + algTimeStamp + '%2000%3A00&end=' + lõppTimeStamp + '%2000%3A00');
    var data = await response.json();
    console.log('DATA: ' + data.data.ee)
    for (var i = 0; i < data.data.ee.length; i++) {
        päevHinnad.push(data.data.ee[i].price)
    }
    console.log(päevHinnad)
    return await Promise.resolve(päevHinnad)
}


//let apiData1 = await apiFetchPrice(tänaneKuupäevAPIsse, homneKuupäevAPIsse).then(apiData => console.log('PROMISE: ' + apiData1));
//let apiData1 = apiFetchPrice(tänaneKuupäev, homneKuupäevAPIsse)
let apiData1 = apiFetchPrice(tänaneKuupäevAPIsse, homneKuupäevAPIsse).then(apiData => console.log('PROMISE: ' + apiData1));
*/

// Graafikule jooksvad andmed
let arr_backgroundColor = []
let arr_data = [15.64,108.44,107.65,106.09,16.91,80.08,166.62,226.32,174.91,150.81,195.6,186.02,137.65,133.16,180.09,176.28,166.47,180.09,180.26,144.69,128.65,119.02,102.93,65.07]
let avg_price = 135.39
let peak = Math.max.apply(null, arr_data)

for (let i = 0; i < arr_data.length; i++) {
    let price = arr_data[i];
    if (price < avg_price) {
        arr_backgroundColor.push('rgba(0,255,0, 1)');
    } else {
        arr_backgroundColor.push('rgba(255, 0, 0, 1)');
    }
}

// Graafik
const myChart = new Chart(ctx, {

    label: 'Elektrihind Tunni Kohta',
    data: avg_price,
    type: 'bar',
    color: '#999',
    data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00','06:00', '07:00', '08:00', '09:00', '10:00','11:00', '12:00', '13:00', '14:00', '15:00', '16:00','17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'],
        color: 'rgba(0,255,0, 1)',
        datasets: [{

            type: 'line',
            label: 'Päeva keskmine EUR/MWh',
            data: [avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price,avg_price, avg_price],
            borderColor: 'rgb(255,215,0)',
        },{
            type: 'bar',
            label: 'Tunni maksumus EUR/MWh',
            data: arr_data,
            // TODO: Võta keskmine hind ja võrrelda seda uue hinnaga KUI uus hind on keskmisest hinnast hinnast soodsam, siis on uus hind rohelist värvi muidu punast.
            backgroundColor: arr_backgroundColor,
            borderWidth: 4
        }]
    },
    options: {
        maintainAspectRatio: false,
        responsive: false,
        plugins: {
            legend: {
                display: false
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Hind - €',
                    color: 'white',
                },
                min: 0,
                max: Math.round(peak) + 10,
                ticks: {
                    stepSize: 20,
                    color: 'white'
                }
            },
            xAxis: {
                ticks: {
                    stepSize: 1,
                    color: 'white'
                }
            }
        }
    }
});