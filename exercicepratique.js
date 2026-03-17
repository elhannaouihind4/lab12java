class Article {
    constructor(prix) {
        this._prix = prix;
    }
    
    set prix(v) {
        if (v < 0) throw new Error("Prix invalide");
        this._prix = v;
    }
    
    get prix() {
        return this._prix;
    }
}

// Test
try {
    const article = new Article(10);
    console.log("Prix initial:", article.prix);
    
    article.prix = 15;
    console.log("Nouveau prix:", article.prix);
    
    article.prix = -5; // Cela va générer une erreur
} catch (error) {
    console.log("Erreur:", error.message);
}
class Livre {
    constructor(titre, auteur, pages) {
        this.titre = titre;
        this.auteur = auteur;
        this.pages = pages;
    }
    
    static fromJSON(json) {
        const data = JSON.parse(json);
        return new Livre(data.titre, data.auteur, data.pages);
    }
    
    afficher() {
        console.log(`${this.titre} par ${this.auteur} (${this.pages} pages)`);
    }
}

// Test
const jsonLivre = '{"titre":"Le Petit Prince","auteur":"Saint-Exupéry","pages":93}';
const livre = Livre.fromJSON(jsonLivre);
livre.afficher();
class Paiement {
    constructor(montant) {
        this.montant = montant;
    }
    
    effectuer() {
        console.log(`Paiement de ${this.montant}€ effectué`);
    }
}

class PaiementCarte extends Paiement {
    effectuer() {
        console.log(`Paiement de ${this.montant}€ effectué par carte bancaire`);
    }
}

class PaiementCash extends Paiement {
    effectuer() {
        console.log(`Paiement de ${this.montant}€ effectué en espèces`);
    }
}

// Test
const paiements = [
    new PaiementCarte(50),
    new PaiementCash(30),
    new Paiement(20)
];

paiements.forEach(paiement => {
    paiement.effectuer();
});
class Livre {
    constructor(titre, auteur) {
        this.titre = titre;
        this.auteur = auteur;
    }
    
    toString() {
        return `${this.titre} (${this.auteur})`;
    }
}

class Catalogue {
    constructor() {
        this.categories = new Map();
    }
    
    ajouterLivre(categorie, livre) {
        if (!this.categories.has(categorie)) {
            this.categories.set(categorie, []);
        }
        this.categories.get(categorie).push(livre);
    }
    
    getLivresParCategorie(categorie) {
        return this.categories.get(categorie) || [];
    }
    
    afficherCatalogue() {
        for (const [categorie, livres] of this.categories) {
            console.log(`\nCatégorie: ${categorie}`);
            livres.forEach(livre => console.log(`  - ${livre.toString()}`));
        }
    }
}

// Test
const catalogue = new Catalogue();

const livre1 = new Livre("Le Petit Prince", "Saint-Exupéry");
const livre2 = new Livre("L'Étranger", "Camus");
const livre3 = new Livre("Fondation", "Asimov");

catalogue.ajouterLivre("Roman", livre1);
catalogue.ajouterLivre("Roman", livre2);
catalogue.ajouterLivre("Science-Fiction", livre3);

catalogue.afficherCatalogue();

console.log("\nLivres de la catégorie Roman:");
catalogue.getLivresParCategorie("Roman").forEach(livre => {
    console.log(`  - ${livre.toString()}`);
});