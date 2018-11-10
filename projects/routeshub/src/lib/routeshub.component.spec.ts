import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteshubComponent } from './routeshub.component';

describe('RouteshubComponent', () => {
  let component: RouteshubComponent;
  let fixture: ComponentFixture<RouteshubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteshubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteshubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
