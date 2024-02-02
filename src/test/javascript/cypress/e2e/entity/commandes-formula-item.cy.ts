import {
  entityTableSelector,
  entityDetailsButtonSelector,
  entityDetailsBackButtonSelector,
  entityCreateButtonSelector,
  entityCreateSaveButtonSelector,
  entityCreateCancelButtonSelector,
  entityEditButtonSelector,
  entityDeleteButtonSelector,
  entityConfirmDeleteButtonSelector,
} from '../../support/entity';

describe('CommandesFormulaItem e2e test', () => {
  const commandesFormulaItemPageUrl = '/commandes-formula-item';
  const commandesFormulaItemPageUrlPattern = new RegExp('/commandes-formula-item(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const commandesFormulaItemSample = {};

  let commandesFormulaItem;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/commandes-formula-items+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/commandes-formula-items').as('postEntityRequest');
    cy.intercept('DELETE', '/api/commandes-formula-items/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (commandesFormulaItem) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/commandes-formula-items/${commandesFormulaItem.id}`,
      }).then(() => {
        commandesFormulaItem = undefined;
      });
    }
  });

  it('CommandesFormulaItems menu should load CommandesFormulaItems page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('commandes-formula-item');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CommandesFormulaItem').should('exist');
    cy.url().should('match', commandesFormulaItemPageUrlPattern);
  });

  describe('CommandesFormulaItem page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commandesFormulaItemPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CommandesFormulaItem page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/commandes-formula-item/new$'));
        cy.getEntityCreateUpdateHeading('CommandesFormulaItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesFormulaItemPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/commandes-formula-items',
          body: commandesFormulaItemSample,
        }).then(({ body }) => {
          commandesFormulaItem = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/commandes-formula-items+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/commandes-formula-items?page=0&size=20>; rel="last",<http://localhost/api/commandes-formula-items?page=0&size=20>; rel="first"',
              },
              body: [commandesFormulaItem],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(commandesFormulaItemPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details CommandesFormulaItem page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('commandesFormulaItem');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesFormulaItemPageUrlPattern);
      });

      it('edit button click should load edit CommandesFormulaItem page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommandesFormulaItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesFormulaItemPageUrlPattern);
      });

      it('edit button click should load edit CommandesFormulaItem page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommandesFormulaItem');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesFormulaItemPageUrlPattern);
      });

      it('last delete button click should delete instance of CommandesFormulaItem', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('commandesFormulaItem').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesFormulaItemPageUrlPattern);

        commandesFormulaItem = undefined;
      });
    });
  });

  describe('new CommandesFormulaItem page', () => {
    beforeEach(() => {
      cy.visit(`${commandesFormulaItemPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CommandesFormulaItem');
    });

    it('should create an instance of CommandesFormulaItem', () => {
      cy.get(`[data-cy="quantity"]`).type('10499');
      cy.get(`[data-cy="quantity"]`).should('have.value', '10499');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        commandesFormulaItem = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', commandesFormulaItemPageUrlPattern);
    });
  });
});
