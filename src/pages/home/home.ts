import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';

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
                public loadingCtrl: LoadingController, public alertCtrl: AlertController) {


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

    onClickEditSurvey(survey) {
        console.log("onCLickEditSurvey", survey);
        this.showPrompt(survey);
    }

    onClickDeleteSurvey(survey) {
        console.log("onCLickDeleteSurvey", survey);
        this.presentAlert(survey);
    }

    deleteSurvey(survey) {
        let loading = this.loadingCtrl.create({
            content: "Deleting Survey..."
        });

        loading.present();

        this.surveyProvider.deleteSurvey(survey.Id)
        .subscribe(
            data => {
                console.log(data);
                loading.dismiss();
            },
            error => {
                console.log(<any>error);
                loading.dismiss();
            }
        );
    }

    presentAlert(survey) {
        let alert = this.alertCtrl.create({
          title: 'Delete Survey',
          subTitle: '¿Are you sure to delete the survey?',
          buttons: [
            {
                text: 'Cancel',
                handler: () => {
                }
            },
            {
              text: 'Accept',
              handler: () => {
                this.deleteSurvey(survey);
              }
            }
          ]
        });
        alert.present();
    }

    showPrompt(survey) {
        let prompt = this.alertCtrl.create({
          title: 'Update Survey Name',
          message: "Enter a name for this survey",
          inputs: [
            {
              name: 'name',
              placeholder: 'Name'
            },
          ],
          buttons: [
            {
              text: 'Cancel',
              handler: data => {
                //console.log('Cancel clicked');
              }
            },
            {
              text: 'Accept',
              handler: data => {
                //console.log('Accept clicked');
                //console.log(data);
                this.changeSurveyName(survey, data.name);
              }
            }
          ]
        });
        prompt.present();
      }

    changeSurveyName(survey, newName) {
        let loading = this.loadingCtrl.create({
            content: "Updating Survey name..."
        });

        loading.present();

        this.surveyProvider.changeSurveyName(survey.Id, newName)
        .subscribe(
            data => {
                console.log(data);
                loading.dismiss();
            },
            error => {
                console.log(<any>error);
                if (error.status == 200) survey.Name = newName;
                loading.dismiss();
            }
        );
    }

}
