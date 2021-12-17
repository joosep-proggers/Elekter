var slider = document.getElementById("range");
var output = document.getElementById("arvuTulemus");
let update = () => output.innerHTML = kellaAeg(slider.value);

// Kuvab konkreetse kellajavahemiku millega kasutaja võrdlema hakakb

function kellaAeg (slaider){
    let kell = ""
    if ((Number(curdayhour) + (Number(slaider)))>23){
        kell = (Number(curdayhour) + (Number(slaider) - 24)) + ":00 - " + (Number(curdayhour) + (Number(slaider) - 23)) + ":00 " + "Homme"
    }
    else
        kell = (Number(curdayhour) + Number(slaider)) + ":00 - " + (Number(curdayhour) + (Number(slaider) +1)) + ":00"
    return kell
}

// Slideri liigutamisel kutsutakse uuendatakse

slider.addEventListener('input', update);
update();
