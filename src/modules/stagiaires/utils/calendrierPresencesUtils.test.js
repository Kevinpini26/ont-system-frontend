import { describe, expect, it } from 'vitest';
import { ajouterMois, dateStr, joursDuMois, libelleMois, pad, todayStr, ymKey } from './calendrierPresencesUtils';

describe('pad', () => {
  it('ajoute un zéro devant un nombre à un chiffre', () => {
    expect(pad(3)).toBe('03');
  });

  it('laisse un nombre à deux chiffres inchangé', () => {
    expect(pad(12)).toBe('12');
  });
});

describe('dateStr', () => {
  it('formate en YYYY-MM-DD avec zéros de tête', () => {
    expect(dateStr(2026, 3, 5)).toBe('2026-03-05');
  });
});

describe('todayStr', () => {
  it("retourne la date du jour au format YYYY-MM-DD (pas ISO/UTC)", () => {
    // Vérifie qu'on utilise bien les composants locaux (getFullYear/getMonth/
    // getDate), pas toISOString() qui peut décaler d'un jour selon le
    // fuseau horaire du navigateur.
    const attendu = dateStr(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate());
    expect(todayStr()).toBe(attendu);
  });
});

describe('ymKey', () => {
  it('extrait "YYYY-MM" d\'une date complète', () => {
    expect(ymKey('2026-07-19')).toBe('2026-07');
  });
});

describe('ajouterMois', () => {
  it('avance dans le même mois calendaire', () => {
    expect(ajouterMois('2026-03', 2)).toBe('2026-05');
  });

  it('bascule sur l\'année suivante en franchissant décembre', () => {
    expect(ajouterMois('2026-11', 2)).toBe('2027-01');
  });

  it('recule et bascule sur l\'année précédente en franchissant janvier', () => {
    expect(ajouterMois('2026-01', -1)).toBe('2025-12');
  });

  it('gère un delta de plusieurs années', () => {
    expect(ajouterMois('2026-06', -18)).toBe('2024-12');
  });
});

describe('libelleMois', () => {
  it('produit un libellé français lisible', () => {
    expect(libelleMois('2026-08')).toBe('Août 2026');
  });

  it('gère correctement janvier (index 0)', () => {
    expect(libelleMois('2027-01')).toBe('Janvier 2027');
  });
});

describe('joursDuMois', () => {
  it('retourne le bon nombre de jours pour un mois de 31 jours', () => {
    expect(joursDuMois('2026-08')).toHaveLength(31);
  });

  it('retourne le bon nombre de jours pour un mois de 30 jours', () => {
    expect(joursDuMois('2026-09')).toHaveLength(30);
  });

  it('gère février en année bissextile (29 jours)', () => {
    expect(joursDuMois('2028-02')).toHaveLength(29);
  });

  it('gère février en année non bissextile (28 jours)', () => {
    expect(joursDuMois('2026-02')).toHaveLength(28);
  });

  it('associe chaque jour à sa date et son jour de semaine JS natif', () => {
    // 2026-08-01 est un samedi (jourSemaine natif JS : 6).
    const jours = joursDuMois('2026-08');
    expect(jours[0]).toEqual({ dateStr: '2026-08-01', jourSemaine: 6 });
    expect(jours[jours.length - 1]).toEqual({ dateStr: '2026-08-31', jourSemaine: 1 });
  });
});
