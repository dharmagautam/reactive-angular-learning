import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageReactiveComponent } from './home-page-reactive.component';

describe('HomePageReactiveComponent', () => {
  let component: HomePageReactiveComponent;
  let fixture: ComponentFixture<HomePageReactiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePageReactiveComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HomePageReactiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
