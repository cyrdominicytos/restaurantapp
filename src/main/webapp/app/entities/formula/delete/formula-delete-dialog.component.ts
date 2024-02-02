import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IFormula } from '../formula.model';
import { FormulaService } from '../service/formula.service';

@Component({
  standalone: true,
  templateUrl: './formula-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class FormulaDeleteDialogComponent {
  formula?: IFormula;

  constructor(
    protected formulaService: FormulaService,
    protected activeModal: NgbActiveModal,
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.formulaService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
