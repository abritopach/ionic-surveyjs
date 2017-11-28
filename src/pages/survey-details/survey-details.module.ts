import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurveyDetailsPage } from './survey-details';

@NgModule({
  declarations: [
    SurveyDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(SurveyDetailsPage),
  ],
})
export class SurveyDetailsPageModule {}
