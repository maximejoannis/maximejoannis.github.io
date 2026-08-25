/* global Chart, document, window */

Chart.defaults.font.family = "Poppins, system-ui, -apple-system, sans-serif";
Chart.defaults.color = '#64748b';
Chart.defaults.animation.duration = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 700;

const campaignCanvas = document.querySelector('#sauceCampaignChart');
if (campaignCanvas) {
  new Chart(campaignCanvas, {
    type: 'doughnut',
    data: {
      labels: ['Réussies', 'Échecs attendus'],
      datasets: [{ data: [129, 3], backgroundColor: ['#16a34a', '#ea580c'], borderColor: '#ffffff', borderWidth: 3, hoverOffset: 8 }]
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

const priorityCanvas = document.querySelector('#saucePriorityChart');
if (priorityCanvas) {
  new Chart(priorityCanvas, {
    type: 'bar',
    data: {
      labels: ['P0 — 23/23', 'P1 — 19/19', 'P2 — 2/2'],
      datasets: [{ label: 'Couverture', data: [100, 100, 100], backgroundColor: ['#2563eb', '#4f46e5', '#0ea5e9'], borderRadius: 12, borderSkipped: false, maxBarThickness: 150 }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { grid: { display: false }, ticks: { font: { weight: 600 } } },
        y: { beginAtZero: true, max: 100, ticks: { stepSize: 25, callback: value => `${value}%` }, grid: { color: '#e2e8f0', borderDash: [5, 5] } }
      },
      plugins: { legend: { display: false }, tooltip: { callbacks: { label: context => `Couverture : ${context.raw} %` } } }
    }
  });
}
