import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBloodRequestComponent } from './manage-blood-request.component';

describe('ManageBloodRequestComponent', () => {
  let component: ManageBloodRequestComponent;
  let fixture: ComponentFixture<ManageBloodRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageBloodRequestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageBloodRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
