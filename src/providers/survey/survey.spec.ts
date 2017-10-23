import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SurveyProvider } from './survey';

describe('Service: SurveyProvider', () => {

	let service: SurveyProvider;
	let httpMock: HttpTestingController;
	let accessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [
				// Mock proporcionado por Angular.
				HttpClientTestingModule,
			],
			providers: [
				{ provide: SurveyProvider, useClass: SurveyProvider },
			],
		})
		service = TestBed.get(SurveyProvider);
		httpMock = TestBed.get(HttpTestingController);
	});
	
	it('should be created', () => {
		expect(service).toBeTruthy();
	});
	
	it('should return active surveys', () => {
		// Arrange.
		// Mock respuesta del endpoint al hacer la petición.
		const mockResponse = {
			results: [
				{"AllowAccessResult": false, "CreatedAt": "2017-09-28T09:39:51.5979918", "Id": "973ea5db-3b79-4964-b6c4-40559990165e",
				 "IsArchived": false, "IsPublished": false, "Name": "Experiencia de compra", "PostId": "de2ea03c-c09c-4959-97ef-87da7c754f69",
				 "PublishId": null, "ResultId": "1f9b5ae7-ee98-4153-8fd3-dc9dcb2b7aee", "StoreIPAddress": false, "UseCookies": false, "UserId": "9ba6421d-feb1-4aa6-8ff9-beaf51b5b6a8",
				 "image": "https://flexsurveys.com/wp-content/uploads/FlexSurveysEmployeeEngagementSurvey-Trans.png"
				}
			]
		};
		// Respuesta de la solicitud  y error del servidor en caso de que se produzca.
		let dataError, dataResponse;
		// Act.
		service.getActiveSurveys().subscribe((response) => {
			dataResponse = response[0];
			}, (error) => {
				dataError = error;
		});
		const req = httpMock.expectOne(`https://dxsurvey.com/api/MySurveys/getActive?accessKey=` + accessKey);
		req.flush(mockResponse);
		// Assert.
		expect(dataResponse.length).toEqual(1);
		expect(req.request.url).toEqual(`https://dxsurvey.com/api/MySurveys/getActive?accessKey=` + accessKey);
		expect(req.request.method).toEqual('GET');
		expect(dataError).toBeUndefined();
	}); 

});