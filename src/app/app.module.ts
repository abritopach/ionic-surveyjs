import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SurveyDetailsPage } from '../pages/survey-details/survey-details';
import { SurveyResultsPage } from '../pages/survey-results/survey-results';

import { SurveyComponent } from '../components/survey/survey';
import { SurveyProvider } from '../providers/survey/survey';
import { ApiWrapper } from '../providers/survey/api-wrapper';
import { ChartComponent } from '../components/chart/chart';

import { ChartsModalPage } from '../modals/charts-modal';

import { TimingInterceptor } from '../interceptors/timing-interceptor';

@NgModule({
    declarations: [
        MyApp,
        HomePage,
        SurveyComponent,
        SurveyDetailsPage,
        SurveyResultsPage,
        ChartComponent,
        ChartsModalPage
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        IonicModule.forRoot(MyApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        HomePage,
        SurveyDetailsPage,
        SurveyResultsPage,
        ChartsModalPage
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        {provide: HTTP_INTERCEPTORS, useClass: TimingInterceptor, multi: true},
        SurveyProvider,
        ApiWrapper
    ]
})
export class AppModule {}
