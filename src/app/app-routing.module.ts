import { AppComponent } from 'app/app.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot([
      {
        path: '**',
        component: AppComponent
      }
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
