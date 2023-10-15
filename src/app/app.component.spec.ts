import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ThemingService } from './shared/services/theming.service';
import { ComponentFixture } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Add these stub components
@Component({
  selector: 'app-sidenav',
  template: ''
})
class SidenavStubComponent {}

@Component({
  selector: 'app-header',
  template: ''
})
class HeaderStubComponent {}

@Component({
  selector: 'app-footer',
  template: ''
})
class FooterStubComponent {} // Add this stub component

@Component({
  selector: 'app-mobile-header',
  template: ''
})
class MobileHeaderStubComponent {}

@Component({
  selector: 'app-mobile-footer',
  template: ''
})
class MobileFooterStubComponent {}


describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let themingService: ThemingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppComponent, SidenavStubComponent, HeaderStubComponent, FooterStubComponent, MobileHeaderStubComponent, MobileFooterStubComponent ], // Add FooterStubComponent here
      imports: [ BrowserAnimationsModule, MatSidenavModule, RouterTestingModule ],
      providers: [
        ThemingService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'testId' }) // Use 'of' to return an Observable
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    themingService = TestBed.inject(ThemingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});