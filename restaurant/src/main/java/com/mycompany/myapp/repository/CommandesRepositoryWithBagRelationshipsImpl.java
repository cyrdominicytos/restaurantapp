package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Commandes;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;
import java.util.stream.IntStream;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.hibernate.annotations.QueryHints;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

/**
 * Utility repository to load bag relationships based on https://vladmihalcea.com/hibernate-multiplebagfetchexception/
 */
public class CommandesRepositoryWithBagRelationshipsImpl implements CommandesRepositoryWithBagRelationships {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public Optional<Commandes> fetchBagRelationships(Optional<Commandes> commandes) {
        return commandes.map(this::fetchProducts).map(this::fetchFormulas);
    }

    @Override
    public Page<Commandes> fetchBagRelationships(Page<Commandes> commandes) {
        return new PageImpl<>(fetchBagRelationships(commandes.getContent()), commandes.getPageable(), commandes.getTotalElements());
    }

    @Override
    public List<Commandes> fetchBagRelationships(List<Commandes> commandes) {
        return Optional.of(commandes).map(this::fetchProducts).map(this::fetchFormulas).orElse(Collections.emptyList());
    }

    Commandes fetchProducts(Commandes result) {
        return entityManager
            .createQuery(
                "select commandes from Commandes commandes left join fetch commandes.products where commandes is :commandes",
                Commandes.class
            )
            .setParameter("commandes", result)
            //.setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Commandes> fetchProducts(List<Commandes> commandes) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, commandes.size()).forEach(index -> order.put(commandes.get(index).getId(), index));
        List<Commandes> result = entityManager
            .createQuery(
                "select distinct commandes from Commandes commandes left join fetch commandes.products where commandes in :commandes",
                Commandes.class
            )
            .setParameter("commandes", commandes)
            //.setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }

    Commandes fetchFormulas(Commandes result) {
        return entityManager
            .createQuery(
                "select commandes from Commandes commandes left join fetch commandes.formulas where commandes is :commandes",
                Commandes.class
            )
            .setParameter("commandes", result)
            //.setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getSingleResult();
    }

    List<Commandes> fetchFormulas(List<Commandes> commandes) {
        HashMap<Object, Integer> order = new HashMap<>();
        IntStream.range(0, commandes.size()).forEach(index -> order.put(commandes.get(index).getId(), index));
        List<Commandes> result = entityManager
            .createQuery(
                "select distinct commandes from Commandes commandes left join fetch commandes.formulas where commandes in :commandes",
                Commandes.class
            )
            .setParameter("commandes", commandes)
            //.setHint(QueryHints.PASS_DISTINCT_THROUGH, false)
            .getResultList();
        Collections.sort(result, (o1, o2) -> Integer.compare(order.get(o1.getId()), order.get(o2.getId())));
        return result;
    }
}
