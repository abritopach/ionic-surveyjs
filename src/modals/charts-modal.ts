import { Component } from '@angular/core';

import { ModalController, Platform, NavParams, ViewController } from 'ionic-angular';

@Component({
    selector: 'charts-modal',
    templateUrl: 'charts-modal.html'
})

export class ChartsModalPage {

    chartData: any;
    questionsText: any;
  
    constructor(
      public platform: Platform,
      public params: NavParams,
      public viewCtrl: ViewController
    ) {
        this.chartData = this.params.get('chartData');
        this.questionsText = this.params.get('questionsText');
    }
  
    dismiss() {
      this.viewCtrl.dismiss();
    }
  }