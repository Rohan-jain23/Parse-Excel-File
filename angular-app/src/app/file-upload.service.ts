import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class FileUploadService {


    constructor(private http: HttpClient) { }

    uploadFile(file: File, name: string, timestamp: string, timezone: string, browser: string) {
        const formData = new FormData();
        formData.append('FileData', file);
        formData.append('ChartName', name);
        formData.append('Timestamp', timestamp);
        formData.append('Timezone', timezone);
        formData.append('UserAgent', browser);

        return this.http.post('https://localhost:44311/api/File', formData)
    }
}
