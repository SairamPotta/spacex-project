import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call isSelected method by passing input as year', () => {
    spyOn(component.emitFilter, 'emit');
    component.isSelected("2019");
    expect(component.activeYear).toBe("2019");
    expect(component.emitFilter.emit).toHaveBeenCalled();
  });

  it('should call isSelected method by passing input as true with option as launched', () => {
    spyOn(component.emitFilter, 'emit');
    component.isSelected(true, 'launched');
    expect(component.isLaunched).toBeTruthy();
    expect(component.emitFilter.emit).toHaveBeenCalled();
  });

  it('should call isSelected method by passing input as true with option as landed', () => {
    spyOn(component.emitFilter, 'emit');
    component.isSelected(true, 'landed');
    expect(component.isLanded).toBeTruthy();
    expect(component.emitFilter.emit).toHaveBeenCalled();
  });

  it('should call remove filter', () => {
    spyOn(component.emitFilter, 'emit');
    component.removeFilter();
    expect(component.activeYear).toBeUndefined();
    expect(component.emitFilter.emit).toHaveBeenCalled();
  });
});
