import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICommandesProductItem } from '../commandes-product-item.model';
import {
  sampleWithRequiredData,
  sampleWithNewData,
  sampleWithPartialData,
  sampleWithFullData,
} from '../commandes-product-item.test-samples';

import { CommandesProductItemService } from './commandes-product-item.service';

const requireRestSample: ICommandesProductItem = {
  ...sampleWithRequiredData,
};

describe('CommandesProductItem Service', () => {
  let service: CommandesProductItemService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommandesProductItem | ICommandesProductItem[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CommandesProductItemService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should create a CommandesProductItem', () => {
      const commandesProductItem = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(commandesProductItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a CommandesProductItem', () => {
      const commandesProductItem = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(commandesProductItem).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a CommandesProductItem', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of CommandesProductItem', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a CommandesProductItem', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommandesProductItemToCollectionIfMissing', () => {
      it('should add a CommandesProductItem to an empty array', () => {
        const commandesProductItem: ICommandesProductItem = sampleWithRequiredData;
        expectedResult = service.addCommandesProductItemToCollectionIfMissing([], commandesProductItem);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(commandesProductItem);
      });

      it('should not add a CommandesProductItem to an array that contains it', () => {
        const commandesProductItem: ICommandesProductItem = sampleWithRequiredData;
        const commandesProductItemCollection: ICommandesProductItem[] = [
          {
            ...commandesProductItem,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommandesProductItemToCollectionIfMissing(commandesProductItemCollection, commandesProductItem);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a CommandesProductItem to an array that doesn't contain it", () => {
        const commandesProductItem: ICommandesProductItem = sampleWithRequiredData;
        const commandesProductItemCollection: ICommandesProductItem[] = [sampleWithPartialData];
        expectedResult = service.addCommandesProductItemToCollectionIfMissing(commandesProductItemCollection, commandesProductItem);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(commandesProductItem);
      });

      it('should add only unique CommandesProductItem to an array', () => {
        const commandesProductItemArray: ICommandesProductItem[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const commandesProductItemCollection: ICommandesProductItem[] = [sampleWithRequiredData];
        expectedResult = service.addCommandesProductItemToCollectionIfMissing(commandesProductItemCollection, ...commandesProductItemArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const commandesProductItem: ICommandesProductItem = sampleWithRequiredData;
        const commandesProductItem2: ICommandesProductItem = sampleWithPartialData;
        expectedResult = service.addCommandesProductItemToCollectionIfMissing([], commandesProductItem, commandesProductItem2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(commandesProductItem);
        expect(expectedResult).toContain(commandesProductItem2);
      });

      it('should accept null and undefined values', () => {
        const commandesProductItem: ICommandesProductItem = sampleWithRequiredData;
        expectedResult = service.addCommandesProductItemToCollectionIfMissing([], null, commandesProductItem, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(commandesProductItem);
      });

      it('should return initial array if no CommandesProductItem is added', () => {
        const commandesProductItemCollection: ICommandesProductItem[] = [sampleWithRequiredData];
        expectedResult = service.addCommandesProductItemToCollectionIfMissing(commandesProductItemCollection, undefined, null);
        expect(expectedResult).toEqual(commandesProductItemCollection);
      });
    });

    describe('compareCommandesProductItem', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommandesProductItem(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommandesProductItem(entity1, entity2);
        const compareResult2 = service.compareCommandesProductItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommandesProductItem(entity1, entity2);
        const compareResult2 = service.compareCommandesProductItem(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommandesProductItem(entity1, entity2);
        const compareResult2 = service.compareCommandesProductItem(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
