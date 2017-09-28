import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the SurveyDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-survey-details',
    templateUrl: 'survey-details.html',
})
export class SurveyDetailsPage {

    json: any;
    surveyID : string;

    constructor(public navCtrl: NavController, public navParams: NavParams) {

        this.surveyID = this.navParams.get('surveyID');

        this.json = {title: "Aparatos Móviles", /*showProgressBar: "bottom", goNextPageAutomatic: true, showNavigationButtons: false,*/ pages:[{elements:[{type:"radiogroup",choices:["Móvil","Portátil","Tablet","Lector electrónico","MP3 o MP4"],choicesOrder:"asc",commentText:"Otro (Especificar)",hasComment:true,name:"¿Qué aparatos móviles posees?"},{type:"checkbox",choices:["Móvil","Portátil","Tablet","Lector electrónico","Ordenador","Otro"],choicesOrder:"asc",name:"¿Cuál de los siguientes aparatos utilizas frecuentemente para conectarte a Internet?"},{type:"radiogroup",choices:["Sí","No"],colCount:0,name:"¿Se ajustan tus aparatos móviles a tu estilo de vida?"}],name:"page1"},{elements:[{type:"radiogroup",choices:["+8","5-8","3-4","1-2","Menos de una hora al día"],name:"¿Cuántas horas diarias utilizas los aparatos móviles?"}],name:"page2"}]};
    }

    ionViewDidLoad() {
        //console.log('ionViewDidLoad SurveyDetailsPage');
    }

}
