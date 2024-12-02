import { Component, OnInit } from '@angular/core';
import * as ApexCharts from 'apexcharts'; // Import ApexCharts sebagai objek

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {

  ngOnInit() {
    this.createChart(); // Buat grafik saat komponen diinisialisasi
  }

  createChart() {
    const options = {
      series: [
        {
          name: "GSR Sensor",
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false, // Nonaktifkan toolbar
        },
      },
      xaxis: {
        categories: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        title: {
          text: 'Second',
        },
      },
      yaxis: {
        title: {
          text: 'Indicators',
        },
      },
      title: {
        text: 'GSR Sensor Data',
        align: 'center',
      },
    };

    const chart = new ApexCharts(document.querySelector('#chart'), options); // Inisialisasi grafik
    chart.render(); // Render grafik
  }
}
