package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CommandesFormulaItem;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link CommandesFormulaItem}.
 */
public interface CommandesFormulaItemService {
    /**
     * Save a commandesFormulaItem.
     *
     * @param commandesFormulaItem the entity to save.
     * @return the persisted entity.
     */
    CommandesFormulaItem save(CommandesFormulaItem commandesFormulaItem);

    /**
     * Updates a commandesFormulaItem.
     *
     * @param commandesFormulaItem the entity to update.
     * @return the persisted entity.
     */
    CommandesFormulaItem update(CommandesFormulaItem commandesFormulaItem);

    /**
     * Partially updates a commandesFormulaItem.
     *
     * @param commandesFormulaItem the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommandesFormulaItem> partialUpdate(CommandesFormulaItem commandesFormulaItem);

    /**
     * Get all the commandesFormulaItems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CommandesFormulaItem> findAll(Pageable pageable);

    /**
     * Get the "id" commandesFormulaItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommandesFormulaItem> findOne(Long id);

    /**
     * Delete the "id" commandesFormulaItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
