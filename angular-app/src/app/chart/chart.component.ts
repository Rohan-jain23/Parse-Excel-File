import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js/auto';
import { ChartService } from './chart.service';


interface DataItem {
    TimeStamp: string;
    ProcessedDataMemory: string;
    HeapDataMemory: string;
}


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {
    fileData: any;
    mydata: any;
    constructor(private api: ChartService) {

    }
    ngOnInit() {
        this.api.apiCall().subscribe((data: any) => {
            this.mydata = data.value;
            console.log("get api data", this.mydata);
        })
    }


    @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;
    data: DataItem[] = [];

    plotChart(file: any) {
        console.log("file data is " + file);
        this.data = JSON.parse(file);
        const ctx = document.getElementById('chartCanvas') as HTMLCanvasElement;
        const timestamps = this.data.map(item => item.TimeStamp);
        const processedData = this.data.map(item => parseInt(item.ProcessedDataMemory));
        const heapData = this.data.map(item => parseInt(item.HeapDataMemory));

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: timestamps,
                datasets: [
                    {
                        label: 'Processed Data Memory',
                        data: processedData,
                        borderColor: 'blue'
                    },
                    {
                        label: 'Heap Data Memory',
                        data: heapData,
                        borderColor: 'green'
                    }
                ]
            },
            options: {
                scales: {
                    x: {
                        display: true,
                        title: {
                            display: true,
                            text: 'TimeStamp'
                        }
                    },
                    y: {
                        display: true,
                        title: {
                            display: true,
                            text: 'Memory'
                        }
                    }
                }
            }
        });
    }
}