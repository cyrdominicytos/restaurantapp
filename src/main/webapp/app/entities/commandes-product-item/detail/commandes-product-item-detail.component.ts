import { Component, Input } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe } from 'app/shared/date';
import { ICommandesProductItem } from '../commandes-product-item.model';

@Component({
  standalone: true,
  selector: 'jhi-commandes-product-item-detail',
  templateUrl: './commandes-product-item-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CommandesProductItemDetailComponent {
  @Input() commandesProductItem: ICommandesProductItem | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  previousState(): void {
    window.history.back();
  }
}
