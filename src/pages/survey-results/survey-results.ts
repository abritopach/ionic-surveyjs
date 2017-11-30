import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';

import { SurveyProvider } from '../../providers/survey/survey';

import { ChartsModalPage } from '../../modals/charts-modal';

import { SurveyResultsModel } from '../../models/survey.results.model';

/**
 * Generated class for the SurveyResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-survey-results',
  templateUrl: 'survey-results.html',
})
export class SurveyResultsPage {

	surveyID : string;
	surveys: any;
	keys: any;
	charData: any;
	results: any;
	surveyResults: SurveyResultsModel[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public surveyProvider: SurveyProvider,
			  public loadingCtrl: LoadingController, public modalCtrl: ModalController) {

		this.surveys = [];
		this.surveyID = this.navParams.get('surveyID');
		this.charData = [];

		let loading = this.loadingCtrl.create({
            content: "Loading Survey results..."
        });

		loading.present();
		
		this.surveyProvider.getSurveyResults(this.surveyID)
		.subscribe(
			data => {
				this.results = JSON.parse(JSON.stringify(data.Data));
				//console.log(this.results);
				this.surveyResults = SurveyResultsModel.fromJSONArray(data.Data);
				//console.log(this.results);
				if (this.results.length > 0) {
					this.keys = Object.keys(this.results[0]);
					this.keys = this.keys.splice(0, this.keys.length - 2);
					//console.log(this.keys);
					// Format Data to chart visualization.
					for (let i = 0; i < this.keys.length; i++) this.groupResultsByQuestion(i);
				}
				loading.dismiss();
			},
			error => {
				console.log(<any>error);
				loading.dismiss();
			}
		);
  }

  	ionViewDidLoad() {
		//console.log('ionViewDidLoad SurveyResultsPage');
	}

	groupResultsByQuestion(index) {
		let keys = this.keys;
		let res = this.results.reduce(function(res, currentValue) {
			//if (res.indexOf(currentValue[keys[index]]) === -1 ) {
			  res.push(currentValue[keys[index]]);
			//}
			//console.log(res);
			return res;
		  }, []);
		//console.log(res);
		this.charData.push(res);
	}

	openModal() {
		let modal = this.modalCtrl.create(ChartsModalPage, {'chartData': this.charData, 'questionsText': this.keys});
		modal.present();
	}

}
