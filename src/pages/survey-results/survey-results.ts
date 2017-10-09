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

  constructor(public navCtrl: NavController, public navParams: NavParams, public surveyProvider: SurveyProvider) {
	this.surveyID = this.navParams.get('surveyID');

	this.surveyProvider.getSurveyResults(this.surveyID)
	  .then(data => {
		console.log(data);
		this.results = JSON.parse(JSON.stringify(data));
	  }
	);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SurveyResultsPage');
  }

}
