import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { WorkdayCalculatorComponent } from './components/workday-calculator/workday-calculator.component';


const routes: Routes = [ 
 
  { path: 'workdaycalculate', component: WorkdayCalculatorComponent },
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


