class Personne {
  constructor(prenom, nom) {
    this.prenom = prenom;
    this.nom = nom;
  }
  nomComplet() { return `${this.prenom} ${this.nom}`; }
}

const p1 = new Personne("Lina", "Durand");
const p2 = new Personne("Amar", "Kaci");
console.log(p1.nomComplet());
console.log(p2.nomComplet());

class Compteur {
  static nbInstances = 0;     
  #val = 0;                    
  constructor(initial = 0) {
    this.#val = initial;
    Compteur.nbInstances++;
  }
  inc() { this.#val++; }
  get valeur() { return this.#val; }       
  set valeur(v) { if (Number.isInteger(v)) this.#val = v; }
}

const c1 = new Compteur(1);
const c2 = new Compteur();
c1.inc();
console.log(c1.valeur);         
console.log(Compteur.nbInstances); 

class CompteBancaire {
  #solde = 0;
  constructor(soldeInitial = 0) {
    if (soldeInitial < 0) throw new Error("Solde initial invalide");
    this.#solde = soldeInitial;
  }
  crediter(montant) { if (montant > 0) this.#solde += montant; }
  debiter(montant) {
    if (montant <= 0) return;
    if (montant > this.#solde) throw new Error("Fonds insuffisants");
    this.#solde -= montant;
  }
  get solde() { return this.#solde; }
}

const cb = new CompteBancaire(100);
cb.debiter(30);
console.log(cb.solde); 

class Article {
  constructor({ titre = "(Sans titre)", prix = 0, stock = 0 } = {}) {
    if (prix < 0 || stock < 0) throw new Error("Valeurs invalides");
    this.titre = titre;
    this.prix = prix;
    this.stock = stock;
  }
  enStock() { return this.stock > 0; }
}

const a = new Article({ titre: "Stylo", prix: 1.2, stock: 10 });
const b = new Article();
console.log(a.enStock(), b.titre);

class Animal {
  constructor(nom) { this.nom = nom; }
  parler() { return `${this.nom} fait un bruit.`; }
}

class Chien extends Animal {
  parler() { return `${this.nom} aboie.`; } 
}

class Chat extends Animal {
  parler() { return `${this.nom} miaule.`; }
}

const animaux = [new Chien("Rex"), new Chat("Mina")];
for (const a of animaux) console.log(a.parler()); 

class Vehicule {
  constructor(marque) { this.marque = marque; }
  info() { return `Véhicule ${this.marque}`; }
}

class Voiture extends Vehicule {
  constructor(marque, portes = 4) {
    super(marque);
    this.portes = portes;
  }
  info() { return `${super.info()} avec ${this.portes} portes`; }
}

console.log(new Voiture("Renault", 5).info());

class Panier {
  constructor() { this.lignes = []; }
  ajouter(article, quantite = 1) {
    const exist = this.lignes.find(l => l.article === article);
    exist ? (exist.qte += quantite) : this.lignes.push({ article, qte: quantite });
  }
  total() { return this.lignes.reduce((s, l) => s + l.article.prix * l.qte, 0); }
}

const stylo = new Article({ titre: "Stylo", prix: 1.2, stock: 10 });
const panier = new Panier();
panier.ajouter(stylo, 3);
console.log(panier.total()); 
