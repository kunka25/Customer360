document.addEventListener('DOMContentLoaded', function() {
const assetsData = [
   { label: 'Stock', value: 25.09, color: '#00C2FF' },
   { label: 'Fixed Deposit', value: 12.09, color: '#567CFF' },
   { label: 'Investment', value: 12.09, color: '#0025FF' },
   { label: 'Insurance', value: 12.09, color: '#21BF73' }
];

const liabilitiesData = [
   { label: 'Mortgage', value: 12.09, color: '#FBBF24' },
   { label: 'Loan', value: 12.09, color: '#22C55E' },
   { label: 'Overdraft', value: 12.09, color: '#3B82F6' },
   { label: 'Credit Card', value: 12.09, color: '#EF4444' }
];

let currentData = assetsData;
const ctx = document.getElementById('donutChart').getContext('2d');
const centerText = document.querySelector('.chart-center .value');
const currencyText = document.querySelector('.chart-center .currency');
const labelText = document.querySelector('.chart-center .label');
const listContainer = document.getElementById('assetList');

const total = (data) => data.reduce((sum, item) => sum + item.value, 0);
const borderColor = getComputedStyle(document.documentElement)
  .getPropertyValue('--donut-border')
  .trim();
let chart = new Chart(ctx, {
   type: 'doughnut',
   data: {
      labels: currentData.map(d => d.label),
      datasets: [{
         data: currentData.map(d => d.value),
         backgroundColor: currentData.map(d => d.color),
         borderWidth: 3,
         borderColor: borderColor,
         cutout: '75%',
         borderRadius:7
      }]
   },
   options: {
      plugins: { legend: { display: false } },
      onHover: (event, chartElement) => {
         if (chartElement.length > 0) {
            const index = chartElement[0].index;
            centerText.textContent = currentData[index].value.toFixed(2);
         } else {
            centerText.textContent = total(currentData).toFixed(2);
         }
         currencyText.textContent = ' AED';
      }
   }
});

function updateChart(dataSet, label) {
   currentData = dataSet;
   chart.data.labels = dataSet.map(d => d.label);
   chart.data.datasets[0].data = dataSet.map(d => d.value);
   chart.data.datasets[0].backgroundColor = dataSet.map(d => d.color);
   chart.update();

   centerText.textContent = total(dataSet).toFixed(2);
   currencyText.textContent = ' AED';
   labelText.textContent = label;

   listContainer.innerHTML = '';
   dataSet.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
      <div class="chart-items">
         <h6 class="dot" style="--bgs:${item.color}">${item.label}</h6>
         <span class="amount">${item.value.toFixed(2)} AED</span>
      </div>
       <span class="percent" style="--percentage:${item.color}30; --color:${item.color}">${Math.round((item.value / total(dataSet)) * 100)}%</span>`;
      listContainer.appendChild(li);
   });
}

document.getElementById('assetsBtn').addEventListener('click', () => {
   updateChart(assetsData, 'Assets');
   document.getElementById('assetsBtn').classList.add('active');
   document.getElementById('liabilitiesBtn').classList.remove('active');
});

document.getElementById('liabilitiesBtn').addEventListener('click', () => {
   updateChart(liabilitiesData, 'Liabilities');
   document.getElementById('liabilitiesBtn').classList.add('active');
   document.getElementById('assetsBtn').classList.remove('active');
});

// Initial load
updateChart(assetsData, 'Assets');

}, false);