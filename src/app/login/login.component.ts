import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form = new FormGroup({
    username: new FormControl<any>(null, Validators.required),
    password: new FormControl<any>(null, Validators.required)
  });

  constructor(private serviceService: ServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log("testing function")
    if(this.form.invalid) {
      console.log("form is invalid")
      return;
    }

    this.serviceService.login(
      this.form.get('username')?.value,
      this.form.get('password')?.value
    )
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['/map']);
    });
  }

}
