(function() {
    var n = 243520; // Nombre final du compteur
    var cpt = 0; // Initialisation du compteur
    var duree = 10; // Durée en seconde pendant laquel le compteur ira de 0 à 15
    var delta = Math.ceil((duree * 1000) / n); // On calcule l'intervalle de temps entre chaque rafraîchissement du compteur (durée mise en milliseconde)
    var node = document.getElementById("compteur"); // On récupère notre noeud où sera rafraîchi la valeur du compteur

    var entreprises = ['Orange', 'Technip', 'Alstom', 'Alcatel-Lucent', 'Thomson', 'SFR', 'NPM Aluminium'];
    var villes = ['Nantes', 'Angers', 'Paris', 'Marseille', 'Clermont-Ferrand', 'La Rochelle', 'Saint-Barthélémy d\'Anjou'];
    
    var maxAleatoireEntreprise = entreprises.length - 1;
    var maxAleatoireVille = villes.length - 1;
    var nameList = document.getElementById('name-list');
    for (let i = 0; i < 200; i++) {
        var planLicenciement = {
            ville: villes[getRandomIntInclusive(0, maxAleatoireVille)],
            entreprise: entreprises[getRandomIntInclusive(0, maxAleatoireEntreprise)],
            annee: getRandomIntInclusive(2000, 2021),
            nbEmployes: getRandomIntInclusive(1, 1000)
        }
        var htmlLine = generateLine(planLicenciement);
        nameList.appendChild(htmlLine);
    }

    function generateLine(plan) {
        var lineSpan = document.createElement('span');
        var companyNameSpan = document.createElement('span');
        companyNameSpan.classList.add('company-name');
        companyNameSpan.appendChild(document.createTextNode(plan.entreprise));

        lineSpan.appendChild(companyNameSpan);
        lineSpan.innerHTML += ' : ' + plan.nbEmployes + '  employés (' + plan.annee + ') ' + plan.ville + ' &bull; ';

        return lineSpan;
    }

    function countdown() {
        var restant = n - cpt;
        var random = getRandomIntInclusive(1, 1000);
        cpt = cpt + (Math.min(random, restant));
        node.innerHTML = cpt;
        if (cpt < n) {
            setTimeout(countdown, delta);
        }
    }

    function getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    setTimeout(countdown, delta);
})()