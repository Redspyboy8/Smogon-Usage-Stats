// Adapted from Karthik99999's Radical Red Showdown
const Dex = require('../pokemon-showdown/dist/sim/dex').Dex.mod('gen8eliteredux');

keyLookup = {}
baseStats = {}
types = {}

for (const item of Dex.items.all()) {
    keyLookup[item.id] = item.name;
}

for (const move of Dex.moves.all()) {
    keyLookup[move.id] = move.name;
}

for (const ability of Dex.abilities.all()) {
    keyLookup[ability.id] = ability.name;
}

for (const species of Dex.species.all()) {
    baseStats[species.id] = species.baseStats;
    keyLookup[species.id] = species.name;
    types[species.id] = species.types;
}

for (const nature in Dex.data.Natures) {
    keyLookup[nature] = Dex.data.Natures[nature].name;
}

const FS = require("fs");
FS.writeFile('baseStats.json', JSON.stringify(baseStats), (err) => {
    if (err) throw err;
});
FS.writeFile('types.json', JSON.stringify(types), (err) => {
    if (err) throw err;
});
FS.writeFile('keylookup.json', JSON.stringify(keyLookup), (err) => {
    if (err) throw err;
});



// for (const item of Object.values(items)) {
//     keyLookup = item.name;
// }

// // for (const item of Dex.items.all()) {
// //     keyLookup = item.name;
// // }

// // for (const move of Object.values(moves)) {
// for (const move of Dex.moves.all()) {
//     // console.log(move)
//     keyLookup[move.id] = move.name;
// }

// for (const ability of Object.values(abilites)) {
// // for (const ability of Dex.abilities.all()) {
//     keyLookup[ability.id] = ability.name;
// }

// // for (const species of Object.values(pokedex)) {
// for (const species of Dex.species.all()) {
//     baseStats[species.id] = species.baseStats;
//     keyLookup[species.id] = species.name;
//     types[species.id] = species.types;
// }

// // for (const nature of Object.values(natures)) {
// for (const nature in Dex.data.Natures) {
//     keyLookup[nature] = Dex.data.Natures[nature].name;
// }

// const FS = require("fs");
// FS.writeFile('baseStats.json', JSON.stringify(baseStats), (err) => {
//     if (err) throw err;
// });
// FS.writeFile('types.json', JSON.stringify(types), (err) => {
//     if (err) throw err;
// });
// FS.writeFile('keylookup.json', JSON.stringify(keyLookup), (err) => {
//     if (err) throw err;
// });