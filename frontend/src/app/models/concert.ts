export class Concert {

    _id: string;
    img: string;
    singer: string;
    price: string;
    location: string;
    date: string;
    time: string;

    constructor(_id = '', img = '', singer = '', price = '', location = '', date = '', time = '') {
        this._id = _id;
        this.img = img;
        this.singer = singer;
        this.price = price;
        this.location = location;
        this.date = date;
        this.time = time;
    }
}
