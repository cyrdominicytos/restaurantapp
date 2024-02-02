import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ICommandes } from '../commandes.model';
import { sampleWithRequiredData, sampleWithNewData, sampleWithPartialData, sampleWithFullData } from '../commandes.test-samples';

import { CommandesService, RestCommandes } from './commandes.service';

const requireRestSample: RestCommandes = {
  ...sampleWithRequiredData,
  createdDate: sampleWithRequiredData.createdDate?.toJSON(),
  recoveryDate: sampleWithRequiredData.recoveryDate?.toJSON(),
  updatedDate: sampleWithRequiredData.updatedDate?.toJSON(),
};

describe('Commandes Service', () => {
  let service: CommandesService;
  let httpMock: HttpTestingController;
  let expectedResult: ICommandes | ICommandes[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(CommandesService);
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

    it('should create a Commandes', () => {
      const commandes = { ...sampleWithNewData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.create(commandes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Commandes', () => {
      const commandes = { ...sampleWithRequiredData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.update(commandes).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Commandes', () => {
      const patchObject = { ...sampleWithPartialData };
      const returnedFromService = { ...requireRestSample };
      const expected = { ...sampleWithRequiredData };

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Commandes', () => {
      const returnedFromService = { ...requireRestSample };

      const expected = { ...sampleWithRequiredData };

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toMatchObject([expected]);
    });

    it('should delete a Commandes', () => {
      const expected = true;

      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult).toBe(expected);
    });

    describe('addCommandesToCollectionIfMissing', () => {
      it('should add a Commandes to an empty array', () => {
        const commandes: ICommandes = sampleWithRequiredData;
        expectedResult = service.addCommandesToCollectionIfMissing([], commandes);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(commandes);
      });

      it('should not add a Commandes to an array that contains it', () => {
        const commandes: ICommandes = sampleWithRequiredData;
        const commandesCollection: ICommandes[] = [
          {
            ...commandes,
          },
          sampleWithPartialData,
        ];
        expectedResult = service.addCommandesToCollectionIfMissing(commandesCollection, commandes);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Commandes to an array that doesn't contain it", () => {
        const commandes: ICommandes = sampleWithRequiredData;
        const commandesCollection: ICommandes[] = [sampleWithPartialData];
        expectedResult = service.addCommandesToCollectionIfMissing(commandesCollection, commandes);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(commandes);
      });

      it('should add only unique Commandes to an array', () => {
        const commandesArray: ICommandes[] = [sampleWithRequiredData, sampleWithPartialData, sampleWithFullData];
        const commandesCollection: ICommandes[] = [sampleWithRequiredData];
        expectedResult = service.addCommandesToCollectionIfMissing(commandesCollection, ...commandesArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const commandes: ICommandes = sampleWithRequiredData;
        const commandes2: ICommandes = sampleWithPartialData;
        expectedResult = service.addCommandesToCollectionIfMissing([], commandes, commandes2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(commandes);
        expect(expectedResult).toContain(commandes2);
      });

      it('should accept null and undefined values', () => {
        const commandes: ICommandes = sampleWithRequiredData;
        expectedResult = service.addCommandesToCollectionIfMissing([], null, commandes, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(commandes);
      });

      it('should return initial array if no Commandes is added', () => {
        const commandesCollection: ICommandes[] = [sampleWithRequiredData];
        expectedResult = service.addCommandesToCollectionIfMissing(commandesCollection, undefined, null);
        expect(expectedResult).toEqual(commandesCollection);
      });
    });

    describe('compareCommandes', () => {
      it('Should return true if both entities are null', () => {
        const entity1 = null;
        const entity2 = null;

        const compareResult = service.compareCommandes(entity1, entity2);

        expect(compareResult).toEqual(true);
      });

      it('Should return false if one entity is null', () => {
        const entity1 = { id: 123 };
        const entity2 = null;

        const compareResult1 = service.compareCommandes(entity1, entity2);
        const compareResult2 = service.compareCommandes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey differs', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 456 };

        const compareResult1 = service.compareCommandes(entity1, entity2);
        const compareResult2 = service.compareCommandes(entity2, entity1);

        expect(compareResult1).toEqual(false);
        expect(compareResult2).toEqual(false);
      });

      it('Should return false if primaryKey matches', () => {
        const entity1 = { id: 123 };
        const entity2 = { id: 123 };

        const compareResult1 = service.compareCommandes(entity1, entity2);
        const compareResult2 = service.compareCommandes(entity2, entity1);

        expect(compareResult1).toEqual(true);
        expect(compareResult2).toEqual(true);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
