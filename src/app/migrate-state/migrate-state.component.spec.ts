import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MigrateStateComponent } from './migrate-state.component';

describe('MigrateStateComponent', () => {
  let component: MigrateStateComponent;
  let fixture: ComponentFixture<MigrateStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MigrateStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MigrateStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
