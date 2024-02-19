import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdvSearchPage } from './adv-search.page';

describe('AdvSearchPage', () => {
  let component: AdvSearchPage;
  let fixture: ComponentFixture<AdvSearchPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AdvSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
