package fr.cyr.devs.repository;

import fr.cyr.devs.domain.CommandesProductItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CommandesProductItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandesProductItemRepository extends JpaRepository<CommandesProductItem, Long> {}
