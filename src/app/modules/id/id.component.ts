import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { NameService } from './name.validator';

@Component({
  selector: 'app-id',
  templateUrl: './id.component.html',
  styleUrls: ['./id.component.scss']
})
export class IdComponent implements OnInit {

  constructor(
		private nameService: NameService
	) { }

	new: FormGroup = new FormGroup({
		name: new FormControl('', {
			validators: [Validators.required],
			asyncValidators: this.nameService.uniqueNameValidator(),
			updateOn: 'blur',
		}),
		address: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		payment: new FormControl('', [
			Validators.required,
			Validators.minLength(98),
			Validators.maxLength(98),
		]),
		label: new FormControl('', [
			Validators.required,
		])
	});

  ngOnInit(): void {
  }

	submit() {
		console.log(this.new.value);
	}

	reset() {
		this.new.reset();
	}

}
