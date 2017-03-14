export class Topic {
    public key: string;
    public questions: any[];

    constructor(){}

    static fromJSON(json: any): Topic {
        console.log("su")
        let object = Object.create(Topic.prototype);
        Object.assign(object, json);
        return object;
    }
}