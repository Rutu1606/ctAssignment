import { Component, Input, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { RecordType } from '../pie-chart/pie-chart.component';
import { PieChartService } from '../pie-chart/pie-chart.service';
import { GradeDetailsService } from './grade-details.service';

@Component({
  selector: 'app-grade-details',
  templateUrl: './grade-details.component.html',
  styleUrls: ['./grade-details.component.scss']
})

export class GradeDetailsComponent implements OnInit {
  record: RecordType = new RecordType;
  students: Array<Student> = [];
  count: number = 0;
  invalidAge: boolean = false;
  invalidEmail: boolean = false;
  invlidMarks: boolean = false;
  Subject = Subject;
  constructor(private gradeDetailsService: GradeDetailsService,
    private pieChartService: PieChartService,
    private router: Router) { }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if (changes["record"]) {
  //     this.record = changes["record"].currentValue;
  //   }
  //   this.getGradeDetails();
  // }

  ngOnInit() {
    const SelectedRecord = this.pieChartService.getSelectedRecord();
    this.record = SelectedRecord ? JSON.parse(SelectedRecord) : [];
    this.getGradeDetails();
  }

  getGradeDetails() {
    this.gradeDetailsService.getGradeDetails(this.record.id).subscribe((data) => {
      this.students = data;
      this.count = data.length;
    }, () => {
      this.count = -1;
      alert("error occured");
    })
  }

  isAgeValid(studentObj: Student): void {
    const element = document.getElementById(`age_${studentObj.id}`);
    if (element) {
      const value = parseInt(element.innerText);
      this.invalidAge = isNaN(value) || value < 6
    }
  }

  isEmailValid(studentObj: Student): void {
    const element = document.getElementById(`email_${studentObj.id}`);
    if (element) {
      var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      if (element.innerText.match(mailformat)) {
        this.invalidEmail = false;
      } else {
        this.invalidEmail = true;
      }
    }
  }

  isMarksValid(studentObj: Student, subject: Subject) {
    const element = document.getElementById(`${subject}_${studentObj.id}`);
    if (element) {
      const value = parseInt(element.innerText);
      this.invlidMarks = isNaN(value) || value < 40 || value > 100
    }
  }

  goBack() {
    this.router.navigate(['/chart']);
  }
}

export class SubjectMarks {
  english: number = 0;
  socialScience: number = 0;
  science: number = 0;
  maths: number = 0;
  //OBJECTS CREATED USING CONSTRUCTOR JUST FOR THE DUMMY DATA
  constructor(e: number, ss: number, s: number, m: number) {
    this.english = e;
    this.socialScience = ss;
    this.science = s;
    this.maths = m;
  }
}

export class Student {
  name: string = "";
  id: string = "";
  age: number = 0;
  email: string = "";
  marks: SubjectMarks = new SubjectMarks(0, 0, 0, 0);
  //OBJECTS CREATED USING CONSTRUCTOR JUST FOR THE DUMMY DATA
  constructor(name: string, id: string, age: number, email: string, e: number, ss: number, s: number, m: number) {
    this.name = name;
    this.id = id;
    this.age = age;
    this.email = email;
    this.marks = new SubjectMarks(e, ss, s, m);
  }
}

export enum Subject {
  MATHS = "math",
  ENGLISH = "english",
  SCIENCE = "science_",
  SOCIAL_SCIENCE = "social_science"
}