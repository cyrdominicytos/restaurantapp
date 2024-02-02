import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AlertError } from 'app/shared/alert/alert-error.model';
import { EventManager, EventWithContent } from 'app/core/util/event-manager.service';
import { DataUtils, FileLoadError } from 'app/core/util/data-util.service';
import { FormulaService } from '../service/formula.service';
import { IFormula } from '../formula.model';
import { FormulaFormService, FormulaFormGroup } from './formula-form.service';

@Component({
  standalone: true,
  selector: 'jhi-formula-update',
  templateUrl: './formula-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class FormulaUpdateComponent implements OnInit {
  isSaving = false;
  formula: IFormula | null = null;

  editForm: FormulaFormGroup = this.formulaFormService.createFormulaFormGroup();

  constructor(
    protected dataUtils: DataUtils,
    protected eventManager: EventManager,
    protected formulaService: FormulaService,
    protected formulaFormService: FormulaFormService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ formula }) => {
      this.formula = formula;
      if (formula) {
        this.updateForm(formula);
      }
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(base64String: string, contentType: string | null | undefined): void {
    this.dataUtils.openFile(base64String, contentType);
  }

  setFileData(event: Event, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe({
      error: (err: FileLoadError) =>
        this.eventManager.broadcast(new EventWithContent<AlertError>('restaurantappApp.error', { ...err, key: 'error.file.' + err.key })),
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const formula = this.formulaFormService.getFormula(this.editForm);
    if (formula.id !== null) {
      this.subscribeToSaveResponse(this.formulaService.update(formula));
    } else {
      this.subscribeToSaveResponse(this.formulaService.create(formula));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFormula>>): void {
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

  protected updateForm(formula: IFormula): void {
    this.formula = formula;
    this.formulaFormService.resetForm(this.editForm, formula);
  }
}
