import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { SurveyProvider } from './survey';

describe('Service: SurveyProvider', () => {

	let service: SurveyProvider;
	let httpMock: HttpTestingController;

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

});