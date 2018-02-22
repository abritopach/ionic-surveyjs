import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, AlertController } from 'ionic-angular';

import { SurveyProvider } from '../../providers/survey/survey';

import { ChartsModalPage } from '../../modals/charts-modal';

import { SurveyResultsModel } from '../../models/survey.results.model';

import * as papa from 'papaparse';

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

	currentYear = new Date().getFullYear();
	survey: any;
	allowAccessResult: boolean;
	surveys: any;
	keys: any;
	charData: any;
	results: any;
	surveyResults: SurveyResultsModel[] = [];
	publicSurveyURL: string = 'https://surveyjs.io/Results/Survey/';

  constructor(public navCtrl: NavController, public navParams: NavParams, public surveyProvider: SurveyProvider,
			  public loadingCtrl: LoadingController, public modalCtrl: ModalController, public alertCtrl: AlertController) {

		this.surveys = [];
		this.survey = this.navParams.get('survey');
		this.publicSurveyURL += this.survey.Id; 
		this.allowAccessResult = this.survey.allowAccessResult;
		this.charData = [];

		let loading = this.loadingCtrl.create({
            content: "Loading Survey results..."
        });

		loading.present();
		
		this.surveyProvider.getSurveyResults(this.survey.Id)
		.subscribe(
			data => {
				this.results = JSON.parse(JSON.stringify(data.Data));
				this.surveyResults = SurveyResultsModel.fromJSONArray(data.Data);
				if (this.results.length > 0) {
					this.keys = this.surveyResults[0].userAnswers.map((val, key) => {return val['textQuestion']});
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
			res.push(currentValue[keys[index]]);
			return res;
		}, []);
		this.charData.push(res);
	}

	openModal() {
		let modal = this.modalCtrl.create(ChartsModalPage, {'chartData': this.charData, 'questionsText': this.keys});
		modal.present();
	}

	onClickDeleteSurveyResult(result) {
		//console.log("onClickDeleteSurveyResult");
		console.log(result);
	}

	downloadResults() {
		//console.log("downloadResults");

		let csv = papa.unparse({
			fields: this.keys,
			data: this.charData
		  });
	   
		  // Dummy implementation for Desktop download purpose.
		  // let blob = new Blob([csv]);
		  // Sent the UTF-8 header for the download process.
		  let blob = new Blob(["\ufeff", csv]);
		  let a = window.document.createElement("a");
		  a.href = window.URL.createObjectURL(blob);
		  a.download = "survey-results.csv";
		  document.body.appendChild(a);
		  a.click();
		  document.body.removeChild(a);
	}

	makeSurveyResultsPublic(content) {
		//console.log("makeSurveyResultsPublic");
		this.allowAccessResult = !this.allowAccessResult;

		let loading = this.loadingCtrl.create({
            content: content
        });
		loading.present();
		this.surveyProvider.makeSurveyResultsPublic(this.survey.Id, this.allowAccessResult)
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

	presentAlert() {
		let operation;
		let loadingContent;
		if (this.allowAccessResult) {
			operation = "disable";
			loadingContent = "Making Survey results not public..."
		} 
		else {
			operation = "grant";
			loadingContent = "Making Survey results public...";
		} 
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
				  this.makeSurveyResultsPublic(loadingContent);
              }
            }
          ]
        });
        alert.present();
	}
	
	alertConfig(operation) {
        let options = {
            grant: {title: 'Grant Access', subTitle: 'Your Survey results can be accessible via direct Url. ¿Are you sure to grant access?'},
            disable: {title: 'Disable Access', subTitle: 'Your Survey results can not be accessible via direct Url. ¿Are you sure to disable access?'},

        }
        return options[operation];
    }

}
