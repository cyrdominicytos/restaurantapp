package fr.cyr.devs.web.rest;

import fr.cyr.devs.domain.CommandesProductItem;
import fr.cyr.devs.repository.CommandesProductItemRepository;
import fr.cyr.devs.service.CommandesProductItemService;
import fr.cyr.devs.web.rest.errors.BadRequestAlertException;
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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link fr.cyr.devs.domain.CommandesProductItem}.
 */
@RestController
@RequestMapping("/api/commandes-product-items")
public class CommandesProductItemResource {

    private final Logger log = LoggerFactory.getLogger(CommandesProductItemResource.class);

    private static final String ENTITY_NAME = "commandesProductItem";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CommandesProductItemService commandesProductItemService;

    private final CommandesProductItemRepository commandesProductItemRepository;

    public CommandesProductItemResource(
        CommandesProductItemService commandesProductItemService,
        CommandesProductItemRepository commandesProductItemRepository
    ) {
        this.commandesProductItemService = commandesProductItemService;
        this.commandesProductItemRepository = commandesProductItemRepository;
    }

    /**
     * {@code POST  /commandes-product-items} : Create a new commandesProductItem.
     *
     * @param commandesProductItem the commandesProductItem to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new commandesProductItem, or with status {@code 400 (Bad Request)} if the commandesProductItem has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("")
    public ResponseEntity<CommandesProductItem> createCommandesProductItem(@RequestBody CommandesProductItem commandesProductItem)
        throws URISyntaxException {
        log.debug("REST request to save CommandesProductItem : {}", commandesProductItem);
        if (commandesProductItem.getId() != null) {
            throw new BadRequestAlertException("A new commandesProductItem cannot already have an ID", ENTITY_NAME, "idexists");
        }
        CommandesProductItem result = commandesProductItemService.save(commandesProductItem);
        return ResponseEntity
            .created(new URI("/api/commandes-product-items/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /commandes-product-items/:id} : Updates an existing commandesProductItem.
     *
     * @param id the id of the commandesProductItem to save.
     * @param commandesProductItem the commandesProductItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandesProductItem,
     * or with status {@code 400 (Bad Request)} if the commandesProductItem is not valid,
     * or with status {@code 500 (Internal Server Error)} if the commandesProductItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/{id}")
    public ResponseEntity<CommandesProductItem> updateCommandesProductItem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommandesProductItem commandesProductItem
    ) throws URISyntaxException {
        log.debug("REST request to update CommandesProductItem : {}, {}", id, commandesProductItem);
        if (commandesProductItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commandesProductItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commandesProductItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        CommandesProductItem result = commandesProductItemService.update(commandesProductItem);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commandesProductItem.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /commandes-product-items/:id} : Partial updates given fields of an existing commandesProductItem, field will ignore if it is null
     *
     * @param id the id of the commandesProductItem to save.
     * @param commandesProductItem the commandesProductItem to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated commandesProductItem,
     * or with status {@code 400 (Bad Request)} if the commandesProductItem is not valid,
     * or with status {@code 404 (Not Found)} if the commandesProductItem is not found,
     * or with status {@code 500 (Internal Server Error)} if the commandesProductItem couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/{id}", consumes = { "application/json", "application/merge-patch+json" })
    public ResponseEntity<CommandesProductItem> partialUpdateCommandesProductItem(
        @PathVariable(value = "id", required = false) final Long id,
        @RequestBody CommandesProductItem commandesProductItem
    ) throws URISyntaxException {
        log.debug("REST request to partial update CommandesProductItem partially : {}, {}", id, commandesProductItem);
        if (commandesProductItem.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, commandesProductItem.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!commandesProductItemRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<CommandesProductItem> result = commandesProductItemService.partialUpdate(commandesProductItem);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, commandesProductItem.getId().toString())
        );
    }

    /**
     * {@code GET  /commandes-product-items} : get all the commandesProductItems.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of commandesProductItems in body.
     */
    @GetMapping("")
    public ResponseEntity<List<CommandesProductItem>> getAllCommandesProductItems(
        @org.springdoc.core.annotations.ParameterObject Pageable pageable
    ) {
        log.debug("REST request to get a page of CommandesProductItems");
        Page<CommandesProductItem> page = commandesProductItemService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /commandes-product-items/:id} : get the "id" commandesProductItem.
     *
     * @param id the id of the commandesProductItem to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the commandesProductItem, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/{id}")
    public ResponseEntity<CommandesProductItem> getCommandesProductItem(@PathVariable("id") Long id) {
        log.debug("REST request to get CommandesProductItem : {}", id);
        Optional<CommandesProductItem> commandesProductItem = commandesProductItemService.findOne(id);
        return ResponseUtil.wrapOrNotFound(commandesProductItem);
    }

    /**
     * {@code DELETE  /commandes-product-items/:id} : delete the "id" commandesProductItem.
     *
     * @param id the id of the commandesProductItem to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCommandesProductItem(@PathVariable("id") Long id) {
        log.debug("REST request to delete CommandesProductItem : {}", id);
        commandesProductItemService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
            .build();
    }
}
