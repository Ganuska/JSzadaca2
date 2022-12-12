const raceContainer = document.getElementById("raceContainer");
const btnContainer = document.getElementById("btnContainer");
const duljinaPuta = document.getElementById("duljina");
const pobjednik = document.getElementById("pobjednik");
const utrka = document.getElementById("utrka");
class Auto {
  constructor(brzina, ime, boja) {
    this.brzina = brzina;
    this.boja = boja;
    this.ime = ime;
  }
}
let auti = [];
const handleSubmit = (e) => {
  e.preventDefault();
  const autoBrzina = document.getElementById("brzina").value;
  const autoBoja = document.getElementById("boja").value;
  const autoIme = document.getElementById("nadimak").value;
  const novi = (brzina = autoBrzina, ime = autoIme, boja = autoBoja) => {
    auti.push(new Auto(brzina, ime, boja));
    raceContainer.innerHTML = auti
      .map((auto) => {
        return `<div class='autoPodatci'> <h2>ime auta: ${auto.ime}</h2>
      <h5>boja auta:<div style='background-color:${auto.boja}; width:70px; display:inline-block; color:white;'>${auto.boja}</div></h5>
      <h5>brzina auta:${auto.brzina} km/h</h5>
        </div>
        `;
      })
      .join(" ");
  };

  novi();

  auti.length && btnContainer.classList.add("visibleBtn");
  window.scrollTo(0, document.body.scrollHeight);
};

const startUtrke = () => {
  const sortirano = auti.sort((a, b) => {
    return parseInt(b.brzina) - parseInt(a.brzina);
  });

  duljinaPuta.value
    ? (utrka.innerHTML = sortirano.map((vozilo, index) => {
        return `<div class='boxCar' style='background-color:${
          vozilo.boja
        }; animation-duration:${
          duljinaPuta.value / ((sortirano[index].brzina * 1000) / 3600)
        }s; animation-name:vozi;color:white' >${vozilo.ime}</div>
    <h3>${sortirano[index].ime} je utrku prosao za ${(
          duljinaPuta.value /
          ((sortirano[index].brzina * 1000) / 3600)
        ).toFixed(2)} s</h3>
    `;
      }))
    : (utrka.innerHTML = "niste zadali duljinu");
  if (sortirano.length > 1) {
    if (sortirano[0].brzina > sortirano[1].brzina) {
      pobjednik.innerHTML = `<h1> pobjednik je  ${sortirano[0].ime}</h1> <button class="btn" onClick="reset()">RESTART</button>`;
      window.scrollTo(0, document.body.scrollHeight);
    } else {
      pobjednik.innerHTML = `<h1>ima vise pobjednika</h1> <button class="btn" onClick="reset()">RESTART</button>`;
      window.scrollTo(0, document.body.scrollHeight);
    }
  } else {
    pobjednik.innerHTML = "";
    window.scrollTo(0, document.body.scrollHeight);
  }
};

const reset = () => {
  location.reload();
};
