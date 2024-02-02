package com.mycompany.myapp.service.impl;

import com.mycompany.myapp.domain.CommandesProductItem;
import com.mycompany.myapp.repository.CommandesProductItemRepository;
import com.mycompany.myapp.service.CommandesProductItemService;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link CommandesProductItem}.
 */
@Service
@Transactional
public class CommandesProductItemServiceImpl implements CommandesProductItemService {

    private final Logger log = LoggerFactory.getLogger(CommandesProductItemServiceImpl.class);

    private final CommandesProductItemRepository commandesProductItemRepository;

    public CommandesProductItemServiceImpl(CommandesProductItemRepository commandesProductItemRepository) {
        this.commandesProductItemRepository = commandesProductItemRepository;
    }

    @Override
    public CommandesProductItem save(CommandesProductItem commandesProductItem) {
        log.debug("Request to save CommandesProductItem : {}", commandesProductItem);
        return commandesProductItemRepository.save(commandesProductItem);
    }

    @Override
    public CommandesProductItem update(CommandesProductItem commandesProductItem) {
        log.debug("Request to update CommandesProductItem : {}", commandesProductItem);
        return commandesProductItemRepository.save(commandesProductItem);
    }

    @Override
    public Optional<CommandesProductItem> partialUpdate(CommandesProductItem commandesProductItem) {
        log.debug("Request to partially update CommandesProductItem : {}", commandesProductItem);

        return commandesProductItemRepository
            .findById(commandesProductItem.getId())
            .map(existingCommandesProductItem -> {
                if (commandesProductItem.getQuantity() != null) {
                    existingCommandesProductItem.setQuantity(commandesProductItem.getQuantity());
                }

                return existingCommandesProductItem;
            })
            .map(commandesProductItemRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<CommandesProductItem> findAll(Pageable pageable) {
        log.debug("Request to get all CommandesProductItems");
        return commandesProductItemRepository.findAll(pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<CommandesProductItem> findOne(Long id) {
        log.debug("Request to get CommandesProductItem : {}", id);
        return commandesProductItemRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete CommandesProductItem : {}", id);
        commandesProductItemRepository.deleteById(id);
    }
}
