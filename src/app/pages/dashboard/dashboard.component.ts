import { GameConfig } from './../../services/get-config/get-config.d';
import { ConfingService } from './../../services/get-config/get-config.service';
import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import * as moment from 'moment';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;
  public configData: GameConfig;
  public good;
  public bad;

  constructor(private config: ConfingService){
  }

    getGoodAnsDataByDate(){
      let lastDate = this.configData.stats[0].answers.time;
      let value = 0;
      const goodAnsByDay = []

      this.configData.stats.forEach(data => {
        const currentDate = data.answers.time;
        if(lastDate.toLocaleDateString() === currentDate.toLocaleDateString()){
          value += data.answers.good;
        } else {
          goodAnsByDay.push(value);
          value = 0;
          value += data.answers.good;
        }
        lastDate = currentDate;
      });
      goodAnsByDay.push(value);
      return goodAnsByDay;
    }

    getBadAnsDataByDate(){
      let lastDate = this.configData.stats[0].answers.time;
      let value = 0;
      const badAnsByDay = []

      this.configData.stats.forEach(data => {
        const currentDate = data.answers.time;
        if(lastDate.toLocaleDateString() === currentDate.toLocaleDateString()){
          value += data.answers.bad;
        } else {
          badAnsByDay.push(value);
          value = 0;
          value += data.answers.bad;
        }
        lastDate = currentDate;
      });
      badAnsByDay.push(value);
      return badAnsByDay;
    }

    getDateLabels(){
      let lastDate = this.configData.stats[0].answers.time;
      const labels = []

      this.configData.stats.forEach(data => {
        const currentDate = data.answers.time;
        if(lastDate.toLocaleDateString() !== currentDate.toLocaleDateString()){
          labels.push(currentDate.toLocaleDateString())
        }
        lastDate = currentDate;
      });
      labels.push(lastDate.toLocaleDateString());
      return labels;
    }

    ngOnInit(){

      this.configData = this.config.getConfig();

      this.good = this.configData.stats.reduce((tank, second) => tank + second.answers.good, 0);
      this.bad = this.configData.stats.reduce((tank, second) => tank + second.answers.bad, 0);

      //const goodAsDataArray = this.configData.stats.map(data => data.answers.good);
      //const badAsDataArray = this.configData.stats.map(data => data.answers.bad);
      const goodAnsByDay = this.getGoodAnsDataByDate()
      const badAnsByDay = this.getBadAnsDataByDate()
      const dateLabels = this.getDateLabels();

      this.chartColor = "#FFFFFF";

      this.canvas = document.getElementById("chartHours");
      this.ctx = this.canvas.getContext("2d");

      this.chartHours = new Chart(this.ctx, {
        type: 'line',

        data: {
          labels: ['a', 'b'],//dateLabels,
          datasets: [{
              borderColor: "#6bd098",
              data: [4,8]//goodAnsByDay
            },
            {
              borderColor: "#f17e5d",
              data: [2,3]//badAnsByDay
            }
          ]
        },
        options: {
          legend: {
            display: false
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                fontColor: "#9f9f9f",
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "#ccc",
                color: 'rgba(255,255,255,0.05)'
              }
            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent",
                display: false,
              },
              ticks: {
                padding: 20,
                fontColor: "#9f9f9f"
              }
            }]
          },
        }
      });
    }
}
