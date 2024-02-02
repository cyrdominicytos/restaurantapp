package fr.cyr.devs.repository;

import fr.cyr.devs.domain.Commandes;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;

public interface CommandesRepositoryWithBagRelationships {
    Optional<Commandes> fetchBagRelationships(Optional<Commandes> commandes);

    List<Commandes> fetchBagRelationships(List<Commandes> commandes);

    Page<Commandes> fetchBagRelationships(Page<Commandes> commandes);
}
