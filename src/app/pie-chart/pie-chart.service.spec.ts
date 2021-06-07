import { TestBed } from '@angular/core/testing';
import { RecordType } from './pie-chart.component';

import { PieChartService } from './pie-chart.service';

describe('PieChartService', () => {
  let service: PieChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PieChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test getRecords() then expect observable of records to be returned', () => {
    //WHEN
    const records = service.getRecords();
    //THEN
    records.subscribe((data) => {
      expect(data.recordInstances.length).toEqual(3);
    })
  });

  it('test getSelectedRecord() then expect selectedRecord to be returned', () => {
    //GIVEN
    const record = { id: "record" };
    sessionStorage.setItem("selectedRecord", JSON.stringify(record));
    //WHEN
    const selectedRecord = service.getSelectedRecord();
    //THEN
    expect(selectedRecord).toEqual(JSON.stringify(record));
  });

  it('test setSelectedRecord() then expect service.selectedRecord to be set', () => {
    //GIVEN
    const record: RecordType = new RecordType();
    //WHEN
    service.setSelectedRecord(record);
    //THEN
    expect(service.selectedRecord).toEqual(record);
  });
});
