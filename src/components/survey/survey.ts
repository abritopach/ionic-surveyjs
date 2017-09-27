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

    surveyJSON: any;

    @Input() set json(surveyJSON) {
        Survey.Survey.cssType = "bootstrap";
        Survey.defaultBootstrapCss.navigationButton = "btn btn-green";
        this.surveyJSON = surveyJSON;
        let surveyModel = new Survey.ReactSurveyModel(this.surveyJSON);

        // Change language.
        surveyModel.locale = "es";

        // Progress Bar.
        surveyModel.showProgressBar = 'bottom';

        surveyModel.onComplete.add(this.sendDataToServer);
        Survey.SurveyNG.render('surveyElement', { model: surveyModel });

    }

    constructor() {
    }

    ionViewDidLoad() {
    }

    sendDataToServer(survey) {
        survey.sendResult('a9cd1b88-8e41-40a2-9331-61ffc60f7060');
    }


}
