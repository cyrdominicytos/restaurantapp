import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ICommandes } from 'app/entities/commandes/commandes.model';
import { CommandesService } from 'app/entities/commandes/service/commandes.service';
import { CommandesProductItemService } from '../service/commandes-product-item.service';
import { ICommandesProductItem } from '../commandes-product-item.model';
import { CommandesProductItemFormService, CommandesProductItemFormGroup } from './commandes-product-item-form.service';

@Component({
  standalone: true,
  selector: 'jhi-commandes-product-item-update',
  templateUrl: './commandes-product-item-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CommandesProductItemUpdateComponent implements OnInit {
  isSaving = false;
  commandesProductItem: ICommandesProductItem | null = null;

  productsCollection: IProduct[] = [];
  commandesSharedCollection: ICommandes[] = [];

  editForm: CommandesProductItemFormGroup = this.commandesProductItemFormService.createCommandesProductItemFormGroup();

  constructor(
    protected commandesProductItemService: CommandesProductItemService,
    protected commandesProductItemFormService: CommandesProductItemFormService,
    protected productService: ProductService,
    protected commandesService: CommandesService,
    protected activatedRoute: ActivatedRoute,
  ) {}

  compareProduct = (o1: IProduct | null, o2: IProduct | null): boolean => this.productService.compareProduct(o1, o2);

  compareCommandes = (o1: ICommandes | null, o2: ICommandes | null): boolean => this.commandesService.compareCommandes(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ commandesProductItem }) => {
      this.commandesProductItem = commandesProductItem;
      if (commandesProductItem) {
        this.updateForm(commandesProductItem);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const commandesProductItem = this.commandesProductItemFormService.getCommandesProductItem(this.editForm);
    if (commandesProductItem.id !== null) {
      this.subscribeToSaveResponse(this.commandesProductItemService.update(commandesProductItem));
    } else {
      this.subscribeToSaveResponse(this.commandesProductItemService.create(commandesProductItem));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICommandesProductItem>>): void {
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

  protected updateForm(commandesProductItem: ICommandesProductItem): void {
    this.commandesProductItem = commandesProductItem;
    this.commandesProductItemFormService.resetForm(this.editForm, commandesProductItem);

    this.productsCollection = this.productService.addProductToCollectionIfMissing<IProduct>(
      this.productsCollection,
      commandesProductItem.product,
    );
    this.commandesSharedCollection = this.commandesService.addCommandesToCollectionIfMissing<ICommandes>(
      this.commandesSharedCollection,
      commandesProductItem.commandes,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.productService
      .query({ filter: 'commandesproductitem-is-null' })
      .pipe(map((res: HttpResponse<IProduct[]>) => res.body ?? []))
      .pipe(
        map((products: IProduct[]) =>
          this.productService.addProductToCollectionIfMissing<IProduct>(products, this.commandesProductItem?.product),
        ),
      )
      .subscribe((products: IProduct[]) => (this.productsCollection = products));

    this.commandesService
      .query()
      .pipe(map((res: HttpResponse<ICommandes[]>) => res.body ?? []))
      .pipe(
        map((commandes: ICommandes[]) =>
          this.commandesService.addCommandesToCollectionIfMissing<ICommandes>(commandes, this.commandesProductItem?.commandes),
        ),
      )
      .subscribe((commandes: ICommandes[]) => (this.commandesSharedCollection = commandes));
  }
}
