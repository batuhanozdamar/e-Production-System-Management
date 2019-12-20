import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectedItemsComponent } from './rejected-items.component';

describe('RejectedItemsComponent', () => {
  let component: RejectedItemsComponent;
  let fixture: ComponentFixture<RejectedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
