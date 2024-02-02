package fr.cyr.devs.service.impl;

import fr.cyr.devs.domain.Commandes;
import fr.cyr.devs.repository.CommandesRepository;
import fr.cyr.devs.service.CommandesService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link fr.cyr.devs.domain.Commandes}.
 */
@Service
@Transactional
public class CommandesServiceImpl implements CommandesService {

    private final Logger log = LoggerFactory.getLogger(CommandesServiceImpl.class);

    private final CommandesRepository commandesRepository;

    public CommandesServiceImpl(CommandesRepository commandesRepository) {
        this.commandesRepository = commandesRepository;
    }

    @Override
    public Commandes save(Commandes commandes) {
        log.debug("Request to save Commandes : {}", commandes);
        return commandesRepository.save(commandes);
    }

    @Override
    public Commandes update(Commandes commandes) {
        log.debug("Request to update Commandes : {}", commandes);
        return commandesRepository.save(commandes);
    }

    @Override
    public Optional<Commandes> partialUpdate(Commandes commandes) {
        log.debug("Request to partially update Commandes : {}", commandes);

        return commandesRepository
            .findById(commandes.getId())
            .map(existingCommandes -> {
                if (commandes.getAmount() != null) {
                    existingCommandes.setAmount(commandes.getAmount());
                }
                if (commandes.getCreatedDate() != null) {
                    existingCommandes.setCreatedDate(commandes.getCreatedDate());
                }
                if (commandes.getRecoveryDate() != null) {
                    existingCommandes.setRecoveryDate(commandes.getRecoveryDate());
                }
                if (commandes.getUpdatedDate() != null) {
                    existingCommandes.setUpdatedDate(commandes.getUpdatedDate());
                }

                return existingCommandes;
            })
            .map(commandesRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Commandes> findAll(Pageable pageable) {
        log.debug("Request to get all Commandes");
        return commandesRepository.findAll(pageable);
    }

    public Page<Commandes> findAllWithEagerRelationships(Pageable pageable) {
        return commandesRepository.findAllWithEagerRelationships(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Commandes> findOne(Long id) {
        log.debug("Request to get Commandes : {}", id);
        return commandesRepository.findOneWithEagerRelationships(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Commandes : {}", id);
        commandesRepository.deleteById(id);
    }
}
