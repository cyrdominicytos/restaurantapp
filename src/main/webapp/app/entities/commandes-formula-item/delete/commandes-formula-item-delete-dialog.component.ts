import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommandesFormulaItem } from '../commandes-formula-item.model';
import { CommandesFormulaItemService } from '../service/commandes-formula-item.service';

@Component({
  standalone: true,
  templateUrl: './commandes-formula-item-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommandesFormulaItemDeleteDialogComponent {
  commandesFormulaItem?: ICommandesFormulaItem;

  constructor(
    protected commandesFormulaItemService: CommandesFormulaItemService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commandesFormulaItemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
