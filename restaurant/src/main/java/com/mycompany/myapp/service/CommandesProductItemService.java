package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.CommandesProductItem;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link CommandesProductItem}.
 */
public interface CommandesProductItemService {
    /**
     * Save a commandesProductItem.
     *
     * @param commandesProductItem the entity to save.
     * @return the persisted entity.
     */
    CommandesProductItem save(CommandesProductItem commandesProductItem);

    /**
     * Updates a commandesProductItem.
     *
     * @param commandesProductItem the entity to update.
     * @return the persisted entity.
     */
    CommandesProductItem update(CommandesProductItem commandesProductItem);

    /**
     * Partially updates a commandesProductItem.
     *
     * @param commandesProductItem the entity to update partially.
     * @return the persisted entity.
     */
    Optional<CommandesProductItem> partialUpdate(CommandesProductItem commandesProductItem);

    /**
     * Get all the commandesProductItems.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<CommandesProductItem> findAll(Pageable pageable);

    /**
     * Get the "id" commandesProductItem.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<CommandesProductItem> findOne(Long id);

    /**
     * Delete the "id" commandesProductItem.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
