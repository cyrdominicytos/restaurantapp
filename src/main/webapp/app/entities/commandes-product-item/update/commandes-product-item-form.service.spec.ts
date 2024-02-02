import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../commandes-product-item.test-samples';

import { CommandesProductItemFormService } from './commandes-product-item-form.service';

describe('CommandesProductItem Form Service', () => {
  let service: CommandesProductItemFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandesProductItemFormService);
  });

  describe('Service methods', () => {
    describe('createCommandesProductItemFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCommandesProductItemFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            product: expect.any(Object),
            commandes: expect.any(Object),
          }),
        );
      });

      it('passing ICommandesProductItem should create a new form with FormGroup', () => {
        const formGroup = service.createCommandesProductItemFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            quantity: expect.any(Object),
            product: expect.any(Object),
            commandes: expect.any(Object),
          }),
        );
      });
    });

    describe('getCommandesProductItem', () => {
      it('should return NewCommandesProductItem for default CommandesProductItem initial value', () => {
        const formGroup = service.createCommandesProductItemFormGroup(sampleWithNewData);

        const commandesProductItem = service.getCommandesProductItem(formGroup) as any;

        expect(commandesProductItem).toMatchObject(sampleWithNewData);
      });

      it('should return NewCommandesProductItem for empty CommandesProductItem initial value', () => {
        const formGroup = service.createCommandesProductItemFormGroup();

        const commandesProductItem = service.getCommandesProductItem(formGroup) as any;

        expect(commandesProductItem).toMatchObject({});
      });

      it('should return ICommandesProductItem', () => {
        const formGroup = service.createCommandesProductItemFormGroup(sampleWithRequiredData);

        const commandesProductItem = service.getCommandesProductItem(formGroup) as any;

        expect(commandesProductItem).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICommandesProductItem should not enable id FormControl', () => {
        const formGroup = service.createCommandesProductItemFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCommandesProductItem should disable id FormControl', () => {
        const formGroup = service.createCommandesProductItemFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
