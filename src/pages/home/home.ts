import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';

import { SurveyProvider } from '../../providers/survey/survey';
import { SurveyDetailsPage } from '../survey-details/survey-details';

import { SurveyModel } from "../../models/survey.model";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    surveys: SurveyModel[];
    defaultImages: any;

    constructor(public navCtrl: NavController, public surveyProvider: SurveyProvider,
                public loadingCtrl: LoadingController) {


        let loading = this.loadingCtrl.create({
            content: "Loading Surveys..."
        });

        loading.present();

        this.surveyProvider.getActiveSurveys()
            .subscribe(
                data => {
                    //console.log(data);
                    //this.surveys = data;
                    this.surveys = SurveyModel.fromJSONArray(data);
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

}
