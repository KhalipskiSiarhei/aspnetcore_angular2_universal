import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { TransferHttp } from '../modules/transfer-http/transfer-http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {
    constructor(public transferHttp: TransferHttp, public http: Http) {
    }

    public getTransferData(): Observable<string> {
        return this.transferHttp.get('http://services.groupkt.com/country/get/iso3code/IND').map((response) => {
            let result = JSON.stringify(response);
            return result;
        });
    }

    public getData(): Observable<string> {
        return this.http.get('http://services.groupkt.com/country/get/iso3code/IND').map((response) => {
            let result = JSON.stringify(response);
            return result;
        });
    }
}