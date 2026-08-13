import { describe, expect, it } from 'vitest';
import { estTypeFerme, sontTousLesTypesFermes } from './disponibiliteDemandes';

describe('estTypeFerme', () => {
  it("retourne false tant qu'aucun type n'est sélectionné", () => {
    expect(estTypeFerme({ academique: false, professionnel: false }, '')).toBe(false);
  });

  it("retourne false tant que la disponibilité n'est pas encore chargée", () => {
    expect(estTypeFerme(null, 'academique')).toBe(false);
  });

  it('retourne true si le type sélectionné est fermé', () => {
    expect(estTypeFerme({ academique: false, professionnel: true }, 'academique')).toBe(true);
  });

  it('retourne false si le type sélectionné est ouvert, même si l\'autre est fermé', () => {
    expect(estTypeFerme({ academique: false, professionnel: true }, 'professionnel')).toBe(false);
  });
});

describe('sontTousLesTypesFermes', () => {
  it("retourne false tant que la disponibilité n'est pas encore chargée", () => {
    expect(sontTousLesTypesFermes(null)).toBe(false);
  });

  it('retourne false si un seul type est fermé', () => {
    expect(sontTousLesTypesFermes({ academique: true, professionnel: false })).toBe(false);
  });

  it('retourne true seulement si les deux types sont fermés', () => {
    expect(sontTousLesTypesFermes({ academique: false, professionnel: false })).toBe(true);
  });

  it('retourne false si les deux types sont ouverts', () => {
    expect(sontTousLesTypesFermes({ academique: true, professionnel: true })).toBe(false);
  });
});
