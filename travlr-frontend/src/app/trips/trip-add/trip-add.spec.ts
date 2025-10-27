import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripAddComponent } from './trip-add';
import { provideHttpClient } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('TripAddComponent', () => {
  let component: TripAddComponent;
  let fixture: ComponentFixture<TripAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripAddComponent, RouterTestingModule],
      providers: [provideHttpClient()]
    }).compileComponents();

    fixture = TestBed.createComponent(TripAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

