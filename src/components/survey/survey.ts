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

    _survey: any;

    @Input() set survey(survey) {
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";

        this._survey = survey;
        let surveyModel = new Survey.ReactSurveyModel({ surveyId: this._survey.Id });

        // Change language.
        surveyModel.locale = "es";

        // Progress Bar.
        surveyModel.showProgressBar = 'bottom';

        surveyModel.onComplete.add(this.sendDataToServer.bind(this));
        Survey.SurveyNG.render('surveyElement', { model: surveyModel });

    }

    constructor() {
    }

    ionViewDidLoad() {
    }

    sendDataToServer(survey) {
        //console.log("sendDataToServer");
        //console.log("postId", this._survey.PostId);
        survey.sendResult(this._survey.PostId);
    };


}
