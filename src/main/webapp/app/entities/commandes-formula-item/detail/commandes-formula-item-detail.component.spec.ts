import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommandesFormulaItemDetailComponent } from './commandes-formula-item-detail.component';

describe('CommandesFormulaItem Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesFormulaItemDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CommandesFormulaItemDetailComponent,
              resolve: { commandesFormulaItem: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CommandesFormulaItemDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load commandesFormulaItem on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CommandesFormulaItemDetailComponent);

      // THEN
      expect(instance.commandesFormulaItem).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
