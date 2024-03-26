import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Emitters } from '../emitters/emitters';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: '',
    password: '',
  });
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      email: '',
      password: '',
    });
  }

  submit(): void {
    this.http
      .post('http://localhost:8000/api/login', this.form.getRawValue(), {
        withCredentials: true,
      })
      .subscribe(() => this.router.navigate(['/']));
  }
}
