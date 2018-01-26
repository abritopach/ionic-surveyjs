import { Component, Input } from '@angular/core';

import * as Survey from 'survey-angular';

/**
 * Generated class for the SurveyComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'survey',
    templateUrl: 'survey.html'
})
export class SurveyComponent {

    surveyId: string;
    postId: string;

    @Input() set surveyID(surveyID) {
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

        this.surveyId = surveyID;
        let surveyModel = new Survey.ReactSurveyModel({ surveyId: this.surveyId });

        // Change language.
        surveyModel.locale = "es";

        // Progress Bar.
        surveyModel.showProgressBar = 'bottom';

        surveyModel.onComplete.add(this.sendDataToServer.bind(this));
        Survey.SurveyNG.render('surveyElement', { model: surveyModel });

    }

    @Input() set postID(postID) {
        this.postId = postID;
    }

    constructor() {
    }

    ionViewDidLoad() {
    }

    sendDataToServer(survey) {
        //console.log("sendDataToServer");
        //console.log("postId", this.postId);
        survey.sendResult(this.postId);
    };


}
