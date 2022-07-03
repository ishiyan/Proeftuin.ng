import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { UserService } from './services/user.service';

@Component({
  selector: 'ex10-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private userService: UserService) {}

  emailControl = new UntypedFormControl('', {
    validators: [Validators.required, Validators.email],
    asyncValidators: this.userService.uniqueEmailValidator(),
    updateOn: 'blur',
  });
}
