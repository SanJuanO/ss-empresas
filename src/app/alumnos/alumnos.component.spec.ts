import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Alumnos } from './alumnos.component';

describe('Alumnos', () => {
  let component: Alumnos;
  let fixture: ComponentFixture<Alumnos>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Alumnos ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Alumnos);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
