import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosevaluarComponent } from './alumnos-evaluar.component';

describe('AlumnosverComponent', () => {
  let component: AlumnosevaluarComponent;
  let fixture: ComponentFixture<AlumnosevaluarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlumnosevaluarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnosevaluarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
