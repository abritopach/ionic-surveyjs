import { types, flow, applySnapshot } from 'mobx-state-tree';
import { SurveyProvider } from '../providers/survey/survey';

export const Survey = types.model({
    AllowAccessResult: types.boolean,
    CreatedAt: types.string,
    CreatorId: types.string,
    Id: types.string,
    IsArchived: types.boolean,
    IsPublished: types.boolean,
    Name: types.string,
    PostId: types.string,
    PublishId: types.maybe(types.string),
    ResultId: types.string,
    StoreIPAddress: types.boolean,
    UseCookies: types.boolean,
    UserId: types.string,
    Image: types.optional(types.string, '')
}).actions(self => ({

}));

export const SurveyList = types.model({
    surveys: types.optional(types.array(Survey), []),
}).actions(self => ({
    getActiveSurveys(surveyProvider: SurveyProvider) { // <- note the star, this a generator function!
        console.log('getActiveSurveys');
        surveyProvider.getActiveSurveys()
            .subscribe(
                data => {
                    console.log(data);
                    applySnapshot(self.surveys, data);
                },
                error => {
                    console.log(<any>error);
            }
        );
    }
})).views(self => ({
    getSurveysCount() {
        return self.surveys.reduce((count, entry) => count + 1, 0);
    }
}));
