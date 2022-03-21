<script>
import json from './circos.json'

export default {
    data() {
        return {
            count: 0,
            circonscriptions: json,
            coefficients: [
                // {id : "PS" , valeur:0},
                { id: "FI", valeur: 1, valFiltre: 11, filtre: false },
                { id: "FN", valeur: 1, valFiltre: 13, filtre: false },
                { id: "REM", valeur: 0, valFiltre: 28, filtre: false },
                { id: "DLF", valeur: 1, valFiltre: 1, filtre: false },
            ],
            candidats: [],
            recherche: ""
        }
    },
    mounted() {
        for (let i = 0; i < this.circonscriptions.length; i++) {
            const circo = this.circonscriptions[i];
            var keyCirco = circo.CodeDepartement + "-" + circo.CodeCirco;
            this.candidats[keyCirco] = [];

            for (let j = 0; j < this.coefficients.length; j++) {
                const coef = this.coefficients[j];
                var candidat = circo.ResultatsCandidats.find(x => x.Nuance == coef.id);
                this.candidats[keyCirco][coef.id] = candidat;
            }
        }

    },
    computed: {
        circoFiltre: function () {
            var recherche = this.recherche;
            var circos = this.circonscriptions;
            var res = [];
            for (let i = 0; i < circos.length; i++) {
                var inclus = true;
                const circo = circos[i];
                if (recherche && recherche != "" && !circo.LibelleDepartement.toLowerCase().includes(recherche))
                    inclus = false;

                if (inclus)
                    res.push(circo);
            }
            return res;
        },
        circoTrie: function () {
            var candidats = this.candidats;
            var circos = this.circoFiltre;
            for (let index = 0; index < this.circoFiltre.length; index++) {
                const circo = this.circoFiltre[index];
                var keyCirco = circo.CodeDepartement + "-" + circo.CodeCirco;
                circo.keyCirco = keyCirco;
                circo.scores = [];
                circo.score = 0;
                for (let j = 0; j < this.coefficients.length; j++) {
                    const coef = this.coefficients[j];
                    if (candidats[keyCirco]) {
                        var candidat = candidats[keyCirco][coef.id];
                        var score = 0;
                        if (candidat && !(coef.filtre && candidat.VoixExprime < coef.valFiltre)) {
                            score = cleanValeur(candidat.VoixExprime * coef.valeur);
                            circo.score += score;
                        }
                        circo.scores.push({ id: coef.id, score: score });
                    }
                }
                circo.score = cleanValeur(circo.score);
            }

            return circos.sort(compare);

        }
    }
}
function compare(a, b) {
    if (a.score < b.score) {
        return 1;
    }
    if (a.score > b.score) {
        return -1;
    }
    return 0;
}
function cleanValeur(valeur) {
    var val = Math.round(valeur * 10) / 10;
    return isNaN(val) ? 0 : val;
}
</script>

<template>
    <div class="wrapper">
        <div class="row">
            <div>
                <h3>Recherche</h3>
                <input class="form-control" type="text" v-model="recherche" />
            </div>
            <div class="filtres">
                <div class="filtre" v-for="coef in coefficients">
                <!-- <img v-bind:src="('assets/' + coef.id + '.jpg')"/> -->
                    <h3>Coefficient {{ coef.id }}</h3>
                    <input class="form-control" type="number" step="0.05" v-model="coef.valeur" />
                    <input
                        type="range"
                        class="form-range"
                        v-model="coef.valeur"
                        min="0"
                        step="0.05"
                        max="2"
                    />
                    <h3>
                        <input type="checkbox" v-model="coef.filtre" />
                        Filtrer score >
                        <input type="number" v-model="coef.valFiltre" />
                    </h3>
                </div>
            </div>

            <div class="carte-container">
                <div class="circo" v-for="circo in circoTrie">
                    <h3>{{ circo.LibelleDepartement }} n°{{ circo.CodeCirco }}</h3>
                    <div class="abstention">(Abstention: {{ circo.AbstentionsPourcent }}%)</div>

                    <div class="carte-content">
                        <div class="score">{{ circo.score }}</div>
                    </div>
                    <div>
                        <div>
                            1% =
                            <strong>{{ Math.round(circo.Exprime / 100) }} exprimés</strong>
                            ({{ Math.round(circo.Inscrits / 100) }} inscrits)
                        </div>
                        <div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Poids</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="score in circo.scores">
                                        <td>
                                            <div
                                                class="couleur"
                                                :class="[(score.id == 'FI' ? 'c-fi' : ''), (score.id == 'REM' ? 'c-rem' : ''), (score.id == 'FN' ? 'c-fn' : ''), (score.id == 'DLF' ? 'c-dlf' : '')]"
                                            ></div>
                                            {{ score.id }}
                                        </td>
                                        <td>{{ Math.round(score.score / circo.score * 100) / 100 }}</td>
                                        <td>{{ (candidats[circo.keyCirco][score.id]?.VoixExprime ?? "") }} %</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
@import "./assets/base.css";
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: normal;
}
.c-fi {
    background-color: red;
}
.c-rem {
    background-color: yellow;
}
.c-fn {
    background-color: darkblue;
}
.c-dlf {
    background-color: blue;
}
.couleur {
    width: 15px;
    height: 15px;
    /* background-color: black; */
    border: 1px solid black;
    display: inline-block;
}
.abstention {
    color: gray;
}
.carte-container {
    display: flex;
    width: 1280px;
    flex-wrap: wrap;
}
h3 {
    font-size: 1.2rem;
}
.filtres {
    display: flex;
    width: 1280px;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
}
.filtre {
    margin: 18px;
}
.score {
    font-size: 60px;
    font-weight: bold;
}
.carte-content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.circo {
    width: 290px;
    background-color: white;
    border: 1px solid grey;
    color: black;
    margin: 6px;
    padding: 20px;
    border-radius: 5px;
}
body {
    background-color: #0a71b4;
    color: white;
}
ul {
    list-style-type: none;
    margin-bottom: 0;
}
</style>
