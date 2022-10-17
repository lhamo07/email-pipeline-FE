import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SomethinggComponent } from './somethingg.component';

describe('SomethinggComponent', () => {
  let component: SomethinggComponent;
  let fixture: ComponentFixture<SomethinggComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SomethinggComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SomethinggComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
