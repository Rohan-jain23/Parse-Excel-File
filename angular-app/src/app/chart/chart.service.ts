import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ChartService {

    constructor(private http: HttpClient) { }
    apiCall()
    {
        return this.http.get("https://localhost:44311/api/File/Data")
    }
}
