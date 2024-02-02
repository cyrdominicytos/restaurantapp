import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommandesProductItemDetailComponent } from './commandes-product-item-detail.component';

describe('CommandesProductItem Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesProductItemDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CommandesProductItemDetailComponent,
              resolve: { commandesProductItem: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CommandesProductItemDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load commandesProductItem on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CommandesProductItemDetailComponent);

      // THEN
      expect(instance.commandesProductItem).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
