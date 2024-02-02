import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { IClient } from 'app/entities/client/client.model';
import { ClientService } from 'app/entities/client/service/client.service';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';
import { IFormula } from 'app/entities/formula/formula.model';
import { FormulaService } from 'app/entities/formula/service/formula.service';
import { ICommandes } from '../commandes.model';
import { CommandesService } from '../service/commandes.service';
import { CommandesFormService } from './commandes-form.service';

import { CommandesUpdateComponent } from './commandes-update.component';

describe('Commandes Management Update Component', () => {
  let comp: CommandesUpdateComponent;
  let fixture: ComponentFixture<CommandesUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let commandesFormService: CommandesFormService;
  let commandesService: CommandesService;
  let clientService: ClientService;
  let productService: ProductService;
  let formulaService: FormulaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CommandesUpdateComponent],
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
      .overrideTemplate(CommandesUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommandesUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    commandesFormService = TestBed.inject(CommandesFormService);
    commandesService = TestBed.inject(CommandesService);
    clientService = TestBed.inject(ClientService);
    productService = TestBed.inject(ProductService);
    formulaService = TestBed.inject(FormulaService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Client query and add missing value', () => {
      const commandes: ICommandes = { id: 456 };
      const user: IClient = { id: 7156 };
      commandes.user = user;

      const clientCollection: IClient[] = [{ id: 28729 }];
      jest.spyOn(clientService, 'query').mockReturnValue(of(new HttpResponse({ body: clientCollection })));
      const additionalClients = [user];
      const expectedCollection: IClient[] = [...additionalClients, ...clientCollection];
      jest.spyOn(clientService, 'addClientToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ commandes });
      comp.ngOnInit();

      expect(clientService.query).toHaveBeenCalled();
      expect(clientService.addClientToCollectionIfMissing).toHaveBeenCalledWith(
        clientCollection,
        ...additionalClients.map(expect.objectContaining),
      );
      expect(comp.clientsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Product query and add missing value', () => {
      const commandes: ICommandes = { id: 456 };
      const products: IProduct[] = [{ id: 26395 }];
      commandes.products = products;

      const productCollection: IProduct[] = [{ id: 18079 }];
      jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
      const additionalProducts = [...products];
      const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
      jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ commandes });
      comp.ngOnInit();

      expect(productService.query).toHaveBeenCalled();
      expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(
        productCollection,
        ...additionalProducts.map(expect.objectContaining),
      );
      expect(comp.productsSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Formula query and add missing value', () => {
      const commandes: ICommandes = { id: 456 };
      const formulas: IFormula[] = [{ id: 11459 }];
      commandes.formulas = formulas;

      const formulaCollection: IFormula[] = [{ id: 2896 }];
      jest.spyOn(formulaService, 'query').mockReturnValue(of(new HttpResponse({ body: formulaCollection })));
      const additionalFormulas = [...formulas];
      const expectedCollection: IFormula[] = [...additionalFormulas, ...formulaCollection];
      jest.spyOn(formulaService, 'addFormulaToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ commandes });
      comp.ngOnInit();

      expect(formulaService.query).toHaveBeenCalled();
      expect(formulaService.addFormulaToCollectionIfMissing).toHaveBeenCalledWith(
        formulaCollection,
        ...additionalFormulas.map(expect.objectContaining),
      );
      expect(comp.formulasSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const commandes: ICommandes = { id: 456 };
      const user: IClient = { id: 3813 };
      commandes.user = user;
      const products: IProduct = { id: 2829 };
      commandes.products = [products];
      const formulas: IFormula = { id: 23154 };
      commandes.formulas = [formulas];

      activatedRoute.data = of({ commandes });
      comp.ngOnInit();

      expect(comp.clientsSharedCollection).toContain(user);
      expect(comp.productsSharedCollection).toContain(products);
      expect(comp.formulasSharedCollection).toContain(formulas);
      expect(comp.commandes).toEqual(commandes);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandes>>();
      const commandes = { id: 123 };
      jest.spyOn(commandesFormService, 'getCommandes').mockReturnValue(commandes);
      jest.spyOn(commandesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: commandes }));
      saveSubject.complete();

      // THEN
      expect(commandesFormService.getCommandes).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(commandesService.update).toHaveBeenCalledWith(expect.objectContaining(commandes));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandes>>();
      const commandes = { id: 123 };
      jest.spyOn(commandesFormService, 'getCommandes').mockReturnValue({ id: null });
      jest.spyOn(commandesService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandes: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: commandes }));
      saveSubject.complete();

      // THEN
      expect(commandesFormService.getCommandes).toHaveBeenCalled();
      expect(commandesService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandes>>();
      const commandes = { id: 123 };
      jest.spyOn(commandesService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandes });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(commandesService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareClient', () => {
      it('Should forward to clientService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(clientService, 'compareClient');
        comp.compareClient(entity, entity2);
        expect(clientService.compareClient).toHaveBeenCalledWith(entity, entity2);
      });
    });

    describe('compareProduct', () => {
      it('Should forward to productService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(productService, 'compareProduct');
        comp.compareProduct(entity, entity2);
        expect(productService.compareProduct).toHaveBeenCalledWith(entity, entity2);
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
