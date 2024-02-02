import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { ICommandes } from 'app/entities/commandes/commandes.model';
import { CommandesService } from 'app/entities/commandes/service/commandes.service';
import { ICommandesProductItem } from '../commandes-product-item.model';
import { CommandesProductItemService } from '../service/commandes-product-item.service';
import { CommandesProductItemFormService } from './commandes-product-item-form.service';

import { CommandesProductItemUpdateComponent } from './commandes-product-item-update.component';

describe('CommandesProductItem Management Update Component', () => {
  let comp: CommandesProductItemUpdateComponent;
  let fixture: ComponentFixture<CommandesProductItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let commandesProductItemFormService: CommandesProductItemFormService;
  let commandesProductItemService: CommandesProductItemService;
  let productService: ProductService;
  let commandesService: CommandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CommandesProductItemUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(CommandesProductItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommandesProductItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    commandesProductItemFormService = TestBed.inject(CommandesProductItemFormService);
    commandesProductItemService = TestBed.inject(CommandesProductItemService);
    productService = TestBed.inject(ProductService);
    commandesService = TestBed.inject(CommandesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call product query and add missing value', () => {
      const commandesProductItem: ICommandesProductItem = { id: 456 };
      const product: IProduct = { id: 16506 };
      commandesProductItem.product = product;

      const productCollection: IProduct[] = [{ id: 17780 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const expectedCollection: IProduct[] = [product, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ commandesProductItem });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, product);
      expect(comp.productsCollection).toEqual(expectedCollection);
    });

    it('Should call Commandes query and add missing value', () => {
      const commandesProductItem: ICommandesProductItem = { id: 456 };
      const commandes: ICommandes = { id: 13783 };
      commandesProductItem.commandes = commandes;

      const commandesCollection: ICommandes[] = [{ id: 14201 }];
      jest.spyOn(commandesService, 'query').mockReturnValue(of(new HttpResponse({ body: commandesCollection })));
      const additionalCommandes = [commandes];
      const expectedCollection: ICommandes[] = [...additionalCommandes, ...commandesCollection];
      jest.spyOn(commandesService, 'addCommandesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ commandesProductItem });
      comp.ngOnInit();

      expect(commandesService.query).toHaveBeenCalled();
      expect(commandesService.addCommandesToCollectionIfMissing).toHaveBeenCalledWith(
        commandesCollection,
        ...additionalCommandes.map(expect.objectContaining),
      );
      expect(comp.commandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const commandesProductItem: ICommandesProductItem = { id: 456 };
      const product: IProduct = { id: 24464 };
      commandesProductItem.product = product;
      const commandes: ICommandes = { id: 26323 };
      commandesProductItem.commandes = commandes;

      activatedRoute.data = of({ commandesProductItem });
      comp.ngOnInit();

      expect(comp.productsCollection).toContain(product);
      expect(comp.commandesSharedCollection).toContain(commandes);
      expect(comp.commandesProductItem).toEqual(commandesProductItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandesProductItem>>();
      const commandesProductItem = { id: 123 };
      jest.spyOn(commandesProductItemFormService, 'getCommandesProductItem').mockReturnValue(commandesProductItem);
      jest.spyOn(commandesProductItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandesProductItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: commandesProductItem }));
      saveSubject.complete();

      // THEN
      expect(commandesProductItemFormService.getCommandesProductItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(commandesProductItemService.update).toHaveBeenCalledWith(expect.objectContaining(commandesProductItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandesProductItem>>();
      const commandesProductItem = { id: 123 };
      jest.spyOn(commandesProductItemFormService, 'getCommandesProductItem').mockReturnValue({ id: null });
      jest.spyOn(commandesProductItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandesProductItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: commandesProductItem }));
      saveSubject.complete();

      // THEN
      expect(commandesProductItemFormService.getCommandesProductItem).toHaveBeenCalled();
      expect(commandesProductItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandesProductItem>>();
      const commandesProductItem = { id: 123 };
      jest.spyOn(commandesProductItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandesProductItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(commandesProductItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareCommandes', () => {
      it('Should forward to commandesService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(commandesService, 'compareCommandes');
        comp.compareCommandes(entity, entity2);
        expect(commandesService.compareCommandes).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
