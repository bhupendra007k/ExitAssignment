import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewReimburstmentComponent } from './add-new-reimburstment.component';

describe('AddNewReimburstmentComponent', () => {
  let component: AddNewReimburstmentComponent;
  let fixture: ComponentFixture<AddNewReimburstmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewReimburstmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewReimburstmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
