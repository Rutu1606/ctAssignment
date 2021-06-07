import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

import { PieChartComponent, RecordType } from './pie-chart.component';
import { PieChartService } from './pie-chart.service';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let pieChartServiceSpy: jasmine.SpyObj<PieChartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const PieChartServiceSpy = jasmine.createSpyObj(PieChartService, ['getRecords', 'setSelectedRecord']);
    const RouterSpy = jasmine.createSpyObj(Router, ['navigate']);
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent],
      providers: [
        { provide: PieChartService, useValue: PieChartServiceSpy },
        { provide: Router, useValue: RouterSpy }
      ]
    })
      .compileComponents();
    pieChartServiceSpy = TestBed.get(PieChartService);
    routerSpy = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test ngOnInit() then expect getRecords() to have been called', () => {
    //GIVEN
    spyOn(component, "getRecords");
    //WHEN
    component.ngOnInit();
    //THEN
    expect(component.getRecords).toHaveBeenCalled();
  });


  it('test getRecords() then expect pieChartLabels, pieChartData, records to be set', () => {
    //GIVEN
    const data: RecordType[] = [
      { id: "1", name: "First Grade", pass: 60 },
      { id: "2", name: "Second Grade", pass: 65 },
      { id: "3", name: "Third Grade", pass: 75 },
    ];
    const records = {
      totalCountOfPass: 200,
      recordInstances: data
    }
    pieChartServiceSpy.getRecords.and.returnValue(of(records));
    //WHEN
    component.getRecords();
    //THEN
    expect(component.records).toEqual(data);
    expect(component.pieChartLabels).toEqual(["First Grade", "Second Grade", "Third Grade"]);
    expect(component.pieChartData).toEqual([30, 32.5, 37.5]);
  });


  it('test getRecords() when pieChartService.getRecords() fails then expect error to be shown', () => {
    //GIVEN
    pieChartServiceSpy.getRecords.and.callFake(() => {
      return new Observable((observer) => {
        observer.error();
      })
    })
    //WHEN
    component.getRecords();
    //THEN
    expect(component.pieChartLabels).toEqual(["error occured"]);
    expect(component.pieChartData).toEqual([100]);
  });

  it('test chartClicked() with event of any type as input then expect selectedRecord to be set', () => {
    //GIVEN
    component.records =
      [
        { id: "1", name: "First Grade", pass: 60 },
        { id: "2", name: "Second Grade", pass: 65 },
        { id: "3", name: "Third Grade", pass: 75 },
      ];
    const event = { active: [{ _index: 0 }] };
    routerSpy.navigate.and.returnValue(new Promise(() => { }))
    //WHEN
    component.chartClicked(event);
    //THEN
    expect(component.selectedRecord).toEqual({ id: "1", name: "First Grade", pass: 60 });
    expect(pieChartServiceSpy.setSelectedRecord).toHaveBeenCalledWith(component.selectedRecord);
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/details']);
  });
});
