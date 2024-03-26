import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private matIconRegistery: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private router: Router
  ) {
    {
      this.matIconRegistery.addSvgIcon(
        'logo',
        this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/logo.svg')
      );
    }
  }
  onHomePage() {
    this.router.navigateByUrl('/home');
  }

  authenticated = false;
  ngOnInit(): void {
    Emitters.authEmitters.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  logout(): void {
    this.http
      .post(
        'http://localhost:8000/api/logout',
        {},
        {
          withCredentials: true,
        }
      )
      .subscribe(() => (this.authenticated = false));
  }
}
