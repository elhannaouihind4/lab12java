class Livre {
  #disponible = true;
  constructor({ id, titre, auteur }) {
    this.id = id; this.titre = titre; this.auteur = auteur;
  }
  estDisponible() { return this.#disponible; }
  marquerEmprunte() { if (!this.#disponible) throw new Error("Déjà emprunté"); this.#disponible = false; }
  marquerRetour() { this.#disponible = true; }
}

class Membre {
  constructor({ id, nom }) { this.id = id; this.nom = nom; this.emprunts = []; }
  peutEmprunter() { return this.emprunts.filter(e => !e.dateRetour).length < 3; }
}

class Emprunt {
  constructor({ livre, membre, dateEmprunt = new Date(), dateRetour = null }) {
    this.livre = livre; this.membre = membre; this.dateEmprunt = dateEmprunt; this.dateRetour = dateRetour;
  }
  retourner() { this.dateRetour = new Date(); this.livre.marquerRetour(); }
}

class Bibliotheque {
  constructor() { this.livres = []; this.membres = []; this.historique = []; }
  ajouterLivre(livre) { this.livres.push(livre); }
  ajouterMembre(m) { this.membres.push(m); }
  trouverLivre(id) { return this.livres.find(l => l.id === id); }
  trouverMembre(id) { return this.membres.find(m => m.id === id); }
  emprunter(idLivre, idMembre) {
    const livre = this.trouverLivre(idLivre);
    const membre = this.trouverMembre(idMembre);
    if (!livre || !membre) throw new Error("Livre ou membre introuvable");
    if (!livre.estDisponible()) throw new Error("Livre indisponible");
    if (!membre.peutEmprunter()) throw new Error("Quota atteint");
    livre.marquerEmprunte();
    const emprunt = new Emprunt({ livre, membre });
    membre.emprunts.push(emprunt);
    this.historique.push(emprunt);
    return emprunt;
  }
  retourner(idLivre, idMembre) {
    const membre = this.trouverMembre(idMembre);
    const emprunt = membre?.emprunts.find(e => e.livre.id === idLivre && !e.dateRetour);
    if (!emprunt) throw new Error("Emprunt introuvable");
    emprunt.retourner();
    return emprunt;
  }
  livresDisponibles() { return this.livres.filter(l => l.estDisponible()); }
}


const bib = new Bibliotheque();
bib.ajouterLivre(new Livre({ id: 1, titre: "Clean Code", auteur: "R. Martin" }));
bib.ajouterLivre(new Livre({ id: 2, titre: "YDKJS", auteur: "K. Simpson" }));
bib.ajouterMembre(new Membre({ id: 1, nom: "Lina" }));

const emp = bib.emprunter(1, 1);
console.log("Emprunt:", emp.livre.titre, "par", emp.membre.nom);
console.log("Dispos:", bib.livresDisponibles().map(l => l.titre));
bib.retourner(1, 1);
console.log("Retourné. Dispos:", bib.livresDisponibles().map(l => l.titre));