package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Commandes;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Commandes}.
 */
public interface CommandesService {
    /**
     * Save a commandes.
     *
     * @param commandes the entity to save.
     * @return the persisted entity.
     */
    Commandes save(Commandes commandes);

    /**
     * Updates a commandes.
     *
     * @param commandes the entity to update.
     * @return the persisted entity.
     */
    Commandes update(Commandes commandes);

    /**
     * Partially updates a commandes.
     *
     * @param commandes the entity to update partially.
     * @return the persisted entity.
     */
    Optional<Commandes> partialUpdate(Commandes commandes);

    /**
     * Get all the commandes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Commandes> findAll(Pageable pageable);

    /**
     * Get all the commandes with eager load of many-to-many relationships.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Commandes> findAllWithEagerRelationships(Pageable pageable);

    /**
     * Get the "id" commandes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Commandes> findOne(Long id);

    /**
     * Delete the "id" commandes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
