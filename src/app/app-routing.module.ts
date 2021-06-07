import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GradeDetailsComponent } from './grade-details/grade-details.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

const routes: Routes = [
  { path: 'chart', component: PieChartComponent },
  { path: 'details', component: GradeDetailsComponent },
  { path: '**', redirectTo: 'chart' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
