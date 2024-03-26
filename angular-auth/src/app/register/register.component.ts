import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: '',
    email: '',
    password: '',
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  submit(): void {
    this.http
      .post('http://127.0.0.1:8000/api/register', this.form.getRawValue())
      .subscribe((resp) => {
        console.log(resp);
        this.router.navigate(['/login']);
      });
  }
  ngOnInit(): void {
    this.form = this.fb.group({
      name: '',
      email: '',
      password: '',
    });
  }
}
