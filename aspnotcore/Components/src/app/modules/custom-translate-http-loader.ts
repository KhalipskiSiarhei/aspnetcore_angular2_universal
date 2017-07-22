import { Http, Response } from "@angular/http";
import { TranslateLoader } from "@ngx-translate/core";
import { TransferHttp } from './transfer-http/transfer-http';
import "rxjs/add/operator/map";

export class CustomTranslateHttpLoader implements TranslateLoader {
    constructor(private http: TransferHttp, private prefix: string = "/assets/i18n/", private suffix: string = ".json") { }

    /**
     * Gets the translations from the server
     * @param lang
     * @returns {any}
     */
    public getTranslation(lang: string): any {
        return this.http.get(`${this.prefix}`)
            .map((res: Response) => res);
    }
}