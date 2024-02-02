import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommandes } from '../commandes.model';
import { CommandesService } from '../service/commandes.service';

@Component({
  standalone: true,
  templateUrl: './commandes-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommandesDeleteDialogComponent {
  commandes?: ICommandes;

  constructor(
    protected commandesService: CommandesService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commandesService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
