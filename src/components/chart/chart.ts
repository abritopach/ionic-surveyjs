import { Component, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

/**
 * Generated class for the ChartComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'chart',
  templateUrl: 'chart.html'
})
export class ChartComponent {

  @ViewChild('chartCanvas') chartCanvas;
	myChart: any;

  constructor() {
    console.log('Hello ChartComponent Component');
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit CharComponent');
    this.drawChart('doughnut');
    
  }

  drawChart(chartType) {
    switch (chartType)
    {
      case 'doughnut':
        this.createDoughnutChart();
        break;
      // TODO: Other chart types.
      /*
      case :
        break;
      */
    }
  }

  createDoughnutChart() {
    this.myChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#FF6384",
            "#36A2EB",
            "#FFCE56"
          ]
        }]
      }
    });
  }

}
