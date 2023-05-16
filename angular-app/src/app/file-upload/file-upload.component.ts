import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FileUploadService } from '../file-upload.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent {
  file: any ;
  name: string = "";
  timestamp: string = new Date().toISOString();
  ProcessDataMemory:any;
  HeapDataMemory:any;
  timezone: string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  browser: string = window.navigator.userAgent;

  ExcelData: any;
  myGroup = new FormGroup({
    chartname: new FormControl()
});

  constructor(private fileUploadService: FileUploadService) {
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
  onSubmit() {

      this.name = this.myGroup.value.chartname;

      this.fileUploadService.uploadFile(this.file, this.name, this.timestamp, this.timezone, this.browser)
      .subscribe(
        (response) => console.log(response),
        (error) => console.log(error)
      );
  }
}
