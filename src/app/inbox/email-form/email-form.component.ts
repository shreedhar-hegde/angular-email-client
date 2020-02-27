import { Component, OnInit, Input, Output } from '@angular/core';
import { Email } from '../email';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email-form',
  templateUrl: './email-form.component.html',
  styleUrls: ['./email-form.component.css']
})
export class EmailFormComponent implements OnInit {

  @Output() emailSubmit = new EventEmitter()

  emailForm: FormGroup

  @Input() email:Email

  constructor() { }

  ngOnInit() {
    
    const {subject, from, to, text} = this.email

    this.emailForm = new FormGroup({
      to: new FormControl(to, [Validators.required, Validators.email]),
      from: new FormControl({value: from, disabled: true}),
      subject: new FormControl(subject, Validators.required),
      text: new FormControl(text, Validators.required)
    })
  }

  onSubmit() {
    if(this.emailForm.value) {
      this.emailSubmit.emit(this.emailForm.value)
    }

  }

}
