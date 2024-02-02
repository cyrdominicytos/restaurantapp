import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness, RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

import { CommandesDetailComponent } from './commandes-detail.component';

describe('Commandes Management Detail Component', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandesDetailComponent, RouterTestingModule.withRoutes([], { bindToComponentInputs: true })],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              component: CommandesDetailComponent,
              resolve: { commandes: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CommandesDetailComponent, '')
      .compileComponents();
  });

  describe('OnInit', () => {
    it('Should load commandes on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CommandesDetailComponent);

      // THEN
      expect(instance.commandes).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
