hetkeHind = document.querySelector("#hetke_hind")
keskmineHind = document.querySelector("#keskmine_hind")

// kell
var clock = document.getElementById('clock');

function time() {
    var d = new Date();
    var s = d.getSeconds();
    var m = d.getMinutes();
    var h = d.getHours();
    clock.textContent =
        ("0" + h).substr(-2) + ":" + ("0" + m).substr(-2) + ":" + ("0" + s).substr(-2);
}
setInterval(time, 1000);

/*
let hind = '15.67 €/MWh'
let kell = '00.00-01.00'
let email = 'joosep-elias.toru@khk.ee'
*/
// meili saatmine hetkel manuaalselt lehelt tammekand.ee/mail

/*function sendEmail(email, kell, hind) {
    Email.send({
        SecureToken : "9d135ff4-2cbb-4795-8429-96cc972c022a",
        To : email,
        From : "axel.tammekand@khk.ee",
        Subject : "Madala Hinna teavitus!",
        Body : `Kell: ${kell} on elektri hinnaks ${hind}`
    }).then(
       console.log("mail sent")
    );
}
sendEmail(email, kell, hind)
*/


tänaneKuupäev = new Date()
kuu = tänaneKuupäev.getMonth() + 1

tänaneKuupäevAPIsse = tänaneKuupäev.getFullYear() + '-' + kuu + '-' + tänaneKuupäev.getDate()

homneKuupäev = new Date()
homneKuupäev.setDate(homneKuupäev.getDate() + 1)
homneKuupäevAPIsse = homneKuupäev.getFullYear() + '-' + kuu + '-' + homneKuupäev.getDate()


function drawUI( data ) {
    praeguneTund = tänaneKuupäev.getHours()
    hetkeHind.innerHTML = (data[praeguneTund].price / 1000.).toFixed(3) + "€/kWh"
}


async function apiFetchPrice(algTimeStamp, lõppTimeStamp){
    fetch('https://dashboard.elering.ee/api/nps/price?start=' + algTimeStamp + '%2000%3A00&end=' + lõppTimeStamp + '%2000%3A00')
    .then(response => response.json())
    .then(data=>{
        drawUI(data.data.ee)
    });
}

apiFetchPrice(tänaneKuupäevAPIsse, homneKuupäevAPIsse)

let vaikeVäärtused = {
    "ventilaator": 50,
    "boiler": 2000,
    "radiaator": 1800,
    "veekeetja": 2200,
    "ahi": 1000,
    "pesumasin": 500
}

let multiplier = 700

function vaheArvutus(kordaja, ankur1, ankur2) {
    tulemus = Math.round(((ankur1 * kordaja) - (ankur2 * kordaja))* 1000) / 1000
    return tulemus
}

const d = new Date();
let curdayhour = d.getHours();
let tunnijada = [19.06, 19.15, 18.79, 21.1, 70, 176.68, 180.54, 196.89, 200.03, 199.84, 200.02, 196.04, 191.94, 204.02, 244.93, 280.22, 274.02, 208.78, 186.42, 165.43, 19.15, 18.79, 21.1, 70, 176.68, 180.54, 196.89, 200.03, 199.84, 200.02, 196.04, 191.94, 204.02, 244.93]
// Võtame juba ära olnud päeva tunnid
tunnijada = tunnijada.slice(curdayhour)


document.getElementById("range").setAttribute("max", tunnijada.length - 1);
document.getElementById("range").setAttribute("value",0);


function summation(){
    var Element = document.getElementById("arvuTulemus")
    Element.innerHTML = "Sääst: " + vaheArvutus((multiplier/1000000), tunnijada[0], tunnijada[document.getElementById("range").value]) + "€"
}


function multichange() {
    var multi1  = document.getElementById("dropvalue")
    console.log(multi1.innerText)
    var multi2 = multi1.innerText
    multiplier = vaikeVäärtused[multi2]
    console.log(multiplier)
    summation()
}