export function detectAlerts(healthHistory) {
  const alerts = [];

  // Exemple 1 : Stress détecté 3 jours de suite
  const stressDays = healthHistory.slice(-3).filter(day => day.vitality < 50);
  if (stressDays.length === 3) {
    alerts.push({
      type: 'stress',
      message: '3 jours consécutifs avec une faible vitalité',
      severity: 'high',
    });
  }

  // Exemple 2 : prise de poids rapide
  const lastWeights = healthHistory.map(h => h.weight);
  if (lastWeights.length >= 2) {
    const diff = lastWeights.at(-1) - lastWeights.at(-2);
    if (diff > 0.5) {
      alerts.push({
        type: 'weight',
        message: `+${diff.toFixed(1)} kg depuis hier`,
        severity: 'medium',
      });
    }
  }

  return alerts;
}
