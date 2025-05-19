const ctx = document.getElementById('moneyChart').getContext('2d');

    const chartDataSets = {
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        credits: [32, 45, 12, 11, 35, 20, 11, 18, 7, 11, 6, 48],
        debit:   [14, 9, 54, 20, 14, 33, 0.5, 10, 28, 24, 40, 26]
      },
      weekly: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        credits: [12, 8, 15, 9],
        debit:   [10, 14, 5, 12]
      },
      yearly: {
        labels: ['2021', '2022', '2023', '2024'],
        credits: [200, 300, 250, 280],
        debit:   [180, 260, 220, 240]
      }
    };

    const createChart = (type) => {
      const dataSet = chartDataSets[type];

      return new Chart(ctx, {
        type: 'bar',
        data: {
          labels: dataSet.labels,
          datasets: [
            {
              label: 'Credits',
              data: dataSet.credits,
              backgroundColor: '#20c997',
              borderRadius: 3,
              barPercentage: 0.75,
            },
            {
              label: 'Debit',
              data: dataSet.debit,
              backgroundColor: '#2d6cdf',
              borderRadius: 3,
              barPercentage: 0.75,
            }
          ]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function(value) {
                  return value + ' AED';
                }
              },
              grid: {
                color: '#a0a0a040',
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          },
          plugins: {
            legend: {
               display:false,
              labels: {
                boxWidth: 12,
                display:false,
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return `${context.dataset.label}: ${context.parsed.y} AED`;
                }
              }
            }
          }
        }
      });
    };

    let currentChart = createChart('monthly');

    function toggleDataset(index, element) {
    const meta = currentChart.getDatasetMeta(index);
    meta.hidden = meta.hidden === null ? !currentChart.data.datasets[index].hidden : null;
    currentChart.update();
    element.classList.toggle('hidden');
  }

    document.querySelectorAll('.tab').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const type = tab.getAttribute('data-type');
        currentChart.destroy();
        currentChart = createChart(type);
      });
    });