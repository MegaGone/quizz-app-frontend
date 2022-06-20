export interface IUser {
    role:    string;
    enabled: boolean;
    google:  boolean;
    name:    string;
    email:   string;
    uid:     string;
    img?:    string;
    quizzesPlayeds: Array<any>;
}