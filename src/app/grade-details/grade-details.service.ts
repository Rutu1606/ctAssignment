import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Student } from './grade-details.component';

@Injectable({
  providedIn: 'root'
})
export class GradeDetailsService {

  constructor() { }

  getGradeDetails(grade: string) {
    const gradesDetails: Student[] = [];
    switch (grade) {
      //OBJECTS CREATED USING CONSTRUCTOR JUST FOR THE DUMMY DATA
      case "1":
        gradesDetails.push(new Student("Priyanka", "11", 12, "pj@gmail.com", 85, 80, 80, 90));
        gradesDetails.push(new Student("Vaibhav", "12", 13, "vs@gmail.com", 70, 80, 90, 99));
        gradesDetails.push(new Student("Pooja", "13", 12, "pk@gmail.com", 85, 80, 90, 90));
        break;
      case "2":
        gradesDetails.push(new Student("Prasad", "21", 12, "pj@gmail.com", 85, 80, 80, 90));
        gradesDetails.push(new Student("Swapnali", "22", 13, "st@gmail.com", 70, 80, 90, 99));
        gradesDetails.push(new Student("Nikhil", "23", 12, "nj@gmail.com", 85, 80, 90, 90));
        break;
      case "3":
        gradesDetails.push(new Student("Minal", "31", 12, "mj@gmail.com", 85, 80, 80, 90));
        gradesDetails.push(new Student("Rahul", "32", 13, "rs@gmail.com", 70, 80, 90, 99));
        gradesDetails.push(new Student("Raj", "33", 12, "rk@gmail.com", 85, 80, 90, 90));
        break;
      default:
        gradesDetails.push(new Student("default", "000", 12, "pj@gmail.com", 85, 80, 80, 90));
        break;
    }
    return of(gradesDetails);
  }
}
