//EXO1/
for (let i = 1; i <= 10; i++) {
  console.log(`7 x ${i} = ${7 * i}`);
}

//EXO2//
let note = 15; 
switch (note) {
  case 20:
  case 19:
  case 18:
    console.log("Excellent");
    break;
    case 14:
    case 15:
    case 16:
    case 17:
    console.log("bien");
    break;
    case 10:
    case 11:
    case 12:
    case 13:
      console.log("passable");
      break;
    default:
    console.log("insuffisant")
    break

  
}
//EXO3//

function calculerPrix(prixHT, tva) {
let prixttc
prixttc = prixHT + prixHT * tva/100
return prixttc.toFixed(2)
}
console.log(calculerPrix(100,20));

//Exercice noté //
let prenom = "amine"
let notes = [5,14,6,12,9,1,3,10]

function calculerMoyenne(notes) {
let total = 0;

for (let i = 0; i < notes.length; i++) {
    total = total + notes[i];
}
  let resultat = total /notes.length;
  return parseFloat(resultat.toFixed(1))
}

console.log(calculerMoyenne(notes));