import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IProductCategory } from 'app/entities/product-category/product-category.model';
import { ProductCategoryService } from 'app/entities/product-category/service/product-category.service';
import { IFormula } from 'app/entities/formula/formula.model';
import { FormulaService } from 'app/entities/formula/service/formula.service';
import { IProduct } from '../product.model';
import { ProductService } from '../service/product.service';
import { ProductFormService } from './product-form.service';

import { ProductUpdateComponent } from './product-update.component';

describe('Product Management Update Component', () => {
  let comp: ProductUpdateComponent;
  let fixture: ComponentFixture<ProductUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let productFormService: ProductFormService;
  let productService: ProductService;
  let productCategoryService: ProductCategoryService;
  let formulaService: FormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), ProductUpdateComponent],
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
      .overrideTemplate(ProductUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(ProductUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    productFormService = TestBed.inject(ProductFormService);
    productService = TestBed.inject(ProductService);
    productCategoryService = TestBed.inject(ProductCategoryService);
    formulaService = TestBed.inject(FormulaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call ProductCategory query and add missing value', () => {
      const product: IProduct = { id: 456 };
      const category: IProductCategory = { id: 11413 };
      product.category = category;

      const productCategoryCollection: IProductCategory[] = [{ id: 18493 }];
      jest.spyOn(productCategoryService, 'query').mockReturnValue(of(new HttpResponse({ body: productCategoryCollection })));
      const additionalProductCategories = [category];
      const expectedCollection: IProductCategory[] = [...additionalProductCategories, ...productCategoryCollection];
      jest.spyOn(productCategoryService, 'addProductCategoryToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ product });
      comp.ngOnInit();

      expect(productCategoryService.query).toHaveBeenCalled();
      expect(productCategoryService.addProductCategoryToCollectionIfMissing).toHaveBeenCalledWith(
        productCategoryCollection,
        ...additionalProductCategories.map(expect.objectContaining),
      );
      expect(comp.productCategoriesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Formula query and add missing value', () => {
      const product: IProduct = { id: 456 };
      const formula: IFormula = { id: 20382 };
      product.formula = formula;

      const formulaCollection: IFormula[] = [{ id: 29929 }];
      jest.spyOn(formulaService, 'query').mockReturnValue(of(new HttpResponse({ body: formulaCollection })));
      const additionalFormulas = [formula];
      const expectedCollection: IFormula[] = [...additionalFormulas, ...formulaCollection];
      jest.spyOn(formulaService, 'addFormulaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ product });
      comp.ngOnInit();

      expect(formulaService.query).toHaveBeenCalled();
      expect(formulaService.addFormulaToCollectionIfMissing).toHaveBeenCalledWith(
        formulaCollection,
        ...additionalFormulas.map(expect.objectContaining),
      );
      expect(comp.formulasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const product: IProduct = { id: 456 };
      const category: IProductCategory = { id: 19179 };
      product.category = category;
      const formula: IFormula = { id: 11761 };
      product.formula = formula;

      activatedRoute.data = of({ product });
      comp.ngOnInit();

      expect(comp.productCategoriesSharedCollection).toContain(category);
      expect(comp.formulasSharedCollection).toContain(formula);
      expect(comp.product).toEqual(product);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduct>>();
      const product = { id: 123 };
      jest.spyOn(productFormService, 'getProduct').mockReturnValue(product);
      jest.spyOn(productService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ product });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: product }));
      saveSubject.complete();

      // THEN
      expect(productFormService.getProduct).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(productService.update).toHaveBeenCalledWith(expect.objectContaining(product));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduct>>();
      const product = { id: 123 };
      jest.spyOn(productFormService, 'getProduct').mockReturnValue({ id: null });
      jest.spyOn(productService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ product: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: product }));
      saveSubject.complete();

      // THEN
      expect(productFormService.getProduct).toHaveBeenCalled();
      expect(productService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IProduct>>();
      const product = { id: 123 };
      jest.spyOn(productService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ product });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(productService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareProductCategory', () => {
      it('Should forward to productCategoryService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productCategoryService, 'compareProductCategory');
        comp.compareProductCategory(entity, entity2);
        expect(productCategoryService.compareProductCategory).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareFormula', () => {
      it('Should forward to formulaService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(formulaService, 'compareFormula');
        comp.compareFormula(entity, entity2);
        expect(formulaService.compareFormula).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
