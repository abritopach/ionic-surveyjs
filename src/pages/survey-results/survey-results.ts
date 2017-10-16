import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SurveyProvider } from '../../providers/survey/survey';

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
	results: any;
	surveys: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public surveyProvider: SurveyProvider) {

		this.surveys = [];
		this.surveyID = this.navParams.get('surveyID');

		this.surveyProvider.getSurveyResults(this.surveyID)
			.then(data => {
			console.log(data);
			this.results = JSON.parse(JSON.stringify(data));
			this.getSurveyData();
			}
		);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyResultsPage');
	}

	getSurveyData() {
		let keys;
		let json;
		for (let i = 0; i < this.results.length; i++) {
			//keys = Object.keys(this.results[i]);
			//console.log(keys);
			json = {};
			for(let key in this.results[i]) {
				let value = this.results[i][key];
				console.log("key: " + key + " value: " + value); 
				json[key] = value;
			}
			console.log(json);
			this.surveys.push(json);
			console.log("*************");
		}
	}

}
