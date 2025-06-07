export function computeHealthData(
  { nutrition, water, distance, reminders },
  typeChien = "compagnie",
  profil = "normal",
  sleepHours = null
) {
  // Multiplicateurs selon type et profil
  const typeMultiplier = {
    compagnie: 1.0,
    travail: 1.2,
    sportif: 1.4,
    senior: 0.8,
  };

  const profilMultiplier = {
    normal: 1.0,
    élevé: 1.2,
    "très élevé": 1.4,
    elite: 1.6,
  };

  // Calcule le multiplicateur global d'effort
  const tMult = typeMultiplier[typeChien.toLowerCase()] || 1.0;
  const pMult = profilMultiplier[profil.toLowerCase()] || 1.0;
  const effortMultiplier = (tMult + pMult) / 2;

  // Objectif de distance ajusté
  const objectifDistance = 3.0 * effortMultiplier;
  const activite_physique = objectifDistance
    ? Math.min(100, Math.round((distance / objectifDistance) * 100))
    : 0;

  // Calcul de l'énergie
  let energie = 0;
  if (nutrition.calories_target > 0) {
    energie = Math.round(
      (nutrition.calories_current / nutrition.calories_target) * 100
    );
  }

  // Influence de l’hydratation sur l’énergie
  const waterPercent =
    water.target > 0 ? (water.current / water.target) * 100 : 0;

  if (waterPercent > 80) energie = Math.min(100, energie + 10);
  if (waterPercent < 50) energie = Math.max(0, energie - 10);

  // Sommeil estimé
  let sommeil = 50;
  if (sleepHours !== null) {
    sommeil = Math.round((sleepHours / 8) * 100); // 8h étant la cible
  } else {
    if (activite_physique > 70 && waterPercent > 80) {
      sommeil = 90;
    } else if (activite_physique > 70) {
      sommeil = 70;
    }
  }

  // Rappel de soins
  const totalReminders = reminders.length;
  const doneReminders = reminders.filter((r) => r.status === "Terminé").length;
  const regularite =
    totalReminders === 0
      ? 0
      : Math.round((doneReminders / totalReminders) * 100);

  return {
    activite_physique,
    energie,
    sommeil,
    regularite,
  };
}

export function computeVitality(scores) {
  const { activite_physique, energie, sommeil, regularite } = scores;

  // Pondérations (modifiables selon l’importance souhaitée)
  const poids = {
    activite_physique: 1,
    energie: 1,
    sommeil: 1.2,       // sommeil légèrement priorisé
    regularite: 0.8     // régularité légèrement moins pondérée
  };

  const totalPoids = poids.activite_physique + poids.energie + poids.sommeil + poids.regularite;

  const score =
    (activite_physique * poids.activite_physique +
      energie * poids.energie +
      sommeil * poids.sommeil +
      regularite * poids.regularite) / totalPoids;

  return Math.round(score);
}

export function computeSleepScore({ sleepHours, wakeEvents = 0, bedtime, waketime }) {
  let score = 0;

  // Durée de sommeil optimale entre 10h et 14h
  if (sleepHours >= 12) score += 50;
  else if (sleepHours >= 10) score += 40;
  else if (sleepHours >= 8) score += 30;
  else score += 15;

  // Nombre de réveils dans la nuit (si disponible)
  if (wakeEvents === 0) score += 30;
  else if (wakeEvents <= 2) score += 20;
  else score += 10;

  // Cohérence des horaires (si fournis)
  if (bedtime && waketime) {
    const diff = Math.abs(new Date(`1970-01-01T${bedtime}`) - new Date(`1970-01-01T${waketime}`));
    const hours = diff / (1000 * 60 * 60);
    if (hours >= 10 && hours <= 14) score += 20;
    else score += 10;
  }

  return Math.min(100, Math.round(score));
}
