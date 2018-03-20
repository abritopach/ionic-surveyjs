# Ionic-SurveyJS

Sample project that shows how to integrate SurveyJS in Ionic APP.

![Technologies](readme_resources/ionic_survey.png "Technologies")

This project shows you how to:

    * Integrate SurveyJS in Ionic APP.
    * Create new Survey using SurveyJS API dxsurvey.com/api (get request).
    * Show list with active surveys using SurveyJS API dxsurvey.com/api (get request).
    * Show list with archive surveys using SurveyJS API dxsurvey.com/api (get request).
    * Delete survey using SurveyJS API dxsurvey.com/api (get request).
    * Change survey name using SurveyJS API dxsurvey.com/api (get request).
    * Archive survey by it's id using SurveyJS API dxsurvey.com/api (get request). 
    * Restore an archive survey by it's id using SurveyJS API dxsurvey.com/api (get request). 
    * Show survey details.
	* Get survey results using SurveyJS API dxsurvey.com/api (get request).
    * Enable or disable the ability to view survey results by non autorized user via direct link using SurveyJS API dxsurvey.com/api (get request).
    * Show survey results using Chart.js (http://www.chartjs.org/).
    * Intercepting all requests errors.
    * Added Timeout for HTTP requests to the API, and then throw an error if the request fails.
    * Download survey resulst CSV in Desktop.

![App example](readme_resources/app.gif "App example")

## Demo

[Demo online](https://ionic-surveyjs.herokuapp.com/)

## Configuration

 1) To use your own surveys register in [SurveyJS](https://surveyjs.io/Account/Register)
 2) Create your own survey.
 3) In providers/survey/survey.ts replace: accessKey with your [SurveyJS API accessKey](https://surveyjs.io/Help/Index/)
    to get your active surveys.
 
 NOTE: To see your survey [results](https://surveyjs.io/Service/MySurveys/)
    

## Running

Before you go through this example, you should have at least a basic understanding of Ionic concepts. You must also already have Ionic installed on your machine.

* Test in localhost:

To run it, cd into `ionic-surveyjs` and run:

```bash
npm install
ionic serve
```

* Test in Android: 

```bash
ionic cordova add platform android
ionic cordova run android
```

* Test in iOS: 

```bash
ionic cordova add platform ios
ionic cordova run ios
```

## Requirements

* [Node.js](http://nodejs.org/)
* [Ionic Cordova](https://ionicframework.com/docs/intro/installation/)
