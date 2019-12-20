import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferedItemsComponent } from './offered-items.component';

describe('OfferedItemsComponent', () => {
  let component: OfferedItemsComponent;
  let fixture: ComponentFixture<OfferedItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfferedItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfferedItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
