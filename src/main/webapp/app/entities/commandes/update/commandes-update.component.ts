import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IFormula } from 'app/entities/formula/formula.model';
import { FormulaService } from 'app/entities/formula/service/formula.service';
import { CommandesService } from '../service/commandes.service';
import { ICommandes } from '../commandes.model';
import { CommandesFormService, CommandesFormGroup } from './commandes-form.service';

@Component({
  standalone: true,
  selector: 'jhi-commandes-update',
  templateUrl: './commandes-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommandesUpdateComponent implements OnInit {
  isSaving = false;
  commandes: ICommandes | null = null;

  clientsSharedCollection: IClient[] = [];
  productsSharedCollection: IProduct[] = [];
  formulasSharedCollection: IFormula[] = [];

  editForm: CommandesFormGroup = this.commandesFormService.createCommandesFormGroup();

  constructor(
    protected commandesService: CommandesService,
    protected commandesFormService: CommandesFormService,
    protected clientService: ClientService,
    protected productService: ProductService,
    protected formulaService: FormulaService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareClient = (o1: IClient | null, o2: IClient | null): boolean => this.clientService.compareClient(o1, o2);

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  compareFormula = (o1: IFormula | null, o2: IFormula | null): boolean => this.formulaService.compareFormula(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commandes }) => {
      this.commandes = commandes;
      if (commandes) {
        this.updateForm(commandes);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commandes = this.commandesFormService.getCommandes(this.editForm);
    if (commandes.id !== null) {
      this.subscribeToSaveResponse(this.commandesService.update(commandes));
    } else {
      this.subscribeToSaveResponse(this.commandesService.create(commandes));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommandes>>): void {
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

  protected updateForm(commandes: ICommandes): void {
    this.commandes = commandes;
    this.commandesFormService.resetForm(this.editForm, commandes);

    this.clientsSharedCollection = this.clientService.addClientToCollectionIfMissing<IClient>(this.clientsSharedCollection, commandes.user);
    this.productsSharedCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsSharedCollection,
      ...(commandes.products ?? []),
    );
    this.formulasSharedCollection = this.formulaService.addFormulaToCollectionIfMissing<IFormula>(
      this.formulasSharedCollection,
      ...(commandes.formulas ?? []),
    );
  }

  protected loadRelationshipsOptions(): void {
    this.clientService
      .query()
      .pipe(map((res: HttpResponse<IClient[]>) => res.body ?? []))
      .pipe(map((clients: IClient[]) => this.clientService.addClientToCollectionIfMissing<IClient>(clients, this.commandes?.user)))
      .subscribe((clients: IClient[]) => (this.clientsSharedCollection = clients));

    this.productService
      .query()
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, ...(this.commandes?.products ?? [])),
        ),
      )
      .subscribe((products: IProduct[]) => (this.productsSharedCollection = products));

    this.formulaService
      .query()
      .pipe(map((res: HttpResponse<IFormula[]>) => res.body ?? []))
      .pipe(
        map((formulas: IFormula[]) =>
          this.formulaService.addFormulaToCollectionIfMissing<IFormula>(formulas, ...(this.commandes?.formulas ?? [])),
        ),
      )
      .subscribe((formulas: IFormula[]) => (this.formulasSharedCollection = formulas));
  }
}
