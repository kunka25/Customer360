document.addEventListener('DOMContentLoaded', function() {

// half donut 
const creditScore = 500;
const updatedDate = 'Updated Nov 24, 2022';

// Update DOM
document.getElementById('score').textContent = creditScore;
document.getElementById('updateDate').textContent = updatedDate;

// Calculate percentage
const maxScore = 850;
const percent = (creditScore / maxScore) * 100;

let scoreColor = '#2C7BE5';
if (creditScore < 580) scoreColor = '#FF3B30';
else if (creditScore >= 580 && creditScore < 670) scoreColor = '#FF9500';
else if (creditScore >= 670 && creditScore < 740) scoreColor = '#FFD60A';
else if (creditScore >= 740 && creditScore <= 850) scoreColor = '#2C7BE5';

// Draw Chart
new Chart(document.getElementById('creditChart').getContext('2d'), {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [percent, 100 - percent],
      backgroundColor: [scoreColor, '#cfcfcf33'],
      borderWidth: 0,
      cutout: '85%'
    }]
  },
  options: {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }
});
// close 

// risk factor code
const riskScore = 650;
const risk_maxScore = 850;
const risk_percent = (riskScore / risk_maxScore) * 100;

// Risk label and color
let riskText = 'Low';
let riskColor = '#FF3B30';
let barColor = '#FF3B30';
let stars = '★ ★ ★ ★ ☆';

if (riskScore < 580) {
  riskText = 'High'; barColor = '##3FC870'; stars = '★ ☆ ☆ ☆ ☆';
} else if (riskScore < 740) {
  riskText = 'Medium'; barColor = '#2F67FF'; stars = '★ ★ ★ ☆ ☆';
} else if (riskScore < 800) {
  riskText = 'Low'; barColor = '#FFA500'; stars = '★ ★ ★ ★ ☆';
} else {
  riskText = 'Very Low'; barColor = 'red'; stars = '★ ★ ★ ★ ★';
}

// Update DOM
document.getElementById('riskScore').textContent = riskScore;
document.getElementById('riskLabel').innerHTML = `Risk Factor: <span style="color:${barColor}">${riskText}</span>`;
document.querySelector('.crv-stars span').textContent = stars;

// Chart
new Chart(document.getElementById('riskChart').getContext('2d'), {
  type: 'doughnut',
  data: {
    datasets: [{
      data: [risk_percent, 100 - risk_percent],
      backgroundColor: [barColor, '#cfcfcf33'],
      borderWidth: 0,
      cutout: '85%'
    }]
  },
  options: {
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  }
});
}, false);