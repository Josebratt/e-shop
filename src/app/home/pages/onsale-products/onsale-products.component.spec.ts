import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnsaleProductsComponent } from './onsale-products.component';

describe('OnsaleProductsComponent', () => {
  let component: OnsaleProductsComponent;
  let fixture: ComponentFixture<OnsaleProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnsaleProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnsaleProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
