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

    surveyID : string;
    postID: string;
    allowAccessResult: boolean;

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.surveyID = this.navParams.get('surveyID');
        this.postID = this.navParams.get('postID');
        this.allowAccessResult = this.navParams.get('allowAccessResult');

    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad SurveyDetailsPage');
    }
	
	getSurveyResults() {
		this.navCtrl.push(SurveyResultsPage, {
            surveyID: this.surveyID, 
            allowAccessResult: this.allowAccessResult
        });
	}

}
