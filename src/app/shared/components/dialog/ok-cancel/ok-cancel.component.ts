import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-ok-cancel',
  imports: [],
  templateUrl: './ok-cancel.component.html',
  styleUrl: './ok-cancel.component.scss'
})
export class OkCancelComponent {
  title = input<string>();
  message = input<string>();

  ok = output<void>();
  cancel = output<void>();

  onOkClick() {
    this.ok.emit();
  }

  onCancelClick() {
    this.cancel.emit();
  }
}