package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.CommandesFormulaItem;
import com.mycompany.myapp.repository.CommandesFormulaItemRepository;
import com.mycompany.myapp.service.CommandesFormulaItemService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.CommandesFormulaItem}.
 */
@RestController
@RequestMapping("/api")
public class CommandesFormulaItemResource {

    private final Logger log = LoggerFactory.getLogger(CommandesFormulaItemResource.class);

    private static final String ENTITY_NAME = "commandesFormulaItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandesFormulaItemService commandesFormulaItemService;

    private final CommandesFormulaItemRepository commandesFormulaItemRepository;

    public CommandesFormulaItemResource(
        CommandesFormulaItemService commandesFormulaItemService,
        CommandesFormulaItemRepository commandesFormulaItemRepository
    ) {
        this.commandesFormulaItemService = commandesFormulaItemService;
        this.commandesFormulaItemRepository = commandesFormulaItemRepository;
    }

    /**
     * {@code POST  /commandes-formula-items} : Create a new commandesFormulaItem.
     *
     * @param commandesFormulaItem the commandesFormulaItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commandesFormulaItem, or with status {@code 400 (Bad Request)} if the commandesFormulaItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/commandes-formula-items")
    public ResponseEntity<CommandesFormulaItem> createCommandesFormulaItem(@RequestBody CommandesFormulaItem commandesFormulaItem)
        throws URISyntaxException {
        log.debug("REST request to save CommandesFormulaItem : {}", commandesFormulaItem);
        if (commandesFormulaItem.getId() != null) {
            throw new BadRequestAlertException("A new commandesFormulaItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommandesFormulaItem result = commandesFormulaItemService.save(commandesFormulaItem);
        return ResponseEntity
            .created(new URI("/api/commandes-formula-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commandes-formula-items/:id} : Updates an existing commandesFormulaItem.
     *
     * @param id the id of the commandesFormulaItem to save.
     * @param commandesFormulaItem the commandesFormulaItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandesFormulaItem,
     * or with status {@code 400 (Bad Request)} if the commandesFormulaItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commandesFormulaItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/commandes-formula-items/{id}")
    public ResponseEntity<CommandesFormulaItem> updateCommandesFormulaItem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommandesFormulaItem commandesFormulaItem
    ) throws URISyntaxException {
        log.debug("REST request to update CommandesFormulaItem : {}, {}", id, commandesFormulaItem);
        if (commandesFormulaItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commandesFormulaItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commandesFormulaItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CommandesFormulaItem result = commandesFormulaItemService.update(commandesFormulaItem);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, commandesFormulaItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /commandes-formula-items/:id} : Partial updates given fields of an existing commandesFormulaItem, field will ignore if it is null
     *
     * @param id the id of the commandesFormulaItem to save.
     * @param commandesFormulaItem the commandesFormulaItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandesFormulaItem,
     * or with status {@code 400 (Bad Request)} if the commandesFormulaItem is not valid,
     * or with status {@code 404 (Not Found)} if the commandesFormulaItem is not found,
     * or with status {@code 500 (Internal Server Error)} if the commandesFormulaItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/commandes-formula-items/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommandesFormulaItem> partialUpdateCommandesFormulaItem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommandesFormulaItem commandesFormulaItem
    ) throws URISyntaxException {
        log.debug("REST request to partial update CommandesFormulaItem partially : {}, {}", id, commandesFormulaItem);
        if (commandesFormulaItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commandesFormulaItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commandesFormulaItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommandesFormulaItem> result = commandesFormulaItemService.partialUpdate(commandesFormulaItem);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, commandesFormulaItem.getId().toString())
        );
    }

    /**
     * {@code GET  /commandes-formula-items} : get all the commandesFormulaItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commandesFormulaItems in body.
     */
    @GetMapping("/commandes-formula-items")
    public ResponseEntity<List<CommandesFormulaItem>> getAllCommandesFormulaItems(
        @org.springdoc.api.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of CommandesFormulaItems");
        Page<CommandesFormulaItem> page = commandesFormulaItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /commandes-formula-items/:id} : get the "id" commandesFormulaItem.
     *
     * @param id the id of the commandesFormulaItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commandesFormulaItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/commandes-formula-items/{id}")
    public ResponseEntity<CommandesFormulaItem> getCommandesFormulaItem(@PathVariable Long id) {
        log.debug("REST request to get CommandesFormulaItem : {}", id);
        Optional<CommandesFormulaItem> commandesFormulaItem = commandesFormulaItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commandesFormulaItem);
    }

    /**
     * {@code DELETE  /commandes-formula-items/:id} : delete the "id" commandesFormulaItem.
     *
     * @param id the id of the commandesFormulaItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/commandes-formula-items/{id}")
    public ResponseEntity<Void> deleteCommandesFormulaItem(@PathVariable Long id) {
        log.debug("REST request to delete CommandesFormulaItem : {}", id);
        commandesFormulaItemService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
