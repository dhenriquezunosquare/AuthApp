import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { last } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  miForm: FormGroup = this.fb.group({
    name: ['D2', Validators.required],
    lastName: ['H2', Validators.required],
    email: ['test@test.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servicio: AuthService
  ) {}

  ngOnInit(): void {}

  register(): void {
    if (this.miForm.valid) {
      const name = this.miForm.get('name')?.value;
      const lastName = this.miForm.get('lastName')?.value;
      const email = this.miForm.get('email')?.value;
      const password = this.miForm.get('password')?.value;

      this.servicio
        .register(name, lastName, email, password)
        .subscribe((data) => {
          console.log(data);
          if (data) {
            this.router.navigateByUrl('/dashboard');
          }else{
            Swal.fire('Error de registro',data,'error');
          }
        });
    }
  }
}
