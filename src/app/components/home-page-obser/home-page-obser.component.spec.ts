import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageObserComponent } from './home-page-obser.component';

describe('HomePageObserComponent', () => {
  let component: HomePageObserComponent;
  let fixture: ComponentFixture<HomePageObserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageObserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageObserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
