import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { ConnectionBackend, Http, Request, RequestOptions, RequestOptionsArgs, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { TransferState } from '../transfer-state/transfer-state';
import { isPlatformServer } from '@angular/common';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class TransferHttp {

    private isServer = isPlatformServer(this.platformId);

    constructor(
        @Inject(PLATFORM_ID) private platformId,
        private http: Http,
        protected transferState: TransferState
    ) { }

    request(uri: string | Request, options?: RequestOptionsArgs): Observable<any> {
        return this.getData(uri, options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.request(url, options);
        });
    }
    /**
     * Performs a request with `get` http method.
     */
    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.getData(this.getUrl(url), options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.get(url, options);
        });
    }
    /**
     * Performs a request with `post` http method.
     */
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return this.getPostData(this.getUrl(url), body, options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.post(url, body, options);
        });
    }
    /**
     * Performs a request with `put` http method.
     */
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

        return this.getPostData(this.getUrl(url), body, options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.put(url, body, options);
        });
    }
    /**
     * Performs a request with `delete` http method.
     */
    delete(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.getData(this.getUrl(url), options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.delete(url, options);
        });
    }
    /**
     * Performs a request with `patch` http method.
     */
    patch(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        return this.getPostData(this.getUrl(url), body, options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.patch(url, body.options);
        });
    }
    /**
     * Performs a request with `head` http method.
     */
    head(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.getData(this.getUrl(url), options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.head(url, options);
        });
    }
    /**
     * Performs a request with `options` http method.
     */
    options(url: string, options?: RequestOptionsArgs): Observable<any> {
        return this.getData(this.getUrl(url), options, (url: string, options: RequestOptionsArgs) => {
            options = this.getRequestOptionArgs(options);
            return this.http.options(url, options);
        });
    }

    private getData(uri: string | Request, options: RequestOptionsArgs, callback: (uri: string | Request, options?: RequestOptionsArgs) => Observable<Response>) {

        let url = uri;

        if (typeof uri !== 'string') {
            url = uri.url;
        }

        const key = url + JSON.stringify(options);

        try {
            return this.resolveData(key);

        } catch (e) {
            return callback(url, options)
                .map(res => res.json())
                .do(data => {
                    if (this.isServer) {
                        this.setCache(key, data);
                    }
                });
        }
    }

    private getPostData(uri: string | Request, body: any, options: RequestOptionsArgs, callback: (uri: string | Request, body: any, options?: RequestOptionsArgs) => Observable<Response>) {

        let url = uri;

        if (typeof uri !== 'string') {
            url = uri.url;
        }

        const key = url + JSON.stringify(body);

        try {

            return this.resolveData(key);

        } catch (e) {
            return callback(uri, body, options)
                .map(res => res.json())
                .do(data => {
                    if (this.isServer) {
                        this.setCache(key, data);
                    }
                });
        }
    }

    private resolveData(key: string) {
        const data = this.getFromCache(key);

        if (!data) {
            throw new Error();
        }

        return Observable.fromPromise(Promise.resolve(data));
    }

    private setCache(key, data) {
        return this.transferState.set(key, data);
    }

    private getFromCache(key): any {
        return this.transferState.get(key);
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (!options) {
            options = new RequestOptions();
        }
        if (!options.headers) {
            options.headers = new Headers();
        }

        options.headers.append('X-CLIENT', '{"Context":"eyJ0eXAiOiJKV1QiLCJhbGciOiJHbG9iYWwuTW9iaWxlLkFwaS5BdXRoLldlYi5TaGEyNTZBbGdvcml0aG0ifQ.IntcIkxlZ2lzbGF0aW9uXCI6XCJDb21cIixcIlNpdGVcIjpcIkZyRnJcIixcIkxhbmd1YWdlXCI6XCJGclwiLFwiQ2hhbm5lbElkXCI6XCJCZXRjbGljTW9iaWxlXCIsXCJVbml2ZXJzZVwiOlwiU3BvcnRzXCIsXCJOb3RCZWZvcmVcIjpcIjIwMTctMDctMjJUMTU6MTQ6MTguNDA1OTQxMVpcIixcIkV4cGlyYXRpb25UaW1lXCI6XCIyMDE3LTA3LTIyVDE1OjE5OjE4LjQwNTk0MTFaXCJ9Ig.ii8Szy0Uhs6nbW5tfvaJtUe4Fez9tR5Xlc4KXysove8","Auth":"eyJ0eXAiOiJKV1QiLCJhbGciOiJHbG9iYWwuTW9iaWxlLkFwaS5BdXRoLkFwaS5TaGEyNTZBbGdvcml0aG0ifQ.IntcIklwXCI6XCIxMC4zMy4xOS40NlwiLFwiVXNlcklkXCI6MCxcIlNlc3Npb25cIjpudWxsLFwiQ291bnRyeUNvZGVcIjpudWxsLFwiTGFuZ3VhZ2VDb2RlXCI6bnVsbCxcIkN1cnJlbmN5Q29kZVwiOm51bGwsXCJJc0FkbWluXCI6dHJ1ZSxcIklzTG9nZ2VkRnJvbUJvXCI6ZmFsc2UsXCJJc0xhdW5jaGVyXCI6ZmFsc2UsXCJSZWd1bGF0b3JJZFwiOi0xLFwiTm90QmVmb3JlXCI6XCIyMDE3LTA3LTIyVDE1OjE0OjEzLjg4NzI3NTRaXCIsXCJFeHBpcmF0aW9uVGltZVwiOlwiMjAxNy0wNy0yMlQxNTozNjoxMy44ODcyNzU0WlwifSI.7vXLChVIggwFqGcxLkc4TYIYvCBVWUedxq7ZbWFlx4o","Device":"iphone"}');

        // options.headers.append('Content-Type', 'application/json');
        options.headers.append('Accept', 'application/json');
        return options;
    }

    private getUrl(url: string): string {
        if (url.startsWith('/')) {
            url = 'https://betclicstage.com/a/sv/dev/ServiceAllSportApi/api' + url;
        }
        return url;
    }
}
