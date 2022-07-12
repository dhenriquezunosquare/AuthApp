import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miForm: FormGroup = this.fb.group({
    email: ['d@gmail.com', [Validators.required, Validators.email]],
    password: ['123', Validators.required],
  });

  constructor(private fb: FormBuilder,private router:Router,private service:AuthService) {}

  ngOnInit(): void {}

  login() {
    
    if (this.miForm.valid) {
      const email = this.miForm.get('email')?.value;
      const password = this.miForm.get('password')?.value;
      this.service.login(email, password).subscribe(data => {
        console.log(data);
        if(data===true){
          this.router.navigateByUrl('/dashboard');
        }else{
          Swal.fire('Error de Autenticacion',data,'error');
        }
      })
    }
  }
}
