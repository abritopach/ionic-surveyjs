const defaultImages = [
    "https://flexsurveys.com/wp-content/uploads/FlexSurveysEmployeeEngagementSurvey-Trans.png",
    "https://static.e-encuesta.com/wp-content/uploads/satisfaccion-cliente-v6.png",
    "http://www.redcresearch.ie/wp-content/uploads/2015/12/14.png",
    "http://www.redcresearch.ie/wp-content/uploads/2015/12/30.png"
];

export class SurveyModel {
    AllowAccessResult: boolean;
    CreatedAt: string;
    CreatorId: string;
    Id: string;
    IsArchived: boolean;
    IsPublished: boolean;
    Name: string;
    PostId: string;
    PublishId: string;
    ResultId: string;
    StoreIPAddress: boolean;
    UseCookies: boolean;
    UserId: string;
    Image: string;


    // Copy constructor.
    constructor(obj: SurveyModel) {
        this.AllowAccessResult = obj['AllowAccessResult'];
        this.CreatedAt = obj['CreatedAt'];
        this.CreatorId = obj['CreatorId'];
        this.Id = obj['Id'];
        this.IsArchived = obj['IsArchived'];
        this.IsPublished = obj['IsPublished'];
        this.Name = obj['Name'];
        this.PostId = obj['PostId'];
        this.PublishId = obj['PublishId'];
        this.ResultId = obj['ResultId'];
        this.StoreIPAddress = obj['StoreIPAddress'];
        this.UseCookies = obj['UseCookies'];
        this.UserId = obj['UserId'];
        this.Image = obj['Image'] || defaultImages[Math.floor(Math.random() * defaultImages.length)];
    }

    // New static method.
    static fromJSONArray(array: Array<SurveyModel>): SurveyModel[] {
        return array.map(obj => new SurveyModel(obj)
    )}

}