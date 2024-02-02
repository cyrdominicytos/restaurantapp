import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICommandesProductItem } from '../commandes-product-item.model';
import { CommandesProductItemService } from '../service/commandes-product-item.service';

@Component({
  standalone: true,
  templateUrl: './commandes-product-item-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CommandesProductItemDeleteDialogComponent {
  commandesProductItem?: ICommandesProductItem;

  constructor(
    protected commandesProductItemService: CommandesProductItemService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.commandesProductItemService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
