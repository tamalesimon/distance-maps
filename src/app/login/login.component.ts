import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form = new FormGroup({
    username: new FormControl<any>(null, Validators.required),
    password: new FormControl<any>(null, Validators.required)
  });

  constructor(private authServiceService: AuthServiceService, private router: Router) { }

  submitForm() {
    console.log("testing function")
    if(this.form.invalid) {
      console.log("form is invalid")
      return;
    }

    this.authServiceService.login(
      this.form.get('username')?.value,
      this.form.get('password')?.value
    )
    .subscribe((res) => {
      console.log(res);
      this.router.navigate(['/map']);
    });
  }

}
