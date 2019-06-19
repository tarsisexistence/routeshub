// tslint:disable:max-line-length
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { getHubSlices } from '../hub';
import { NavigationModule } from './navigation.module';
import { createRoot } from '../creators/root.creator';
import { Routes } from '@angular/router';
import { reset } from '../utils/reset';

const APP_HUB_KEY = Symbol();

@Component({
  selector: 'app-header',
  template: `
    <a [navLink]="slices.app.root.state" navLinkActive="active">Home</a>
    <a navLink="{{ slices.app.about.state }}">About</a>
    <a [navLink]="slices.app.map">Map</a>
    <a [navLink]="slices.app.user" [navParams]="{ user: 'maktarsis' }">User</a>
  `
})
class HeaderComponent {
  public slices = getHubSlices();
}

const routes: Routes = ([] = [
  {
    path: '',
    component: HeaderComponent
  },
  {
    path: 'about',
    component: HeaderComponent
  },
  {
    path: 'map',
    component: HeaderComponent
  },
  {
    path: ':user',
    component: HeaderComponent
  }
]);

describe('Navigation', () => {
  let location: Location;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [NavigationModule, RouterTestingModule.withRoutes(routes)]
    }).compileComponents();

    createRoot(routes, APP_HUB_KEY);
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.get(Location);
  });

  afterEach(() => {
    reset();
  });

  it('should have root path', fakeAsync(() => {
    expect(location.path()).toBe('');
  }));

  it('should have active link', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[0];
    link.click();
    tick();
    expect(link).toHaveClass('active');
  }));

  it('should navigate and change location path', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[1];
    link.click();
    tick();
    expect(location.path()).toBe('/about');
  }));

  it('should navigate and change location path and return', fakeAsync(() => {
    const links = fixture.debugElement.nativeElement.querySelectorAll('a');
    links[1].click();
    tick();
    links[0].click();
    tick();
    expect(location.path()).toBe('/');
  }));

  it('should navigate without state prop with square brackets', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[2];
    link.click();
    tick();
    expect(location.path()).toBe('/map');
  }));

  it('should navigate to dynamic route', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[3];
    link.click();
    tick();
    expect(location.path()).toBe('/maktarsis');
  }));
});
