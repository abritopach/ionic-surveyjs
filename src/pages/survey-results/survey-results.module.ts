import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyResultsPage } from './survey-results';

@NgModule({
  declarations: [
    SurveyResultsPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyResultsPage),
  ],
})
export class SurveyResultsPageModule {}
