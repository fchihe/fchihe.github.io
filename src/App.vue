<script>
import json from './circos.json'

export default {
  data() {
    return {
      count: 0,
      circonscriptions : json,
      coefficients: [
        // {id : "PS" , valeur:0},
        {id : "FI" , valeur:1},
        {id : "FN" , valeur:1},
        {id : "REM" , valeur:0},
        {id : "DLF" , valeur:1},
      ],
      recherche :""
    }
  },
  computed: {
    circoTrie: function () {
      var coefFi = this.coefficientFi;
      var coefFn = this.coefficientFn;
      var coefDLF = this.coefficientDlf;
      var coefficients = this.coefficients;
      var recherche = this.recherche.toLowerCase()  ;
      var circos = this.circonscriptions.filter(x => x.LibelleDepartement.toLowerCase().includes(recherche));
      circos.forEach(circo => {
        var candidats = circo.ResultatsCandidats;
        circo.scores = [];
        coefficients.forEach(coef => 
        {
            var candidat = candidats.find(x => x.Nuance == coef.id);
            var score = 0;
            if(candidat)
              score = cleanValeur(candidat.VoixExprime * coef.valeur) ;
            circo.scores.push({id:coef.id, score :score});
        });
        
      circo.score = 0;
       circo.scores.forEach(x => circo.score += x.score);
       circo.score = cleanValeur(circo.score);
      });
      return circos.sort(compare);
      
    }
}
}
function compare( a, b ) {
  if ( a.score < b.score ){
    return 1;
  }
  if ( a.score > b.score ){
    return -1;
  }
  return 0;
}
function cleanValeur(valeur) {
  var val = Math.round(valeur*10)/10;
  return isNaN(val) ? 0 : val;
}
</script>

<template>

    <div class="wrapper">
      <div class="row">
        <div>

           <h3>Recherche</h3>
      <input class="form-control"  type="text" v-model="recherche"/>
      </div>
      <div class="filtres">
        <div class="filtre" v-for="coef in coefficients">
      <h3>Coefficient {{coef.id}}</h3>
      <input class="form-control"  type="number" step="0.05" v-model="coef.valeur"/>
      <input type="range" class="form-range" v-model="coef.valeur"  min="0" step="0.05" max="2"/>
      </div>
      </div>
      
            <div>

      <!-- <h3>Coefficient FN</h3>
      <input class="form-control"  type="number" step="0.05" v-model="coefficientFn"/>
      <input type="range" class="form-range" v-model="coefficientFn" min="0" step="0.05" max="2"/>
            </div>
                        <div>

            <h3>Coefficient DLF</h3>
      <input class="form-control"  type="number" step="0.05" v-model="coefficientDlf"/>
      <input type="range" class="form-range" v-model="coefficientDlf" min="0" step="0.05" max="2"/> -->
            </div>
      <div class="carte-container" >
        <div class="circo" v-for="circo in circoTrie">
        <h3>{{circo.LibelleDepartement}} n°{{circo.CodeCirco}}</h3>
        <div class="carte-content">
         <div class="score">{{circo.score}}</div>  
         
         </div>
         <div style="display: flex;">
         
           <div >
            <div>Abstention: {{circo.AbstentionsPourcent}}%</div>

         <div>1% : {{Math.round(circo.Inscrits/100)}} inscrits</div>
        <div> <strong> 1% : {{Math.round(circo.Exprime/100)}} exprimés</strong></div>
        </div>
        <ul>
           <li v-for="score in circo.scores">
           {{score.id}} {{score.score}}
           </li>
           
           </ul>
        </div>
        </div> 
      </div>
      
    </div>
</div>
</template>

<style>
@import './assets/base.css';
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css");
#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}
.carte-container{
  display:flex;
  width:1280px;
  flex-wrap: wrap;

}
h3{
  font-size: 1.2rem;;
}
.filtres{
  display: flex;
  width:1280px;
  flex-wrap: wrap;
}
.filtre{
  margin: 18px;
}
.score{
  font-size: 60px;
  font-weight: bold;
}
.carte-content
{
  display: flex;
   align-items: center;
  justify-content: center;
}
.circo{
  width: 290px;
  background-color: white;
  border: 1px solid grey;
    color:black;
  margin: 6px;
  padding: 20px;
  border-radius: 5px;
}
body{
  background-color: #0a71b4;
  color:white
}
ul {
    list-style-type: none;
    margin-bottom: 0;
}
</style>
