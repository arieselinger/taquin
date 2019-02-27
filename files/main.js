n = prompt("Valeur de n ?");
taille = 500;
pas = taille/n;
var grille = [] ;
var blanc_i = 0;
var blanc_j = 0;
var grilleInit = [];

function aleatoire(k) { 
    return (Math.floor((k)*Math.random())); 
};

function initialiserGrille() {
    var k = 1;
    for(var i = 0; i<n; i++){
        l1 = [];
        l2 = [];
        for(var j = 0; j<n; j++){
            if (k!=n*n) {
                l1.push(k);
                l2.push(k);
                k++;
            }
            else {
                l1.push(-1)
                l2.push(-1)
            }
        };
        grille.push(l1);
        grilleInit.push(l2);
    };
};

function trouvePosInit(valeur) {
    j = (valeur - 1) % n ; 
    i = (valeur - j - 1)/n ;
    return [i,j]
}

function creerCellule(i,j) {
    caseElt = document.createElement("td");
    caseElt.addEventListener('click', () => gestionClic(i,j));
    if (grille[i][j] != -1) {
        caseElt.id = "case"+String(grille[i][j]);

        pos_init = trouvePosInit(grille[i][j]);
        caseElt.style.backgroundImage = "url('biausser.jpg')";
        caseElt.style.backgroundSize = String(taille)+"px "+String(taille)+"px";
        caseElt.style.backgroundPosition = "-"+String(pos_init[1]*pas)+"px "+"-"+String(pos_init[0]*pas)+"px";
        caseElt.style.height = String(pas)+"px";
        caseElt.style.width = String(pas)+"px";

    }
    else {
        caseElt.id = "blanc"
        caseElt.style.height = String(pas)+"px";
        caseElt.style.width = String(pas)+"px";
    }
    return caseElt;
}

function afficherGrille() {
    tableElt = document.createElement("table");
    for(var i = 0; i<n ; i++){
        ligne = document.createElement("tr");
        for(var j = 0; j<n ; j++)
        {
            caseElt = creerCellule(i,j);
            ligne.appendChild(caseElt);
        };
        tableElt.appendChild(ligne);
        tableElt.style.width = String(taille)+"px";
        tableElt.style.height = String(taille)+"px";
    };
    document.getElementById("jeu").innerHTML = "";
    if (compareGrille(grille, grilleInit)){
        document.getElementById("jeu").appendChild(tableElt);

        document.getElementById("blanc").style.boxShadow = "0px 0px 30px inset green";
        document.getElementById("blanc").textContent = "Gagné";

        tableElt.style.boxShadow = "0px 0px 30px green";
        setTimeout(() => {
            alert("Bravo, vous avez reconstitué Mr. Hervé Biausser ! Félicitations")
        }, 100);
    }
    else {
        document.body.style = ""
        document.getElementById("jeu").appendChild(tableElt);
        tableElt.style.boxShadow = "0px 0px 10px grey";
    }
};

function trouveBlanc(){
    for (var i = 0; i<n ; i++){
        for (var j = 0; j<n ; j++) {
            if (grille[i][j] == -1) {
                blanc_i = i;
                blanc_j = j;
            }
        }
    }
};

function gestionClic(i,j){
    var delta_i = i - blanc_i ;
    var delta_j = j - blanc_j ;
    if ((Math.abs(delta_i) == 1) && (delta_j == 0) || (Math.abs(delta_j) == 1) && (delta_i ==0)){
        grille[blanc_i][blanc_j] = grille[i][j];
        grille[i][j] = -1;
        blanc_i = i;
        blanc_j = j;
        afficherGrille();
    };
};

function compareGrille(g1,g2) {
    for (var i = 0 ; i<n ; i++){
        for (var j = 0 ; j<n ; j++){
            if (g1[i][j]!=g2[i][j]) 
            {
                return false;
            }
        }
    }
    return true;
}

function echange(i1,j1,i2,j2){
    temp = grille[i1][j1];
    grille[i1][j1] = grille[i2][j2];
    grille[i2][j2] = temp;
};

function melangeGrille(){
    for(var k = 0; k<500*n ; k++){
        delta_i = aleatoire(3)-1;
        delta_j = aleatoire(3)-1;
        if ((blanc_i+delta_i >= 0) && (blanc_i+delta_i < n)) {
            echange(blanc_i,blanc_j,blanc_i+delta_i,blanc_j);
            blanc_i += delta_i ;
        }
        else if ((blanc_j+delta_j >= 0) && (blanc_j+delta_j < n)){
            echange(blanc_i,blanc_j,blanc_i,blanc_j+delta_j);
            blanc_j += delta_j ; 
            
        }
    }
};

initialiserGrille();
trouveBlanc();
melangeGrille();
afficherGrille();