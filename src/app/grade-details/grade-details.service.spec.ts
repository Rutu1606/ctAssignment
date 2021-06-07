import { TestBed } from '@angular/core/testing';

import { GradeDetailsService } from './grade-details.service';

describe('GradeDetailsService', () => {
  let service: GradeDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GradeDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('test getGradeDetails() with grade of string type as input then expect gradesDetails to be returned', () => {
    //GIVEN
    const grade: string = "1";
    //WHEN
    const gradesDetails = service.getGradeDetails(grade);
    //THEN
    gradesDetails.subscribe((data) => {
      expect(data.length).toBeGreaterThan(0)
    })
  });
});
