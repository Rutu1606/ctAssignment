import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { RecordType } from './pie-chart.component';

@Injectable({
  providedIn: 'root'
})
export class PieChartService {
  selectedRecord: RecordType = new RecordType();
  constructor() { }

  getRecords() {
    const records = {
      totalCountOfPass: 200,
      recordInstances: [
        { id: "1", name: "First Grade", pass: 60 },
        { id: "2", name: "Second Grade", pass: 65 },
        { id: "3", name: "Third Grade", pass: 75 },
      ]
    }
    return of(records);
  }

  getSelectedRecord() {
    return sessionStorage.getItem("selectedRecord");
  }

  setSelectedRecord(record: RecordType) {
    sessionStorage.setItem("selectedRecord", JSON.stringify(record));
    this.selectedRecord = record;
  }
}
