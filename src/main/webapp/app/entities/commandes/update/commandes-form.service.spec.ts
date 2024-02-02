import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../commandes.test-samples';

import { CommandesFormService } from './commandes-form.service';

describe('Commandes Form Service', () => {
  let service: CommandesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandesFormService);
  });

  describe('Service methods', () => {
    describe('createCommandesFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommandesFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amount: expect.any(Object),
            createdDate: expect.any(Object),
            recoveryDate: expect.any(Object),
            updatedDate: expect.any(Object),
            user: expect.any(Object),
            products: expect.any(Object),
            formulas: expect.any(Object),
          }),
        );
      });

      it('passing ICommandes should create a new form with FormGroup', () => {
        const formGroup = service.createCommandesFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            amount: expect.any(Object),
            createdDate: expect.any(Object),
            recoveryDate: expect.any(Object),
            updatedDate: expect.any(Object),
            user: expect.any(Object),
            products: expect.any(Object),
            formulas: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommandes', () => {
      it('should return NewCommandes for default Commandes initial value', () => {
        const formGroup = service.createCommandesFormGroup(sampleWithNewData);

        const commandes = service.getCommandes(formGroup) as any;

        expect(commandes).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommandes for empty Commandes initial value', () => {
        const formGroup = service.createCommandesFormGroup();

        const commandes = service.getCommandes(formGroup) as any;

        expect(commandes).toMatchObject({});
      });

      it('should return ICommandes', () => {
        const formGroup = service.createCommandesFormGroup(sampleWithRequiredData);

        const commandes = service.getCommandes(formGroup) as any;

        expect(commandes).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommandes should not enable id FormControl', () => {
        const formGroup = service.createCommandesFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommandes should disable id FormControl', () => {
        const formGroup = service.createCommandesFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
