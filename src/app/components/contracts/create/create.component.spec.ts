import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContractsComponent } from './create.component';

describe('CreateContractsComponent', () => {
  let component: CreateContractsComponent;
  let fixture: ComponentFixture<CreateContractsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateContractsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateContractsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
