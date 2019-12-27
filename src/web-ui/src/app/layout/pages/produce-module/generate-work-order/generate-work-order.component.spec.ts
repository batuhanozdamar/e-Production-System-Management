import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateWorkOrderComponent } from './generate-work-order.component';

describe('GenerateWorkOrderComponent', () => {
  let component: GenerateWorkOrderComponent;
  let fixture: ComponentFixture<GenerateWorkOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateWorkOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateWorkOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
