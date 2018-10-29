import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  returnUrl: string;
  errorDirectAccess: string = "";
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {

    this.route.queryParams.pipe().subscribe(params => {
      if (params.e) {
        if (localStorage.getItem('currentUser')) {
          if (localStorage.getItem('currentUser') === params.e)
            this.router.navigate(['/landing']);
        }
      }else{
        this.errorDirectAccess = "Direct access content not allowed";
      }
    });


    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  sign() {
    this.route.queryParams.pipe().subscribe(params => {
      localStorage.setItem("currentUser", params.e);
      this.router.navigate(['/landing']);
    });
  }
}