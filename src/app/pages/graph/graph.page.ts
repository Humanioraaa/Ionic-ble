import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.page.html',
  styleUrls: ['./graph.page.scss'],
})
export class GraphPage implements OnInit {
  ecgData: number[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const data = this.route.snapshot.paramMap.get('data');
    if (data) {
      this.ecgData = JSON.parse(data);
      this.createGraph();
    }
  }

  createGraph() {
    new Chart('ecgChart', {
      type: 'line',
      data: {
        labels: this.ecgData.map((_, index) => index.toString()),
        datasets: [{
          label: 'ECG Signal',
          data: this.ecgData,
          borderColor: 'rgb(75, 192, 192)',
          fill: false,
        }],
      },
      options: {
        scales: {
          x: { display: true },
          y: { display: true, min: Math.min(...this.ecgData), max: Math.max(...this.ecgData) },
        },
      },
    });
  }
}
