import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICommandesFormulaItem } from '../commandes-formula-item.model';

@Component({
  standalone: true,
  selector: 'jhi-commandes-formula-item-detail',
  templateUrl: './commandes-formula-item-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CommandesFormulaItemDetailComponent {
  @Input() commandesFormulaItem: ICommandesFormulaItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
