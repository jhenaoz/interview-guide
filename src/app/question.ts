export class Question {
    public question: string;
    public response: string;
    public answer?: string;
    public hint?: string;
    public nested?: Question[];
}
