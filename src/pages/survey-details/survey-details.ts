import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SurveyResultsPage } from '../survey-results/survey-results';

/**
 * Generated class for the SurveyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-survey-details',
    templateUrl: 'survey-details.html',
})
export class SurveyDetailsPage {

    currentYear = new Date().getFullYear();
    survey: any;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.survey = this.navParams.get('survey');
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad SurveyDetailsPage');
    }
	
	getSurveyResults() {
		this.navCtrl.push(SurveyResultsPage, {
            survey: this.survey
        });
	}

}
