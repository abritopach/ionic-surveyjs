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
    defaultImages: any;

    constructor(public navCtrl: NavController, public surveyProvider: SurveyProvider,
                public loadingCtrl: LoadingController) {

        this.defaultImages = [
            "https://flexsurveys.com/wp-content/uploads/FlexSurveysEmployeeEngagementSurvey-Trans.png",
            "https://static.e-encuesta.com/wp-content/uploads/satisfaccion-cliente-v6.png"
        ];

        let loading = this.loadingCtrl.create({
            content: "Loading Surveys..."
        });

        loading.present();

        /*
        this.surveyProvider.getActiveSurveys()
            .then(data => {
                //console.log(data);
                this.surveys = data;
                for (var i = 0; i < this.surveys.length; i++) {
                    this.surveys[i].image = this.defaultImages[this.getRandomNumber()];
                }
                loading.dismiss();
            }
        );
        */

        this.surveyProvider.getActiveSurveys()
            .subscribe(
                data => {
                    //console.log(data);
                    this.surveys = data;
                    for (var i = 0; i < this.surveys.length; i++) {
                        this.surveys[i].image = this.defaultImages[this.getRandomNumber()];
                    }
                    loading.dismiss();
                },
                error => {
                    console.log(<any>error);
                    loading.dismiss();
                }
            );
    }

    selectedSurvey(survey) {
        this.navCtrl.push(SurveyDetailsPage, {
            surveyID: survey.Id
        });
    }

    getRandomNumber() {
        return Math.floor(Math.random() * this.defaultImages.length);
    }
}
