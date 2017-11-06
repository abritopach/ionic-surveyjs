import { Component, ViewChild, Input } from '@angular/core';
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
  myChartData: any;
  @Input()
  set chartData(data: Array<Object>) {
      this.myChartData = data;
      //console.log(this.myChartData);
      if (typeof this.myChartData != 'undefined') {
        this.getLabels();
        this.getValues();
        this.drawChart('doughnut');
      } 
      
  }

  constructor() {
    //console.log('Hello ChartComponent Component');
  }

  ngAfterViewInit() {
    //console.log('ngAfterViewInit CharComponent');    
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

  getLabels() {
    let labels = this.myChartData.filter((v, i, a) => a.indexOf(v) === i); 
    return labels;
  }

  getValues() {
    let values = this.myChartData.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
    return Object.keys(values).map(key => values[key]);
  }

  createDoughnutChart() {
    this.myChart = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: this.getLabels(),
        datasets: [{
          label: 'Resultados',
          data: this.getValues(),
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
