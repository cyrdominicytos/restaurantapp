import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../formula.test-samples';

import { FormulaFormService } from './formula-form.service';

describe('Formula Form Service', () => {
  let service: FormulaFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormulaFormService);
  });

  describe('Service methods', () => {
    describe('createFormulaFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createFormulaFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            price: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
            imageType: expect.any(Object),
            description: expect.any(Object),
            createdDate: expect.any(Object),
            updatedDate: expect.any(Object),
          }),
        );
      });

      it('passing IFormula should create a new form with FormGroup', () => {
        const formGroup = service.createFormulaFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            price: expect.any(Object),
            name: expect.any(Object),
            photo: expect.any(Object),
            imageType: expect.any(Object),
            description: expect.any(Object),
            createdDate: expect.any(Object),
            updatedDate: expect.any(Object),
          }),
        );
      });
    });

    describe('getFormula', () => {
      it('should return NewFormula for default Formula initial value', () => {
        const formGroup = service.createFormulaFormGroup(sampleWithNewData);

        const formula = service.getFormula(formGroup) as any;

        expect(formula).toMatchObject(sampleWithNewData);
      });

      it('should return NewFormula for empty Formula initial value', () => {
        const formGroup = service.createFormulaFormGroup();

        const formula = service.getFormula(formGroup) as any;

        expect(formula).toMatchObject({});
      });

      it('should return IFormula', () => {
        const formGroup = service.createFormulaFormGroup(sampleWithRequiredData);

        const formula = service.getFormula(formGroup) as any;

        expect(formula).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IFormula should not enable id FormControl', () => {
        const formGroup = service.createFormulaFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewFormula should disable id FormControl', () => {
        const formGroup = service.createFormulaFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
