export class Concert {

    constructor(img = '', singer = '', price = '', location = '', date = '', time = '') {
        this.img = img;
        this.singer = singer;
        this.price = price;
        this.location = location;
        this.date = date;
        this.time = time;
    }

    img: string;
    singer: string;
    price: string;
    location: string;
    date: string;
    time: string;
}
