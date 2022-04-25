export interface IUpdateUser {
    email   : string;
    google  : boolean;
    img?    : any; // TODO: User type to this property
    name    : string;
    uid     : string;
}