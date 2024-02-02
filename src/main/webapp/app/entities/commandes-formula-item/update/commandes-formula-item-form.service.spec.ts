import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../commandes-formula-item.test-samples';

import { CommandesFormulaItemFormService } from './commandes-formula-item-form.service';

describe('CommandesFormulaItem Form Service', () => {
  let service: CommandesFormulaItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandesFormulaItemFormService);
  });

  describe('Service methods', () => {
    describe('createCommandesFormulaItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            commandes: expect.any(Object),
          }),
        );
      });

      it('passing ICommandesFormulaItem should create a new form with FormGroup', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            commandes: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommandesFormulaItem', () => {
      it('should return NewCommandesFormulaItem for default CommandesFormulaItem initial value', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup(sampleWithNewData);

        const commandesFormulaItem = service.getCommandesFormulaItem(formGroup) as any;

        expect(commandesFormulaItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommandesFormulaItem for empty CommandesFormulaItem initial value', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup();

        const commandesFormulaItem = service.getCommandesFormulaItem(formGroup) as any;

        expect(commandesFormulaItem).toMatchObject({});
      });

      it('should return ICommandesFormulaItem', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup(sampleWithRequiredData);

        const commandesFormulaItem = service.getCommandesFormulaItem(formGroup) as any;

        expect(commandesFormulaItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommandesFormulaItem should not enable id FormControl', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommandesFormulaItem should disable id FormControl', () => {
        const formGroup = service.createCommandesFormulaItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
