export class UserConcerts {

    _id: string;
    concert: any;
    validity: boolean;

    constructor(_id = '', concert = '', validity = true) {
        this._id = _id;
        this.concert = concert;
        this.validity = validity;
    }
}
