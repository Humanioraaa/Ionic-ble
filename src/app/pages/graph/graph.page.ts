import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'; // Import Chart.js

@Component({
  selector: 'app-graph',
  templateUrl: 'graph.page.html',
  styleUrls: ['graph.page.scss'],
})
export class GraphPage implements OnInit {

  chart: any; // To hold the chart instance

  ngOnInit() {
    this.createChart(); // Create the chart when the component is initialized
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;

    this.chart = new Chart(ctx, {
      type: 'line', // Type of chart: bar, line, pie, etc.
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'GSR Sensor',
          data: [65, 59, 80, 81, 56, 55, 40], // Data for the chart
          backgroundColor: 'rgba(63, 81, 181, 0.5)',
          borderColor: 'rgba(63, 81, 181, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true, // Make the chart responsive to window size
        scales: {
          x: {
            title: {
              display: true,
              text: 'Second'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Indicators'
            }
          }
        }
      }
    });
  }

}
