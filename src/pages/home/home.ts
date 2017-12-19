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
    archiveSurveys: SurveyModel[];
    defaultImages: any;

    constructor(public navCtrl: NavController, public surveyProvider: SurveyProvider,
                public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
        this.getActiveSurveys();
        this.getArchiveSurveys();
    }

    getActiveSurveys() {
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

    getArchiveSurveys() {
        this.surveyProvider.getArchiveSurveys()
            .subscribe(
                data => {
                    //console.log(data);
                    this.archiveSurveys = SurveyModel.fromJSONArray(data);
                },
                error => {
                    console.log(<any>error);
            }
        );
    }

    selectedSurvey(survey) {
        this.navCtrl.push(SurveyDetailsPage, {
            surveyID: survey.Id
        });
    }

    onClickActivateSurvey(survey) {
        console.log("onClickActivateSurvey", survey);
        this.presentAlert(survey, 'activate');
    }

    onClickArchiveSurvey(survey) {
        console.log("onClickArchiveSurvey", survey);
        this.presentAlert(survey, 'archive');
    }

    onClickEditSurvey(survey) {
        console.log("onClickEditSurvey", survey);
        this.showPrompt(survey);
    }

    onClickDeleteSurvey(survey, type) {
        console.log("onClickDeleteSurvey", survey);
        this.presentAlert(survey, 'delete');
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
                if (error.status == 200) {
                    if ( survey.IsArchived === false) this.surveys = this.removeElement(survey.Name, this.surveys);
                    else this.archiveSurveys = this.removeElement(survey.Name, this.archiveSurveys);
                }
                loading.dismiss();
            }
        );
    }

    presentAlert(survey, operation) {
        let options = this.alertConfig(operation);
        let alert = this.alertCtrl.create({
          title: options.title,
          subTitle: options.subTitle,
          buttons: [
            {
                text: 'Cancel',
                handler: () => {
                }
            },
            {
              text: 'Accept',
              handler: () => {
                if (operation == 'delete') this.deleteSurvey(survey);
                if (operation == 'activate') this.activateSurvey(survey);
                if (operation == 'archive') this.archiveSurvey(survey);
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

    activateSurvey(survey) {
        let loading = this.loadingCtrl.create({
            content: "Activating Survey..."
        });

        loading.present();

        this.surveyProvider.restoreSurvey(survey.Id)
        .subscribe(
            data => {
                console.log(data);
                loading.dismiss();
            },
            error => {
                console.log(<any>error);
                if (error.status == 200) {
                    this.surveys.push(survey);
                    this.archiveSurveys = this.removeElement(survey.Name, this.archiveSurveys);
                }
                loading.dismiss();
            }
        );
    }

    archiveSurvey(survey) {
        let loading = this.loadingCtrl.create({
            content: "Archiving Survey..."
        });

        loading.present();

        this.surveyProvider.archiveSurvey(survey.Id)
        .subscribe(
            data => {
                console.log(data);
                loading.dismiss();
            },
            error => {
                console.log(<any>error);
                if (error.status == 200) {
                    this.archiveSurveys.push(survey);
                    this.surveys = this.removeElement(survey.Name, this.surveys);
                }
                loading.dismiss();
            }
        );
    }

    removeElement(name, surveys) {
        return surveys.filter(function(e) {
            return e.Name !== name;
        });
    }

    alertConfig(operation) {
        let options = {title: "Title", subTitle: "Subtitle"};
        if (operation == 'delete') {
            options = {title: 'Delete Survey', subTitle: '¿Are you sure to delete the survey?'};
        } 
        else if (operation == 'activate') {
            options = {title: 'Activate Survey', subTitle: '¿Are you sure to activate the survey?'};
        } 
        else if (operation == 'archive') {
            options = {title: 'Archive Survey', subTitle: '¿Are you sure to archive the survey?'};
        } 
        return options;
    }

}
