import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { passComponent } from './pass.component';

describe('passComponent', () => {
  let component: passComponent;
  let fixture: ComponentFixture<passComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ passComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(passComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
