import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SurveyDetailsPage } from '../pages/survey-details/survey-details';
import { SurveyResultsPage } from '../pages/survey-results/survey-results';

import { SurveyComponent } from '../components/survey/survey';
import { SurveyProvider } from '../providers/survey/survey';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SurveyComponent,
        SurveyDetailsPage,
		SurveyResultsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SurveyDetailsPage,
		SurveyResultsPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
    SurveyProvider
    ]
})
export class AppModule {}
