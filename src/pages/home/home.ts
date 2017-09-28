import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { SurveyProvider } from '../../providers/survey/survey';
import { SurveyDetailsPage } from '../survey-details/survey-details';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    surveys: any;

    constructor(public navCtrl: NavController, public surveyProvider: SurveyProvider,
                public loadingCtrl: LoadingController) {

        let loading = this.loadingCtrl.create({
            content: "Loading Surveys..."
        });

        loading.present();
        this.surveyProvider.getActiveSurveys()
            .then(data => {
                //console.log(data);
                this.surveys = data;
                loading.dismiss();
            }
        );
    }

    selectedSurvey(survey) {
        this.navCtrl.push(SurveyDetailsPage, {
            surveyID: survey.Id
        });
    }
}
