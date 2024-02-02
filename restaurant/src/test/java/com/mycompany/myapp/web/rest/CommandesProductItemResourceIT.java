package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.CommandesProductItem;
import com.mycompany.myapp.repository.CommandesProductItemRepository;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link CommandesProductItemResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class CommandesProductItemResourceIT {

    private static final Integer DEFAULT_QUANTITY = 1;
    private static final Integer UPDATED_QUANTITY = 2;

    private static final String ENTITY_API_URL = "/api/commandes-product-items";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private CommandesProductItemRepository commandesProductItemRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restCommandesProductItemMockMvc;

    private CommandesProductItem commandesProductItem;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandesProductItem createEntity(EntityManager em) {
        CommandesProductItem commandesProductItem = new CommandesProductItem().quantity(DEFAULT_QUANTITY);
        return commandesProductItem;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static CommandesProductItem createUpdatedEntity(EntityManager em) {
        CommandesProductItem commandesProductItem = new CommandesProductItem().quantity(UPDATED_QUANTITY);
        return commandesProductItem;
    }

    @BeforeEach
    public void initTest() {
        commandesProductItem = createEntity(em);
    }

    @Test
    @Transactional
    void createCommandesProductItem() throws Exception {
        int databaseSizeBeforeCreate = commandesProductItemRepository.findAll().size();
        // Create the CommandesProductItem
        restCommandesProductItemMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isCreated());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeCreate + 1);
        CommandesProductItem testCommandesProductItem = commandesProductItemList.get(commandesProductItemList.size() - 1);
        assertThat(testCommandesProductItem.getQuantity()).isEqualTo(DEFAULT_QUANTITY);
    }

    @Test
    @Transactional
    void createCommandesProductItemWithExistingId() throws Exception {
        // Create the CommandesProductItem with an existing ID
        commandesProductItem.setId(1L);

        int databaseSizeBeforeCreate = commandesProductItemRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restCommandesProductItemMockMvc
            .perform(
                post(ENTITY_API_URL)
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void getAllCommandesProductItems() throws Exception {
        // Initialize the database
        commandesProductItemRepository.saveAndFlush(commandesProductItem);

        // Get all the commandesProductItemList
        restCommandesProductItemMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(commandesProductItem.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantity").value(hasItem(DEFAULT_QUANTITY)));
    }

    @Test
    @Transactional
    void getCommandesProductItem() throws Exception {
        // Initialize the database
        commandesProductItemRepository.saveAndFlush(commandesProductItem);

        // Get the commandesProductItem
        restCommandesProductItemMockMvc
            .perform(get(ENTITY_API_URL_ID, commandesProductItem.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(commandesProductItem.getId().intValue()))
            .andExpect(jsonPath("$.quantity").value(DEFAULT_QUANTITY));
    }

    @Test
    @Transactional
    void getNonExistingCommandesProductItem() throws Exception {
        // Get the commandesProductItem
        restCommandesProductItemMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingCommandesProductItem() throws Exception {
        // Initialize the database
        commandesProductItemRepository.saveAndFlush(commandesProductItem);

        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();

        // Update the commandesProductItem
        CommandesProductItem updatedCommandesProductItem = commandesProductItemRepository.findById(commandesProductItem.getId()).get();
        // Disconnect from session so that the updates on updatedCommandesProductItem are not directly saved in db
        em.detach(updatedCommandesProductItem);
        updatedCommandesProductItem.quantity(UPDATED_QUANTITY);

        restCommandesProductItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedCommandesProductItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedCommandesProductItem))
            )
            .andExpect(status().isOk());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
        CommandesProductItem testCommandesProductItem = commandesProductItemList.get(commandesProductItemList.size() - 1);
        assertThat(testCommandesProductItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void putNonExistingCommandesProductItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();
        commandesProductItem.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesProductItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, commandesProductItem.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchCommandesProductItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();
        commandesProductItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesProductItemMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamCommandesProductItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();
        commandesProductItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesProductItemMockMvc
            .perform(
                put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateCommandesProductItemWithPatch() throws Exception {
        // Initialize the database
        commandesProductItemRepository.saveAndFlush(commandesProductItem);

        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();

        // Update the commandesProductItem using partial update
        CommandesProductItem partialUpdatedCommandesProductItem = new CommandesProductItem();
        partialUpdatedCommandesProductItem.setId(commandesProductItem.getId());

        partialUpdatedCommandesProductItem.quantity(UPDATED_QUANTITY);

        restCommandesProductItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandesProductItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandesProductItem))
            )
            .andExpect(status().isOk());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
        CommandesProductItem testCommandesProductItem = commandesProductItemList.get(commandesProductItemList.size() - 1);
        assertThat(testCommandesProductItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void fullUpdateCommandesProductItemWithPatch() throws Exception {
        // Initialize the database
        commandesProductItemRepository.saveAndFlush(commandesProductItem);

        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();

        // Update the commandesProductItem using partial update
        CommandesProductItem partialUpdatedCommandesProductItem = new CommandesProductItem();
        partialUpdatedCommandesProductItem.setId(commandesProductItem.getId());

        partialUpdatedCommandesProductItem.quantity(UPDATED_QUANTITY);

        restCommandesProductItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedCommandesProductItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedCommandesProductItem))
            )
            .andExpect(status().isOk());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
        CommandesProductItem testCommandesProductItem = commandesProductItemList.get(commandesProductItemList.size() - 1);
        assertThat(testCommandesProductItem.getQuantity()).isEqualTo(UPDATED_QUANTITY);
    }

    @Test
    @Transactional
    void patchNonExistingCommandesProductItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();
        commandesProductItem.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCommandesProductItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, commandesProductItem.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchCommandesProductItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();
        commandesProductItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesProductItemMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isBadRequest());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamCommandesProductItem() throws Exception {
        int databaseSizeBeforeUpdate = commandesProductItemRepository.findAll().size();
        commandesProductItem.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restCommandesProductItemMockMvc
            .perform(
                patch(ENTITY_API_URL)
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(commandesProductItem))
            )
            .andExpect(status().isMethodNotAllowed());

        // Validate the CommandesProductItem in the database
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteCommandesProductItem() throws Exception {
        // Initialize the database
        commandesProductItemRepository.saveAndFlush(commandesProductItem);

        int databaseSizeBeforeDelete = commandesProductItemRepository.findAll().size();

        // Delete the commandesProductItem
        restCommandesProductItemMockMvc
            .perform(delete(ENTITY_API_URL_ID, commandesProductItem.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<CommandesProductItem> commandesProductItemList = commandesProductItemRepository.findAll();
        assertThat(commandesProductItemList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
