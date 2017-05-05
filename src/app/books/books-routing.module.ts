import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'books',
                component: ListComponent
            }
        ])
    ]
})
export class BooksRoutingModule {}