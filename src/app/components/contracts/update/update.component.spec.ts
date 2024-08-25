import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateContractComponent } from './update.component';

describe('UpdateComponent', () => {
  let component: UpdateContractComponent;
  let fixture: ComponentFixture<UpdateContractComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateContractComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateContractComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
