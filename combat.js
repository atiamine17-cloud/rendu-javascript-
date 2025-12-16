// console.log('hello world!')
// let prenom1 = "amine"
// console.log(prenom1)
// let age = 20
// console.log(age)
// console.log("je m'appelle " +prenom1 +" ,j'ai "+ age + " ans")
// let prix = 15
// let budget = 20
// let depense = budget - prix;
// console.log(depense)
// let earthFlate = false
// if (earthFlate) {
//     console.log(" la terre est plate ");
// } else {
//     console.log(" la terre n'est pas plate");
// }
// let prenom = prompt( "quel est votre prénom ? ")
// console.log(` votre prénom est ${prenom}`);
// const code = "0000"
// let userCode = prompt("Entrez le code du coffre")
// if(code === userCode){
//     console.log (" le coffre est ouvert");
// } else {
//     console.log("code faux ");

// }

// function helloworld() {
// console.log(" helloworld !")
// }

// helloworld()

// function greets(prenom1) {
//     console.log(`Bonjour ${prenom1} !`);
// }

// greets("amine")

// function addition ( prix, budget){
//  console.log (prix + budget );
// }

// addition(15,5)

// function opperation(prix, budget, depense){
// if (code === userCode){
//     console.log (prix + budget);
// } else {
//     console.log (depense);
// }
// }
// opperation(prix, budget, depense)

// exo machine à café 
// const price = 1.45
// const clients = 21
// const waterCost = 60
// const coffeeCost = 8

// let income = 0
// let unluckyClients = 0
// let water = 300
// let coffe = 200

// for (let i = 1; i <= clients; i++) {
//      console.log(`Préparation du café n°${i}`);
    
//     if (water >= waterCost && coffee >= coffeeCost) {
//         // Consommation
//         water -= waterCost;
//         coffee -= coffeeCost;
//         income += price;
//     }
// }





// let fruit = ["pomme", "poire" , "banane" , ]
// console.log(fruit[1]);

// // for(const fruit of fruits) {
// //     console.log[fruits];
// // }

// // fruits.array.forEach(function(fruit) {
// //     console.log(fruit);
// //  })

// fruit.forEach(fruit => console.log[fruit])
// fruit.forEach(fruit => {
//     console.log(fruit)
// })

// let colors = ["blue" , "red" , "green"]
 
// colors.push('pink')
// console.log(colors);

// colors.splice(1,1)
// console.log(colors);

// let apples = [
//     "red apple",
//     "green apple",
//     "red apple",
//     "green apple",
//     "green apple",
//     " red apple",
//     "yellow apple",
//     " green apple",
//     "yellow apple" ,
//     " green apple",
// ]

// let (redApples = 0, greenApples= 0, yellowApples)

// for (const apple of apples) {
//     if (apple.toLowerCase()== "red apple"){
//         redApples++
//     } else if (apple.toLowerCase()== "green apple"){
//         greenApples++
//     }else if (apple.toLowerCase()== "yellow apple"){
//         yellowApples++
//     }
// }

// console.log (redApples , "pomme rouge");
// console.log ("pomme jaune", yellowApples);
// console.log ("pomme verte", greenApples);

// let carte = {
//     name:'chevalier',
//     city:' paris ',
//     size:'1m80' ,
//     sentMsg: false
// }

// let personnes = [amine, timéo, sawda, kenny]


// personnes.forEach(function (person){
//     if (person, age >= 18) {
//         person.
//     }
// })

// let noInvites= personnes
//  .filter


let fighter1 = {
    name: "kenny",
    hp: 100,
    attackDmg: 15,
    accuracy: 0.7,

    verifierPrecision: function() {
        return Math.random() < this.accuracy;
    },
    
      attaquer: function(fighter2) {
        console.log(`${this.name} tente d'attaquer ${fighter2.name} !`);

        if (this.verifierPrecision()) {
           fighter2.hp = fighter2.hp - this.attackDmg;
           if (fighter2.hp<0) {
            fighter2.hp=0;
           }
            console.log(`Touché ! ${fighter2.name} perd ${this.attackDmg} PV.`);
        } else {
            console.log("ECHOUEYYY");
        }
        
        console.log(`PV restants de ${fighter2.name} : ${fighter2.hp}`);
    }
        
    }

let fighter2 = {
    name: "timéo",
    hp: 115,
    attackDmg: 13,
    accuracy: 0.6,

    verifierPrecision: function() {
        return Math.random() < this.accuracy;
    },

    attaquer: function(fighter1) {
        console.log(` ${this.name} tente d'attaquer ${fighter1.name} ! `);

        if (this.verifierPrecision()) {
           fighter1.hp = fighter1.hp - this.attackDmg;
           if (fighter1.hp<0) {
            fighter1.hp=0;
           }
            console.log(`Touché ! ${fighter1.name} perd ${this.attackDmg} PV.`);
        } else {
            console.log("ECHOUEYYY");
        }
        
        console.log(`PV restants de ${fighter1.name} : ${fighter1.hp}`);
    }
}

  while(fighter1.hp > 0 && fighter2.hp>0){

    fighter1.attaquer(fighter2);
    if(fighter2.hp <= 0) {
        console.log(`${fighter2.name} est mort ! ${fighter1.name} gagne !`);
        console.log( " FIN DU COMBAT");
        break; 
   }
   
    fighter2.attaquer(fighter1);
    if(fighter2.hp <= 0) {
        console.log(`${fighter2.name} est mort ! ${fighter1.name} gagne !`);
        console.log( " FIN DU COMBAT");
        break;
     
  }
}