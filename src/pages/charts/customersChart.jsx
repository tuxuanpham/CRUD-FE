import React, { useState, useEffect } from 'react';
import Chart from 'chart.js/auto';

function CustomersChart ({ dataAna }) {
  console.log(dataAna);
  const [chartData, setChartData] = useState({});

  const colors = [];
  for (let i = 0; i < dataAna.length; i++) {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = (Math.floor(Math.random() * 9) + 1) / 10;
    const color = `rgba(${r}, ${g}, ${b}, ${a})`;
    colors.push(color);
  }

  const dataRate = [];
  dataAna.map((item) => {
    const amountWithoutCurrency = item.products.length;
    dataRate.push(amountWithoutCurrency);
  });

  useEffect(() => {
    const labels = [];
    const data = [];

    dataAna.forEach((employee) => {
      labels.push(employee.firstName);
      data.push(employee.products.length);
    });

    const chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Number orders of customers',
            data: dataRate,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      },

      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    setChartData(chart);
  }, [dataAna]);

  return (
    <div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default CustomersChart;
