// ==UserScript==
// @name         Terrena-Pro DSI
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Mode Kiosque Terrena Pro
// @author       You
// @match        https://www.terrena-pro.fr/*
// @match        https://b2cterrena.b2clogin.com/*
// @icon         https://www.terrena-pro.fr/content/images/favicon_terrena_pro.png
// @grant        none
// @source       https://raw.githubusercontent.com/fchihe/fchihe.github.io/main/script.js
// ==/UserScript==

(function() {

    function suppressionLiensDeconnexion(){
        // On recherche tous les liens de deconnexion
        let liens = document.querySelectorAll("a[href='/deconnexion']");
        for (let i = 0; i < liens.length; i++) {
            let lien = liens[i];

            // On supprime le lien
            lien.parentNode.removeChild(lien);
        }
    }
    function clickBtnSalarie(){
        let boutonSalarie = document.getElementById("TerrenaAADExchange");
        if (boutonSalarie) {
            boutonSalarie.click();
        }
    }
    console.log("Extension Terrena-Pro DSI activée");
    // Clic sur le bouton acces salarie si on est sur l'annuaire b2c
    setTimeout(clickBtnSalarie,500);

    // Suppression des liens de déconnexion sur le site Terrena Pro
    setTimeout(suppressionLiensDeconnexion,500);

    function rafraichirPage(){
        document.location.href = 'https://www.terrena-pro.fr/';
    }
    // On rafraichi la page toutes les 10 minutes et on reaffiche la page d'accueil afin de conserver la session
    setTimeout(rafraichirPage, 10 * 60 * 1000);

})();
