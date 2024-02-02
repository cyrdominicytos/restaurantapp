package fr.cyr.devs.service.impl;

import fr.cyr.devs.domain.CommandesFormulaItem;
import fr.cyr.devs.repository.CommandesFormulaItemRepository;
import fr.cyr.devs.service.CommandesFormulaItemService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link fr.cyr.devs.domain.CommandesFormulaItem}.
 */
@Service
@Transactional
public class CommandesFormulaItemServiceImpl implements CommandesFormulaItemService {

    private final Logger log = LoggerFactory.getLogger(CommandesFormulaItemServiceImpl.class);

    private final CommandesFormulaItemRepository commandesFormulaItemRepository;

    public CommandesFormulaItemServiceImpl(CommandesFormulaItemRepository commandesFormulaItemRepository) {
        this.commandesFormulaItemRepository = commandesFormulaItemRepository;
    }

    @Override
    public CommandesFormulaItem save(CommandesFormulaItem commandesFormulaItem) {
        log.debug("Request to save CommandesFormulaItem : {}", commandesFormulaItem);
        return commandesFormulaItemRepository.save(commandesFormulaItem);
    }

    @Override
    public CommandesFormulaItem update(CommandesFormulaItem commandesFormulaItem) {
        log.debug("Request to update CommandesFormulaItem : {}", commandesFormulaItem);
        return commandesFormulaItemRepository.save(commandesFormulaItem);
    }

    @Override
    public Optional<CommandesFormulaItem> partialUpdate(CommandesFormulaItem commandesFormulaItem) {
        log.debug("Request to partially update CommandesFormulaItem : {}", commandesFormulaItem);

        return commandesFormulaItemRepository
            .findById(commandesFormulaItem.getId())
            .map(existingCommandesFormulaItem -> {
                if (commandesFormulaItem.getQuantity() != null) {
                    existingCommandesFormulaItem.setQuantity(commandesFormulaItem.getQuantity());
                }

                return existingCommandesFormulaItem;
            })
            .map(commandesFormulaItemRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommandesFormulaItem> findAll(Pageable pageable) {
        log.debug("Request to get all CommandesFormulaItems");
        return commandesFormulaItemRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommandesFormulaItem> findOne(Long id) {
        log.debug("Request to get CommandesFormulaItem : {}", id);
        return commandesFormulaItemRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CommandesFormulaItem : {}", id);
        commandesFormulaItemRepository.deleteById(id);
    }
}
