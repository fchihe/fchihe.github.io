(function(){
    var n = 243520; // Nombre final du compteur
    var cpt = 0; // Initialisation du compteur
    var duree = 10; // Durée en seconde pendant laquel le compteur ira de 0 à 15
    var delta = Math.ceil((duree * 1000) / n); // On calcule l'intervalle de temps entre chaque rafraîchissement du compteur (durée mise en milliseconde)
    var node =  document.getElementById("compteur"); // On récupère notre noeud où sera rafraîchi la valeur du compteur
    
    function countdown() {
    var restant = n - cpt;
    var random = getRandomIntInclusive(1,1000);
    cpt = cpt + (Math.min(random,restant));
    node.innerHTML = cpt;
    if( cpt < n ) { 
     setTimeout(countdown, delta);
    }
    }
    
    function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
    }
    setTimeout(countdown, delta);
    })()