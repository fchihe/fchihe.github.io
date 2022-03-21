<script>
export default {
    props : ["LibelleDepartement","CodeCirco", "score", "AbstentionPourcent", "Inscrits", "Exprime", "scores"],
    data() {
    return {


    }
  }
  }
</script>

<template>
 <h3>{{LibelleDepartement}} n°{{CodeCirco}}</h3>
        <div class="carte-content">
         <div class="score">{{score}}</div>  
         
         </div>
         <div style="display: flex;">
         
           <div >
            <div>Abstention: {{AbstentionsPourcent}}%</div>

         <div>1% : {{Math.round(Inscrits/100)}} inscrits</div>
        <div> <strong> 1% : {{Math.round(Exprime/100)}} exprimés</strong></div>
        </div>
        <ul>
           <li v-for="score in scores">
           {{score.id}} {{Math.round(score.score/score*100)/100}}
           </li>
           
           </ul>
        </div>
</template>

