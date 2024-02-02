package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.CommandesProductItem;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the CommandesProductItem entity.
 */
@SuppressWarnings("unused")
@Repository
public interface CommandesProductItemRepository extends JpaRepository<CommandesProductItem, Long> {}
