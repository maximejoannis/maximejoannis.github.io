/* global Chart, document, window */

const chartFont = "Poppins, system-ui, -apple-system, sans-serif";
Chart.defaults.font.family = chartFont;
Chart.defaults.color = '#64748b';
Chart.defaults.animation.duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 700;

const campaignCanvas = document.querySelector('#campaignChart');
if (campaignCanvas) {
  new Chart(campaignCanvas, {
    type: 'doughnut',
    data: {
      labels: ['API', 'Accessibilité', 'E2E', 'Mockés', 'Visuel'],
      datasets: [{ data: [2, 12, 24, 69, 3], backgroundColor: ['#2563eb', '#16a34a', '#ea580c', '#e3a72f', '#7c3aed'], borderColor: '#ffffff', borderWidth: 3, hoverOffset: 8 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: '57%',
      plugins: {
        legend: { position: 'bottom', labels: { usePointStyle: true, pointStyle: 'circle', padding: 22, font: { size: 13, weight: 600 } } },
        tooltip: { callbacks: { label: context => `${context.label} : ${context.raw} exécution${context.raw > 1 ? 's' : ''}` } }
      }
    }
  });
}

const priorityCanvas = document.querySelector('#priorityChart');
if (priorityCanvas) {
  new Chart(priorityCanvas, {
    type: 'bar',
    data: {
      labels: ['P0 — Critique', 'P1 — Important', 'P2 — Complémentaire', 'P3 — Confort'],
      datasets: [{ label: 'Couverture', data: [100, 83.9, 62.5, 0], backgroundColor: ['#2563eb', '#2563eb', '#2563eb', '#cbd5e1'], borderRadius: 12, borderSkipped: false, maxBarThickness: 150 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { font: { weight: 600 } } },
        y: { beginAtZero: true, max: 100, ticks: { stepSize: 25, callback: value => `${value}%` }, grid: { color: '#e2e8f0', borderDash: [5, 5] } }
      },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: context => `Couverture : ${context.raw.toLocaleString('fr-FR')} %` } } }
    }
  });
}
