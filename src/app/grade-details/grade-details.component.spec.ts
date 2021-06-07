import { SimpleChange } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PieChartService } from '../pie-chart/pie-chart.service';
import { GradeDetailsComponent, Student, Subject } from './grade-details.component';
import { GradeDetailsService } from './grade-details.service';

describe('GradeDetailsComponent', () => {
  let component: GradeDetailsComponent;
  let fixture: ComponentFixture<GradeDetailsComponent>;
  let gradeDetailsServiceSpy: jasmine.SpyObj<GradeDetailsService>;
  let pieChartServiceSpy: jasmine.SpyObj<PieChartService>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const GradeDetailsServiceSpy = jasmine.createSpyObj(GradeDetailsService, ['getGradeDetails']);
    const PieChartServiceSpy = jasmine.createSpyObj(PieChartService, ['getSelectedRecord']);
    const RouterSpy = jasmine.createSpyObj(Router, ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [GradeDetailsComponent],
      providers: [
        Router,
        { provide: GradeDetailsService, useValue: GradeDetailsServiceSpy },
        { provide: PieChartService, useValue: PieChartServiceSpy },
        { provide: Router, useValue: RouterSpy }
      ]
    })
      .compileComponents();
    gradeDetailsServiceSpy = TestBed.get(GradeDetailsService);
    pieChartServiceSpy = TestBed.get(PieChartService);
    routerSpy = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GradeDetailsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('test ngOnChanges() then expect getGradeDetails() to have been called.', () => {
  //   //GIVEN
  //   spyOn(component, "getGradeDetails");
  //   const firstGrade = { id: "1", name: "First Grade", pass: 60 };
  //   const secondGrade = { id: "2", name: "Second Grade", pass: 65 };
  //   //WHEN
  //   component.ngOnChanges({
  //     record: new SimpleChange(firstGrade, secondGrade, false)
  //   });
  //   //THEN
  //   expect(component.getGradeDetails).toHaveBeenCalled();
  //   expect(component.record).toEqual(secondGrade);
  // });

  it('test ngOnInit() then expect getGradeDetails() to have been called.', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const firstGrade = { id: "1", name: "First Grade", pass: 60 };
    pieChartServiceSpy.getSelectedRecord.and.returnValue(JSON.stringify(firstGrade));
    //WHEN
    component.ngOnInit();
    //THEN
    expect(component.getGradeDetails).toHaveBeenCalled();
    expect(pieChartServiceSpy.getSelectedRecord).toHaveBeenCalled();
    expect(component.record).toEqual(firstGrade);
  });

  it('test getGradeDetails() then expect students, count to be set.', () => {
    //GIVEN
    component.record = { id: "1", name: "First Grade", pass: 60 };
    const gradesDetails: Student[] = [];
    gradesDetails.push(new Student("Priyanka", "1", 12, "pj@gmail.com", 85, 80, 80, 90));
    gradesDetails.push(new Student("Vaibhav", "2", 13, "vs@gmail.com", 70, 80, 90, 99));
    gradeDetailsServiceSpy.getGradeDetails.and.returnValue(of(gradesDetails))
    //WHEN
    component.getGradeDetails();
    //THEN
    expect(gradeDetailsServiceSpy.getGradeDetails).toHaveBeenCalledWith("1");
    expect(component.students).toEqual(gradesDetails);
    expect(component.count).toEqual(2);
  });

  it('test getGradeDetails() when gradeDetailsService.getGradeDetails() fails then expect count to be -1', () => {
    //GIVEN
    gradeDetailsServiceSpy.getGradeDetails.and.callFake(() => {
      return new Observable((observer) => {
        observer.error();
      })
    })
    //WHEN
    component.getGradeDetails();
    //THEN
    expect(component.count).toEqual(-1);
  });

  it('test isEmailValid() with student having valid email id then expect invalidEmail to be false', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 12, "nj@gmail.com", 85, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    //WHEN
    component.isEmailValid(student);
    //THEN
    expect(component.invalidEmail).toBeFalse();
  });


  it('test isEmailValid() with student having invalid email id then expect invalidEmail to be true', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 12, "nnnn", 85, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    //WHEN
    component.isEmailValid(student);
    //THEN
    expect(component.invalidEmail).toBeTrue();
  });

  it('test isMarksValid() with student having english marks invalid then expect isMarksValid to be true', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 12, "nnnn", 1, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    //WHEN
    component.isMarksValid(student, Subject.ENGLISH);
    //THEN
    expect(component.invlidMarks).toBeTrue();
  });

  it('test isMarksValid() with student having english marks of type string then expect isMarksValid to be true', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 12, "nj@gmail.com", 88, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    const englishMarks = fixture.debugElement.query(By.css(`#${Subject.ENGLISH}_${23}`));
    englishMarks.nativeElement.innerText = "not a number";
    //WHEN
    component.isMarksValid(student, Subject.ENGLISH);
    //THEN
    expect(component.invlidMarks).toBeTrue();
  });

  it('test isAgeValid() with student having age of type string then expect invalidAge to be true', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 12, "nnnn", 88, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    const englishMarks = fixture.debugElement.query(By.css(`#age_${23}`));
    englishMarks.nativeElement.innerText = "not a number";
    //WHEN
    component.isAgeValid(student);
    //THEN
    expect(component.invalidAge).toBeTrue();
  });

  it('test isAgeValid() with student having invalid age then expect invalidAge to be true', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 2, "nnnn", 88, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    //WHEN
    component.isAgeValid(student);
    //THEN
    expect(component.invalidAge).toBeTrue();
  });

  it('test isAgeValid() with student having age as number 6 then expect invalidAge to be false', () => {
    //GIVEN
    spyOn(component, "getGradeDetails");
    const students: Array<Student> = [];
    students.push(new Student("Nikhil", "23", 6, "nnnn", 88, 80, 90, 90));
    component.students = students;
    fixture.detectChanges();
    const student = component.students[0];
    //WHEN
    component.isAgeValid(student);
    //THEN
    expect(component.invalidAge).toBeFalse();
  });

  it('test goBack() then expect router.navigate to have been called', () => {
    //WHEN
    component.goBack();
    //THEN
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/chart']);
  })
});
