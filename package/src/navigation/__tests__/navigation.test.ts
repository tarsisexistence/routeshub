// tslint:disable:max-line-length
import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { Routes } from '@angular/router';
import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';
import { getUnit } from '../../functions';
import { NavigationModule } from '../navigation.module';
import { createRoot } from '../../creators/root.creator';

const APP_NOTES_KEY = Symbol();

@Component({
  selector: 'app-header',
  template: `
    <a [navLink]="app.root.state" navLinkActive="active">Home</a>
    <a navLink="{{ app.about.state }}">About</a>
    <a [navLink]="app.map">Map</a>
    <a [navLink]="app.user" [navParams]="{ user: 'maktarsis' }">User</a>
    <a [navLink]="app.id" [navParams]="{ id: '123' }">User</a>
    <a [navParams]="{ id: '123' }" [navLink]="app.id">User</a>
  `
})
class TestComponent {
  public app = getUnit(APP_NOTES_KEY);
}

describe('Navigation Link Directive', () => {
  let location: Location;
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  const routes: Routes = ([] = [
    {
      path: '',
      component: TestComponent
    },
    {
      path: 'about',
      component: TestComponent
    },
    {
      path: 'map',
      component: TestComponent
    },
    {
      path: ':user',
      component: TestComponent
    },
    {
      path: 'users/:id',
      component: TestComponent
    }
  ]);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NavigationModule, RouterTestingModule.withRoutes(routes)]
    }).compileComponents();

    createRoot(routes, { key: APP_NOTES_KEY });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    location = TestBed.inject(Location);
  });

  it('should have root path', () => {
    expect(location.path()).toBe('');
  });

  it('should have active link', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[0];
    link.click();
    tick();
    expect(link.classList.contains('active')).toBe(true);
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

  it('should navigate to route with dynamic path', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[3];
    link.click();
    tick();
    expect(location.path()).toBe('/maktarsis');
  }));

  it('should navigate to route with dynamic double path', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[4];
    link.click();
    tick();
    expect(location.path()).toBe('/users/123');
  }));

  it('should the same href regardless of order ', fakeAsync(() => {
    const link = fixture.debugElement.nativeElement.querySelectorAll('a')[4];
    const link2 = fixture.debugElement.nativeElement.querySelectorAll('a')[5];
    expect(link.href).toBe(link2.href);
  }));
});
