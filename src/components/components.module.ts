import { NgModule } from '@angular/core';
import { SurveyComponent } from './survey/survey';
import { ChartComponent } from './chart/chart';
@NgModule({
	declarations: [SurveyComponent,
    ChartComponent],
	imports: [],
	exports: [SurveyComponent,
    ChartComponent]
})
export class ComponentsModule {}
