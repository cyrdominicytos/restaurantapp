package fr.cyr.devs.repository;

import fr.cyr.devs.domain.CommandesFormulaItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CommandesFormulaItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandesFormulaItemRepository extends JpaRepository<CommandesFormulaItem, Long> {}
