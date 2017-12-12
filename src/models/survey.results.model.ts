export class UserAnswerModel {
    idQuestion: string;
    textQuestion: string;
    value: string;

    constructor(idQuestion, textQuestion, value) {
        this.idQuestion = idQuestion;
        this.textQuestion = textQuestion;
        this.value = value;
    }
}

export class SurveyResultsModel {
    happendAt: string;
    iPAddress: string;
    userAnswers: UserAnswerModel[] = [];

    constructor(obj: any) {
        this.happendAt = obj["HappendAt"];
        this.iPAddress = obj["IPAddress"];
        this.userAnswers = SurveyResultsModel.setUsersAnswers(obj);
    }

    // New static method.
    static fromJSONArray(array: Array<any>): SurveyResultsModel[] {
        return array.map(obj =>
            new SurveyResultsModel(obj)
    )}

    static setUsersAnswers(obj): UserAnswerModel[] {
        let index = 1;
        let usersAnswers: UserAnswerModel[] = [];
        for(let key in obj) {
            let value = obj[key];
            //console.log("key: " + key + " value: " + value); 
            if ((key != "HappendAt") && (key != "IPAddress")) {
                let userAnswerModel = new UserAnswerModel('P' + index, key, value.toString());
                usersAnswers.push(userAnswerModel);
                index++;
            }
        }
        return usersAnswers;
    }

}