import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICommandes } from 'app/entities/commandes/commandes.model';
import { CommandesService } from 'app/entities/commandes/service/commandes.service';
import { ICommandesFormulaItem } from '../commandes-formula-item.model';
import { CommandesFormulaItemService } from '../service/commandes-formula-item.service';
import { CommandesFormulaItemFormService, CommandesFormulaItemFormGroup } from './commandes-formula-item-form.service';

@Component({
  standalone: true,
  selector: 'jhi-commandes-formula-item-update',
  templateUrl: './commandes-formula-item-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommandesFormulaItemUpdateComponent implements OnInit {
  isSaving = false;
  commandesFormulaItem: ICommandesFormulaItem | null = null;

  commandesSharedCollection: ICommandes[] = [];

  editForm: CommandesFormulaItemFormGroup = this.commandesFormulaItemFormService.createCommandesFormulaItemFormGroup();

  constructor(
    protected commandesFormulaItemService: CommandesFormulaItemService,
    protected commandesFormulaItemFormService: CommandesFormulaItemFormService,
    protected commandesService: CommandesService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareCommandes = (o1: ICommandes | null, o2: ICommandes | null): boolean => this.commandesService.compareCommandes(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commandesFormulaItem }) => {
      this.commandesFormulaItem = commandesFormulaItem;
      if (commandesFormulaItem) {
        this.updateForm(commandesFormulaItem);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commandesFormulaItem = this.commandesFormulaItemFormService.getCommandesFormulaItem(this.editForm);
    if (commandesFormulaItem.id !== null) {
      this.subscribeToSaveResponse(this.commandesFormulaItemService.update(commandesFormulaItem));
    } else {
      this.subscribeToSaveResponse(this.commandesFormulaItemService.create(commandesFormulaItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommandesFormulaItem>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(commandesFormulaItem: ICommandesFormulaItem): void {
    this.commandesFormulaItem = commandesFormulaItem;
    this.commandesFormulaItemFormService.resetForm(this.editForm, commandesFormulaItem);

    this.commandesSharedCollection = this.commandesService.addCommandesToCollectionIfMissing<ICommandes>(
      this.commandesSharedCollection,
      commandesFormulaItem.commandes,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.commandesService
      .query()
      .pipe(map((res: HttpResponse<ICommandes[]>) => res.body ?? []))
      .pipe(
        map((commandes: ICommandes[]) =>
          this.commandesService.addCommandesToCollectionIfMissing<ICommandes>(commandes, this.commandesFormulaItem?.commandes),
        ),
      )
      .subscribe((commandes: ICommandes[]) => (this.commandesSharedCollection = commandes));
  }
}
