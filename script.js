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
        // nameList.appendChild(htmlLine);
    }

    function generateLine(plan) {
        var lineSpan = document.createElement('span');
        var companyNameSpan = document.createElement('span');
        companyNameSpan.classList.add('company-name');
        companyNameSpan.appendChild(document.createTextNode(plan.entreprise));
        var planAnnee = plan.annee ? '(' + plan.annee + ')' : '';
        lineSpan.appendChild(companyNameSpan);
        lineSpan.innerHTML += ' : ' + plan.nbEmployes + '  employés ' +planAnnee+' ' + plan.ville + ' &bull; ';

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

    var nameList = document.getElementById('name-list');

    var request = new XMLHttpRequest();
    request.open('GET', 'https://raw.githubusercontent.com/PlansDe/plans_de/main/table.csv', true);

    request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
        // Success!
        var rows = request.responseText.split('\n');
        rows
            .filter(x => x)
            .forEach(row => {
                var fields = row.split(',');
                console.log(fields);
                var planLicenciement = {
                    ville: fields[1],
                    entreprise: fields[0],
                    annee: fields[5].replace('\r',''),
                    nbEmployes: fields[4]
                }
                var htmlLine = generateLine(planLicenciement);
                nameList.appendChild(htmlLine);
                    });
    } else {
        // We reached our target server, but it returned an error
    }
    };

    request.onerror = function() {
    // There was a connection error of some sort
    };

    request.send();
})()