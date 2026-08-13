import { useState } from 'react';
import { telechargerRapportPeriodique } from '../api/rapportsApi';
import { Card, CardBody, CardHeader } from '../../../shared/components/ui/Card';
import { Button } from '../../../shared/components/ui/Button';
import { Field, inputClass } from '../../../shared/components/ui/Field';
import { Alert } from '../../../shared/components/ui/Alert';

const MOIS = [
  'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
  'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
];
const ANNEE_COURANTE = new Date().getFullYear();
const ANNEES = Array.from({ length: 6 }, (_, i) => ANNEE_COURANTE - i);

async function messageErreurBlob(err) {
  if (err.response?.data instanceof Blob && err.response.data.type === 'application/json') {
    try {
      const texte = await err.response.data.text();
      return JSON.parse(texte).message;
    } catch {
      return null;
    }
  }
  return err.response?.data?.message;
}

/**
 * Formulaire d'export du rapport périodique pour la tutelle — utilisé à la
 * fois par l'espace administrateur (AdminRapportsPage) et par l'espace DFP
 * (DfpStatistiquesPage), tous deux autorisés côté backend
 * (Gate genererRapportTutelle).
 */
export function RapportPeriodiqueForm() {
  const [type, setType] = useState('mois');
  const [annee, setAnnee] = useState(ANNEE_COURANTE);
  const [mois, setMois] = useState(new Date().getMonth() + 1);
  const [envoi, setEnvoi] = useState(false);
  const [erreur, setErreur] = useState(null);

  async function generer(e) {
    e.preventDefault();
    setErreur(null);
    setEnvoi(true);
    try {
      await telechargerRapportPeriodique({ type, annee, mois: type === 'mois' ? mois : undefined });
    } catch (err) {
      setErreur((await messageErreurBlob(err)) ?? 'Échec de la génération du rapport.');
    } finally {
      setEnvoi(false);
    }
  }

  return (
    <Card>
      <CardHeader title="Générer un rapport" description="Synthèse des courriers traités et des stagiaires accueillis par direction, sur la période choisie." />
      <CardBody>
        {erreur && <Alert tone="error" className="mb-4">{erreur}</Alert>}
        <form onSubmit={generer} className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="Type de période" htmlFor="type">
            <select id="type" className={inputClass} value={type} onChange={(e) => setType(e.target.value)}>
              <option value="mois">Mensuel</option>
              <option value="annee">Annuel</option>
            </select>
          </Field>
          <Field label="Année" htmlFor="annee">
            <select id="annee" className={inputClass} value={annee} onChange={(e) => setAnnee(Number(e.target.value))}>
              {ANNEES.map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </Field>
          {type === 'mois' && (
            <Field label="Mois" htmlFor="mois">
              <select id="mois" className={inputClass} value={mois} onChange={(e) => setMois(Number(e.target.value))}>
                {MOIS.map((label, index) => (
                  <option key={label} value={index + 1}>
                    {label}
                  </option>
                ))}
              </select>
            </Field>
          )}
          <div className="flex items-end sm:col-span-3">
            <Button type="submit" disabled={envoi}>
              {envoi ? 'Génération…' : 'Générer et télécharger le PDF'}
            </Button>
          </div>
        </form>
      </CardBody>
    </Card>
  );
}
