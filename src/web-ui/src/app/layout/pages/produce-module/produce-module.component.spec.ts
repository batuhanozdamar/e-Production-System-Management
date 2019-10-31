import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduceModuleComponent } from './produce-module.component';

describe('ProduceModuleComponent', () => {
  let component: ProduceModuleComponent;
  let fixture: ComponentFixture<ProduceModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProduceModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduceModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
