import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

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
	keys: any;
	charData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public surveyProvider: SurveyProvider,
			  public loadingCtrl: LoadingController) {

		this.surveys = [];
		this.surveyID = this.navParams.get('surveyID');
		this.charData = [];

		let loading = this.loadingCtrl.create({
            content: "Loading Survey results..."
        });

		loading.present();
		this.surveyProvider.getSurveyResults(this.surveyID)
			.then(data => {
				this.results = JSON.parse(JSON.stringify(data));
				//console.log(this.results);
				if (this.results.length > 0) {
					this.keys = Object.keys(this.results[0]);
					this.keys = this.keys.splice(0, this.keys.length - 2);
					//console.log(this.keys);
					this.getSurveyData();
					for (let i = 0; i < this.keys.length; i++) this.groupResultsByQuestion(i);
					loading.dismiss();
				}
			}
		);
  }

  ionViewDidLoad() {
	//console.log('ionViewDidLoad SurveyResultsPage');
	}

	getSurveyData() {
		let json;
		for (let i = 0; i < this.results.length; i++) {
			json = {"HappendAt": "", "IPAddress": "", "values": []};
			for(let key in this.results[i]) {
				let value = this.results[i][key];
				//console.log("key: " + key + " value: " + value); 
				if ((key == "HappendAt") || (key == "IPAddress")) json[key] = value.toString();
				else json.values.push(value.toString());
			}
			this.surveys.push(json);
		}
	}

	groupResultsByQuestion(index) {
		let keys = this.keys;
		let res = this.results.reduce(function(res, currentValue) {
			//if (res.indexOf(currentValue[keys[index]]) === -1 ) {
			  res.push(currentValue[keys[index]]);
			//}
			//console.log(res);
			return res;
		  }, []);
		//console.log(res);
		this.charData.push(res);
	}

}
