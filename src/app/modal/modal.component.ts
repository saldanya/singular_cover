import {Component, Input, Output} from '@angular/core';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() show;
  @Input() title = '';

  @Output() closeModal = new Subject<boolean>();

  hide() {
    this.closeModal.next(true);
  }
}
