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

describe('CommandesProductItem e2e test', () => {
  const commandesProductItemPageUrl = '/commandes-product-item';
  const commandesProductItemPageUrlPattern = new RegExp('/commandes-product-item(\\?.*)?$');
  const username = Cypress.env('E2E_USERNAME') ?? 'user';
  const password = Cypress.env('E2E_PASSWORD') ?? 'user';
  const commandesProductItemSample = {};

  let commandesProductItem;

  beforeEach(() => {
    cy.login(username, password);
  });

  beforeEach(() => {
    cy.intercept('GET', '/api/commandes-product-items+(?*|)').as('entitiesRequest');
    cy.intercept('POST', '/api/commandes-product-items').as('postEntityRequest');
    cy.intercept('DELETE', '/api/commandes-product-items/*').as('deleteEntityRequest');
  });

  afterEach(() => {
    if (commandesProductItem) {
      cy.authenticatedRequest({
        method: 'DELETE',
        url: `/api/commandes-product-items/${commandesProductItem.id}`,
      }).then(() => {
        commandesProductItem = undefined;
      });
    }
  });

  it('CommandesProductItems menu should load CommandesProductItems page', () => {
    cy.visit('/');
    cy.clickOnEntityMenuItem('commandes-product-item');
    cy.wait('@entitiesRequest').then(({ response }) => {
      if (response.body.length === 0) {
        cy.get(entityTableSelector).should('not.exist');
      } else {
        cy.get(entityTableSelector).should('exist');
      }
    });
    cy.getEntityHeading('CommandesProductItem').should('exist');
    cy.url().should('match', commandesProductItemPageUrlPattern);
  });

  describe('CommandesProductItem page', () => {
    describe('create button click', () => {
      beforeEach(() => {
        cy.visit(commandesProductItemPageUrl);
        cy.wait('@entitiesRequest');
      });

      it('should load create CommandesProductItem page', () => {
        cy.get(entityCreateButtonSelector).click();
        cy.url().should('match', new RegExp('/commandes-product-item/new$'));
        cy.getEntityCreateUpdateHeading('CommandesProductItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesProductItemPageUrlPattern);
      });
    });

    describe('with existing value', () => {
      beforeEach(() => {
        cy.authenticatedRequest({
          method: 'POST',
          url: '/api/commandes-product-items',
          body: commandesProductItemSample,
        }).then(({ body }) => {
          commandesProductItem = body;

          cy.intercept(
            {
              method: 'GET',
              url: '/api/commandes-product-items+(?*|)',
              times: 1,
            },
            {
              statusCode: 200,
              headers: {
                link: '<http://localhost/api/commandes-product-items?page=0&size=20>; rel="last",<http://localhost/api/commandes-product-items?page=0&size=20>; rel="first"',
              },
              body: [commandesProductItem],
            },
          ).as('entitiesRequestInternal');
        });

        cy.visit(commandesProductItemPageUrl);

        cy.wait('@entitiesRequestInternal');
      });

      it('detail button click should load details CommandesProductItem page', () => {
        cy.get(entityDetailsButtonSelector).first().click();
        cy.getEntityDetailsHeading('commandesProductItem');
        cy.get(entityDetailsBackButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesProductItemPageUrlPattern);
      });

      it('edit button click should load edit CommandesProductItem page and go back', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommandesProductItem');
        cy.get(entityCreateSaveButtonSelector).should('exist');
        cy.get(entityCreateCancelButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesProductItemPageUrlPattern);
      });

      it('edit button click should load edit CommandesProductItem page and save', () => {
        cy.get(entityEditButtonSelector).first().click();
        cy.getEntityCreateUpdateHeading('CommandesProductItem');
        cy.get(entityCreateSaveButtonSelector).click();
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesProductItemPageUrlPattern);
      });

      it('last delete button click should delete instance of CommandesProductItem', () => {
        cy.get(entityDeleteButtonSelector).last().click();
        cy.getEntityDeleteDialogHeading('commandesProductItem').should('exist');
        cy.get(entityConfirmDeleteButtonSelector).click();
        cy.wait('@deleteEntityRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(204);
        });
        cy.wait('@entitiesRequest').then(({ response }) => {
          expect(response.statusCode).to.equal(200);
        });
        cy.url().should('match', commandesProductItemPageUrlPattern);

        commandesProductItem = undefined;
      });
    });
  });

  describe('new CommandesProductItem page', () => {
    beforeEach(() => {
      cy.visit(`${commandesProductItemPageUrl}`);
      cy.get(entityCreateButtonSelector).click();
      cy.getEntityCreateUpdateHeading('CommandesProductItem');
    });

    it('should create an instance of CommandesProductItem', () => {
      cy.get(`[data-cy="quantity"]`).type('9448');
      cy.get(`[data-cy="quantity"]`).should('have.value', '9448');

      cy.get(entityCreateSaveButtonSelector).click();

      cy.wait('@postEntityRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(201);
        commandesProductItem = response.body;
      });
      cy.wait('@entitiesRequest').then(({ response }) => {
        expect(response.statusCode).to.equal(200);
      });
      cy.url().should('match', commandesProductItemPageUrlPattern);
    });
  });
});
