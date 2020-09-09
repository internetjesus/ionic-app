import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import { throwError} from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';

export type RequestOptions = {
    headers?: HttpHeaders;
    observe?: any
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: any;
    withCredentials?: boolean;
    body?: any;
    dispatchError?: boolean;
};

@Injectable()
export class HttpClientService {

    private baseUrl = '/api';

    constructor(public http: HttpClient) {
        this.catchError = this.catchError.bind(this);
    }

    /**
     * Dispatch a throw action (this usually shows an alert dialog) based on
     * extended RequestOptions
     */
    private readonly catchError = (options?: RequestOptions) => {
        const dispatchError = (options !== undefined)
            ? (options.dispatchError !== undefined ? options.dispatchError : true)
            : true;

        return (err: HttpErrorResponse) => {
            if (dispatchError) {
                console.log(err.message);

                // this.store.dispatch(new ThrowAction({
                //     code: this.getErrorCode(err),
                //     message: err.message,
                //     originalError: err
                // }));
            }
            return throwError(err);
        };
    };

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {RequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public get<T>(endPoint: string, options?: RequestOptions): Observable<T> {
        options = { withCredentials: true, ...options };
        return this.http.get<T>(this.baseUrl + endPoint, options).pipe(catchError(this.catchError(options)));
    }

    /**
     * POST request
     * @param {string} endPoint end point of the baseurl
     * @param {Object} params body of the request.
     * @param {RequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public post<T>(endPoint: string, params: Object, options?: RequestOptions): Observable<T> {
        options = { withCredentials: true, ...options };
        return this.http.post<T>(this.baseUrl + endPoint, params, options).pipe(catchError(this.catchError(options)));
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the baseurl
     * @param {Object} params body of the request.
     * @param {RequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public put<T>(endPoint: string, params: Object, options?: RequestOptions): Observable<T> {
        options = { withCredentials: true, ...options };
        return this.http.put<T>(this.baseUrl + endPoint, params, options).pipe(catchError(this.catchError(options)));
    }

    /**
     * PATCH request
     * @param {string} endPoint end point of the baseurl
     * @param {Object} params body of the request.
     * @param {RequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public patch<T>(endPoint: string, params: Object, options?: RequestOptions): Observable<T> {
        options = { withCredentials: true, ...options };
        return this.http.patch<T>(this.baseUrl + endPoint, params, options).pipe(catchError(this.catchError(options)));
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the baseurl
     * @param {RequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public delete<T>(endPoint: string, options?: RequestOptions): Observable<T> {
        options = { withCredentials: true, ...options };
        return this.http.delete<T>(this.baseUrl + endPoint, options).pipe(catchError(this.catchError(options)));
    }

    /**
     * Appends a header to RequestOptions, when null is passed as argument
     * a new RequestOptions object will be created
     * @param options
     * @param headerKey
     * @param headerValue
     */
    public appendHeader(options: RequestOptions | null, headerKey: string, headerValue: string): RequestOptions {
        if (!options) {
            options = {
                headers: new HttpHeaders()
            };
        }

        if (!options.headers) {
            options.headers = new HttpHeaders();
        }

        options.headers = options.headers.append(headerKey, headerValue);

        return options;
    }
}
