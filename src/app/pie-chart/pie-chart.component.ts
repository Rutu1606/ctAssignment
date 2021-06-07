import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';
import { PieChartService } from './pie-chart.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})

export class PieChartComponent {
  public pieChartLabels: string[] = [];
  public pieChartData: number[] = [];
  public pieChartType: ChartType = 'pie';
  public selectedRecord: RecordType = new RecordType();
  public records: RecordType[] = [];
  constructor(private pieChartService: PieChartService,
    public router: Router) {

  }

  ngOnInit() {
    this.getRecords();
  }

  getRecords() {
    this.pieChartService.getRecords().subscribe((data) => {
      this.records = data.recordInstances;
      const totalCount = data.totalCountOfPass;
      this.pieChartLabels = this.records.map(rec => rec.name);
      this.pieChartData = this.records.map(rec => rec.pass * 100 / totalCount);
    }, () => {
      this.pieChartLabels = ["error occured"];
      this.pieChartData = [100];
    })
  }

  chartClicked(event: any): void {
    const index = event.active[0]._index;
    this.selectedRecord = this.records[index];
    this.pieChartService.setSelectedRecord(this.selectedRecord);
    this.router.navigate(['/details']);
  }

  chartHovered(e: any): void {
    console.log(e);
  }
}

export class RecordType {
  name: string = '';
  id: string = '';
  pass: number = 0;
}