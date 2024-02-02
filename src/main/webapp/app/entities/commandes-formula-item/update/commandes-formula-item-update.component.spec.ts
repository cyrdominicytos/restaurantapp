import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { ICommandes } from 'app/entities/commandes/commandes.model';
import { CommandesService } from 'app/entities/commandes/service/commandes.service';
import { CommandesFormulaItemService } from '../service/commandes-formula-item.service';
import { ICommandesFormulaItem } from '../commandes-formula-item.model';
import { CommandesFormulaItemFormService } from './commandes-formula-item-form.service';

import { CommandesFormulaItemUpdateComponent } from './commandes-formula-item-update.component';

describe('CommandesFormulaItem Management Update Component', () => {
  let comp: CommandesFormulaItemUpdateComponent;
  let fixture: ComponentFixture<CommandesFormulaItemUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let commandesFormulaItemFormService: CommandesFormulaItemFormService;
  let commandesFormulaItemService: CommandesFormulaItemService;
  let commandesService: CommandesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([]), CommandesFormulaItemUpdateComponent],
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
      .overrideTemplate(CommandesFormulaItemUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(CommandesFormulaItemUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    commandesFormulaItemFormService = TestBed.inject(CommandesFormulaItemFormService);
    commandesFormulaItemService = TestBed.inject(CommandesFormulaItemService);
    commandesService = TestBed.inject(CommandesService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Commandes query and add missing value', () => {
      const commandesFormulaItem: ICommandesFormulaItem = { id: 456 };
      const commandes: ICommandes = { id: 7030 };
      commandesFormulaItem.commandes = commandes;

      const commandesCollection: ICommandes[] = [{ id: 8686 }];
      jest.spyOn(commandesService, 'query').mockReturnValue(of(new HttpResponse({ body: commandesCollection })));
      const additionalCommandes = [commandes];
      const expectedCollection: ICommandes[] = [...additionalCommandes, ...commandesCollection];
      jest.spyOn(commandesService, 'addCommandesToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ commandesFormulaItem });
      comp.ngOnInit();

      expect(commandesService.query).toHaveBeenCalled();
      expect(commandesService.addCommandesToCollectionIfMissing).toHaveBeenCalledWith(
        commandesCollection,
        ...additionalCommandes.map(expect.objectContaining),
      );
      expect(comp.commandesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const commandesFormulaItem: ICommandesFormulaItem = { id: 456 };
      const commandes: ICommandes = { id: 6248 };
      commandesFormulaItem.commandes = commandes;

      activatedRoute.data = of({ commandesFormulaItem });
      comp.ngOnInit();

      expect(comp.commandesSharedCollection).toContain(commandes);
      expect(comp.commandesFormulaItem).toEqual(commandesFormulaItem);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandesFormulaItem>>();
      const commandesFormulaItem = { id: 123 };
      jest.spyOn(commandesFormulaItemFormService, 'getCommandesFormulaItem').mockReturnValue(commandesFormulaItem);
      jest.spyOn(commandesFormulaItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandesFormulaItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: commandesFormulaItem }));
      saveSubject.complete();

      // THEN
      expect(commandesFormulaItemFormService.getCommandesFormulaItem).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(commandesFormulaItemService.update).toHaveBeenCalledWith(expect.objectContaining(commandesFormulaItem));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandesFormulaItem>>();
      const commandesFormulaItem = { id: 123 };
      jest.spyOn(commandesFormulaItemFormService, 'getCommandesFormulaItem').mockReturnValue({ id: null });
      jest.spyOn(commandesFormulaItemService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandesFormulaItem: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: commandesFormulaItem }));
      saveSubject.complete();

      // THEN
      expect(commandesFormulaItemFormService.getCommandesFormulaItem).toHaveBeenCalled();
      expect(commandesFormulaItemService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ICommandesFormulaItem>>();
      const commandesFormulaItem = { id: 123 };
      jest.spyOn(commandesFormulaItemService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ commandesFormulaItem });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(commandesFormulaItemService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
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
