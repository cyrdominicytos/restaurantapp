package fr.cyr.devs.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import fr.cyr.devs.IntegrationTest;
import fr.cyr.devs.domain.CommandesFormulaItem;
import fr.cyr.devs.repository.CommandesFormulaItemRepository;
import jakarta.persistence.EntityManager;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CommandesFormulaItemResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommandesFormulaItemResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final String ENTITY_API_URL = "/api/commandes-formula-items";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommandesFormulaItemRepository commandesFormulaItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommandesFormulaItemMockMvc;

    private CommandesFormulaItem commandesFormulaItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandesFormulaItem createEntity(EntityManager em) {
        CommandesFormulaItem commandesFormulaItem = new CommandesFormulaItem().quantity(DEFAULT_QUANTITY);
        return commandesFormulaItem;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandesFormulaItem createUpdatedEntity(EntityManager em) {
        CommandesFormulaItem commandesFormulaItem = new CommandesFormulaItem().quantity(UPDATED_QUANTITY);
        return commandesFormulaItem;
    }

    @BeforeEach
    public void initTest() {
        commandesFormulaItem = createEntity(em);
    }

    @Test
    @Transactional
    void createCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeCreate = commandesFormulaItemRepository.findAll().size();
        // Create the CommandesFormulaItem
        restCommandesFormulaItemMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isCreated());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeCreate + 1);
        CommandesFormulaItem testCommandesFormulaItem = commandesFormulaItemList.get(commandesFormulaItemList.size() - 1);
        assertThat(testCommandesFormulaItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    void createCommandesFormulaItemWithExistingId() throws Exception {
        // Create the CommandesFormulaItem with an existing ID
        commandesFormulaItem.setId(1L);

        int databaseSizeBeforeCreate = commandesFormulaItemRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandesFormulaItemMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommandesFormulaItems() throws Exception {
        // Initialize the database
        commandesFormulaItemRepository.saveAndFlush(commandesFormulaItem);

        // Get all the commandesFormulaItemList
        restCommandesFormulaItemMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandesFormulaItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    void getCommandesFormulaItem() throws Exception {
        // Initialize the database
        commandesFormulaItemRepository.saveAndFlush(commandesFormulaItem);

        // Get the commandesFormulaItem
        restCommandesFormulaItemMockMvc
            .perform(get(ENTITY_API_URL_ID, commandesFormulaItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commandesFormulaItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    void getNonExistingCommandesFormulaItem() throws Exception {
        // Get the commandesFormulaItem
        restCommandesFormulaItemMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommandesFormulaItem() throws Exception {
        // Initialize the database
        commandesFormulaItemRepository.saveAndFlush(commandesFormulaItem);

        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();

        // Update the commandesFormulaItem
        CommandesFormulaItem updatedCommandesFormulaItem = commandesFormulaItemRepository
            .findById(commandesFormulaItem.getId())
            .orElseThrow();
        // Disconnect from session so that the updates on updatedCommandesFormulaItem are not directly saved in db
        em.detach(updatedCommandesFormulaItem);
        updatedCommandesFormulaItem.quantity(UPDATED_QUANTITY);

        restCommandesFormulaItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommandesFormulaItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCommandesFormulaItem))
            )
            .andExpect(status().isOk());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
        CommandesFormulaItem testCommandesFormulaItem = commandesFormulaItemList.get(commandesFormulaItemList.size() - 1);
        assertThat(testCommandesFormulaItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void putNonExistingCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();
        commandesFormulaItem.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesFormulaItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commandesFormulaItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();
        commandesFormulaItem.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesFormulaItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();
        commandesFormulaItem.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesFormulaItemMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommandesFormulaItemWithPatch() throws Exception {
        // Initialize the database
        commandesFormulaItemRepository.saveAndFlush(commandesFormulaItem);

        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();

        // Update the commandesFormulaItem using partial update
        CommandesFormulaItem partialUpdatedCommandesFormulaItem = new CommandesFormulaItem();
        partialUpdatedCommandesFormulaItem.setId(commandesFormulaItem.getId());

        partialUpdatedCommandesFormulaItem.quantity(UPDATED_QUANTITY);

        restCommandesFormulaItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandesFormulaItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandesFormulaItem))
            )
            .andExpect(status().isOk());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
        CommandesFormulaItem testCommandesFormulaItem = commandesFormulaItemList.get(commandesFormulaItemList.size() - 1);
        assertThat(testCommandesFormulaItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void fullUpdateCommandesFormulaItemWithPatch() throws Exception {
        // Initialize the database
        commandesFormulaItemRepository.saveAndFlush(commandesFormulaItem);

        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();

        // Update the commandesFormulaItem using partial update
        CommandesFormulaItem partialUpdatedCommandesFormulaItem = new CommandesFormulaItem();
        partialUpdatedCommandesFormulaItem.setId(commandesFormulaItem.getId());

        partialUpdatedCommandesFormulaItem.quantity(UPDATED_QUANTITY);

        restCommandesFormulaItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandesFormulaItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandesFormulaItem))
            )
            .andExpect(status().isOk());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
        CommandesFormulaItem testCommandesFormulaItem = commandesFormulaItemList.get(commandesFormulaItemList.size() - 1);
        assertThat(testCommandesFormulaItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void patchNonExistingCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();
        commandesFormulaItem.setId(longCount.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesFormulaItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commandesFormulaItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();
        commandesFormulaItem.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesFormulaItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, longCount.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommandesFormulaItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesFormulaItemRepository.findAll().size();
        commandesFormulaItem.setId(longCount.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesFormulaItemMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandesFormulaItem))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommandesFormulaItem in the database
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommandesFormulaItem() throws Exception {
        // Initialize the database
        commandesFormulaItemRepository.saveAndFlush(commandesFormulaItem);

        int databaseSizeBeforeDelete = commandesFormulaItemRepository.findAll().size();

        // Delete the commandesFormulaItem
        restCommandesFormulaItemMockMvc
            .perform(delete(ENTITY_API_URL_ID, commandesFormulaItem.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CommandesFormulaItem> commandesFormulaItemList = commandesFormulaItemRepository.findAll();
        assertThat(commandesFormulaItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
