package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Commandes;
import com.mycompany.myapp.repository.CommandesRepository;
import com.mycompany.myapp.service.CommandesService;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CommandesResource} REST controller.
 */
@IntegrationTest
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc
@WithMockUser
class CommandesResourceIT {

    private static final Double DEFAULT_AMOUNT = 1D;
    private static final Double UPDATED_AMOUNT = 2D;

    private static final Instant DEFAULT_CREATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_CREATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_RECOVERY_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_RECOVERY_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_UPDATED_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_UPDATED_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String ENTITY_API_URL = "/api/commandes";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommandesRepository commandesRepository;

    @Mock
    private CommandesRepository commandesRepositoryMock;

    @Mock
    private CommandesService commandesServiceMock;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommandesMockMvc;

    private Commandes commandes;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commandes createEntity(EntityManager em) {
        Commandes commandes = new Commandes()
            .amount(DEFAULT_AMOUNT)
            .createdDate(DEFAULT_CREATED_DATE)
            .recoveryDate(DEFAULT_RECOVERY_DATE)
            .updatedDate(DEFAULT_UPDATED_DATE);
        return commandes;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Commandes createUpdatedEntity(EntityManager em) {
        Commandes commandes = new Commandes()
            .amount(UPDATED_AMOUNT)
            .createdDate(UPDATED_CREATED_DATE)
            .recoveryDate(UPDATED_RECOVERY_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);
        return commandes;
    }

    @BeforeEach
    public void initTest() {
        commandes = createEntity(em);
    }

    @Test
    @Transactional
    void createCommandes() throws Exception {
        int databaseSizeBeforeCreate = commandesRepository.findAll().size();
        // Create the Commandes
        restCommandesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isCreated());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeCreate + 1);
        Commandes testCommandes = commandesList.get(commandesList.size() - 1);
        assertThat(testCommandes.getAmount()).isEqualTo(DEFAULT_AMOUNT);
        assertThat(testCommandes.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCommandes.getRecoveryDate()).isEqualTo(DEFAULT_RECOVERY_DATE);
        assertThat(testCommandes.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    void createCommandesWithExistingId() throws Exception {
        // Create the Commandes with an existing ID
        commandes.setId(1L);

        int databaseSizeBeforeCreate = commandesRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkAmountIsRequired() throws Exception {
        int databaseSizeBeforeTest = commandesRepository.findAll().size();
        // set the field null
        commandes.setAmount(null);

        // Create the Commandes, which fails.

        restCommandesMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isBadRequest());

        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        // Get all the commandesList
        restCommandesMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandes.getId().intValue())))
            .andExpect(jsonPath("$.[*].amount").value(hasItem(DEFAULT_AMOUNT.doubleValue())))
            .andExpect(jsonPath("$.[*].createdDate").value(hasItem(DEFAULT_CREATED_DATE.toString())))
            .andExpect(jsonPath("$.[*].recoveryDate").value(hasItem(DEFAULT_RECOVERY_DATE.toString())))
            .andExpect(jsonPath("$.[*].updatedDate").value(hasItem(DEFAULT_UPDATED_DATE.toString())));
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCommandesWithEagerRelationshipsIsEnabled() throws Exception {
        when(commandesServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCommandesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=true")).andExpect(status().isOk());

        verify(commandesServiceMock, times(1)).findAllWithEagerRelationships(any());
    }

    @SuppressWarnings({ "unchecked" })
    void getAllCommandesWithEagerRelationshipsIsNotEnabled() throws Exception {
        when(commandesServiceMock.findAllWithEagerRelationships(any())).thenReturn(new PageImpl(new ArrayList<>()));

        restCommandesMockMvc.perform(get(ENTITY_API_URL + "?eagerload=false")).andExpect(status().isOk());
        verify(commandesRepositoryMock, times(1)).findAll(any(Pageable.class));
    }

    @Test
    @Transactional
    void getCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        // Get the commandes
        restCommandesMockMvc
            .perform(get(ENTITY_API_URL_ID, commandes.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commandes.getId().intValue()))
            .andExpect(jsonPath("$.amount").value(DEFAULT_AMOUNT.doubleValue()))
            .andExpect(jsonPath("$.createdDate").value(DEFAULT_CREATED_DATE.toString()))
            .andExpect(jsonPath("$.recoveryDate").value(DEFAULT_RECOVERY_DATE.toString()))
            .andExpect(jsonPath("$.updatedDate").value(DEFAULT_UPDATED_DATE.toString()));
    }

    @Test
    @Transactional
    void getNonExistingCommandes() throws Exception {
        // Get the commandes
        restCommandesMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();

        // Update the commandes
        Commandes updatedCommandes = commandesRepository.findById(commandes.getId()).get();
        // Disconnect from session so that the updates on updatedCommandes are not directly saved in db
        em.detach(updatedCommandes);
        updatedCommandes
            .amount(UPDATED_AMOUNT)
            .createdDate(UPDATED_CREATED_DATE)
            .recoveryDate(UPDATED_RECOVERY_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restCommandesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommandes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCommandes))
            )
            .andExpect(status().isOk());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
        Commandes testCommandes = commandesList.get(commandesList.size() - 1);
        assertThat(testCommandes.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCommandes.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCommandes.getRecoveryDate()).isEqualTo(UPDATED_RECOVERY_DATE);
        assertThat(testCommandes.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    void putNonExistingCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();
        commandes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commandes.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();
        commandes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();
        commandes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandes)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommandesWithPatch() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();

        // Update the commandes using partial update
        Commandes partialUpdatedCommandes = new Commandes();
        partialUpdatedCommandes.setId(commandes.getId());

        partialUpdatedCommandes.amount(UPDATED_AMOUNT);

        restCommandesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandes))
            )
            .andExpect(status().isOk());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
        Commandes testCommandes = commandesList.get(commandesList.size() - 1);
        assertThat(testCommandes.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCommandes.getCreatedDate()).isEqualTo(DEFAULT_CREATED_DATE);
        assertThat(testCommandes.getRecoveryDate()).isEqualTo(DEFAULT_RECOVERY_DATE);
        assertThat(testCommandes.getUpdatedDate()).isEqualTo(DEFAULT_UPDATED_DATE);
    }

    @Test
    @Transactional
    void fullUpdateCommandesWithPatch() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();

        // Update the commandes using partial update
        Commandes partialUpdatedCommandes = new Commandes();
        partialUpdatedCommandes.setId(commandes.getId());

        partialUpdatedCommandes
            .amount(UPDATED_AMOUNT)
            .createdDate(UPDATED_CREATED_DATE)
            .recoveryDate(UPDATED_RECOVERY_DATE)
            .updatedDate(UPDATED_UPDATED_DATE);

        restCommandesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandes))
            )
            .andExpect(status().isOk());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
        Commandes testCommandes = commandesList.get(commandesList.size() - 1);
        assertThat(testCommandes.getAmount()).isEqualTo(UPDATED_AMOUNT);
        assertThat(testCommandes.getCreatedDate()).isEqualTo(UPDATED_CREATED_DATE);
        assertThat(testCommandes.getRecoveryDate()).isEqualTo(UPDATED_RECOVERY_DATE);
        assertThat(testCommandes.getUpdatedDate()).isEqualTo(UPDATED_UPDATED_DATE);
    }

    @Test
    @Transactional
    void patchNonExistingCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();
        commandes.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commandes.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();
        commandes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandes))
            )
            .andExpect(status().isBadRequest());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommandes() throws Exception {
        int databaseSizeBeforeUpdate = commandesRepository.findAll().size();
        commandes.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesMockMvc
            .perform(
                patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(commandes))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the Commandes in the database
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommandes() throws Exception {
        // Initialize the database
        commandesRepository.saveAndFlush(commandes);

        int databaseSizeBeforeDelete = commandesRepository.findAll().size();

        // Delete the commandes
        restCommandesMockMvc
            .perform(delete(ENTITY_API_URL_ID, commandes.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Commandes> commandesList = commandesRepository.findAll();
        assertThat(commandesList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
