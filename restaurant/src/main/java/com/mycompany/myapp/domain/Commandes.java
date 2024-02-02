package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Commandes.
 */
@Entity
@Table(name = "commandes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Commandes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "amount", nullable = false)
    private Double amount;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "recovery_date")
    private Instant recoveryDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToMany(mappedBy = "commandes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "commandes" }, allowSetters = true)
    private Set<CommandesFormulaItem> commandesFormulaItems = new HashSet<>();

    @OneToMany(mappedBy = "commandes")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "product", "commandes" }, allowSetters = true)
    private Set<CommandesProductItem> commandesProductItems = new HashSet<>();

    @ManyToOne
    private User user;

    @ManyToMany
    @JoinTable(
        name = "rel_commandes__products",
        joinColumns = @JoinColumn(name = "commandes_id"),
        inverseJoinColumns = @JoinColumn(name = "products_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "category", "formula", "commandesses" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @ManyToMany
    @JoinTable(
        name = "rel_commandes__formulas",
        joinColumns = @JoinColumn(name = "commandes_id"),
        inverseJoinColumns = @JoinColumn(name = "formulas_id")
    )
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "products", "commandesses" }, allowSetters = true)
    private Set<Formula> formulas = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Commandes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getAmount() {
        return this.amount;
    }

    public Commandes amount(Double amount) {
        this.setAmount(amount);
        return this;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Commandes createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getRecoveryDate() {
        return this.recoveryDate;
    }

    public Commandes recoveryDate(Instant recoveryDate) {
        this.setRecoveryDate(recoveryDate);
        return this;
    }

    public void setRecoveryDate(Instant recoveryDate) {
        this.recoveryDate = recoveryDate;
    }

    public Instant getUpdatedDate() {
        return this.updatedDate;
    }

    public Commandes updatedDate(Instant updatedDate) {
        this.setUpdatedDate(updatedDate);
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Set<CommandesFormulaItem> getCommandesFormulaItems() {
        return this.commandesFormulaItems;
    }

    public void setCommandesFormulaItems(Set<CommandesFormulaItem> commandesFormulaItems) {
        if (this.commandesFormulaItems != null) {
            this.commandesFormulaItems.forEach(i -> i.setCommandes(null));
        }
        if (commandesFormulaItems != null) {
            commandesFormulaItems.forEach(i -> i.setCommandes(this));
        }
        this.commandesFormulaItems = commandesFormulaItems;
    }

    public Commandes commandesFormulaItems(Set<CommandesFormulaItem> commandesFormulaItems) {
        this.setCommandesFormulaItems(commandesFormulaItems);
        return this;
    }

    public Commandes addCommandesFormulaItems(CommandesFormulaItem commandesFormulaItem) {
        this.commandesFormulaItems.add(commandesFormulaItem);
        commandesFormulaItem.setCommandes(this);
        return this;
    }

    public Commandes removeCommandesFormulaItems(CommandesFormulaItem commandesFormulaItem) {
        this.commandesFormulaItems.remove(commandesFormulaItem);
        commandesFormulaItem.setCommandes(null);
        return this;
    }

    public Set<CommandesProductItem> getCommandesProductItems() {
        return this.commandesProductItems;
    }

    public void setCommandesProductItems(Set<CommandesProductItem> commandesProductItems) {
        if (this.commandesProductItems != null) {
            this.commandesProductItems.forEach(i -> i.setCommandes(null));
        }
        if (commandesProductItems != null) {
            commandesProductItems.forEach(i -> i.setCommandes(this));
        }
        this.commandesProductItems = commandesProductItems;
    }

    public Commandes commandesProductItems(Set<CommandesProductItem> commandesProductItems) {
        this.setCommandesProductItems(commandesProductItems);
        return this;
    }

    public Commandes addCommandesProductItems(CommandesProductItem commandesProductItem) {
        this.commandesProductItems.add(commandesProductItem);
        commandesProductItem.setCommandes(this);
        return this;
    }

    public Commandes removeCommandesProductItems(CommandesProductItem commandesProductItem) {
        this.commandesProductItems.remove(commandesProductItem);
        commandesProductItem.setCommandes(null);
        return this;
    }

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Commandes user(User user) {
        this.setUser(user);
        return this;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        this.products = products;
    }

    public Commandes products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Commandes addProducts(Product product) {
        this.products.add(product);
        product.getCommandesses().add(this);
        return this;
    }

    public Commandes removeProducts(Product product) {
        this.products.remove(product);
        product.getCommandesses().remove(this);
        return this;
    }

    public Set<Formula> getFormulas() {
        return this.formulas;
    }

    public void setFormulas(Set<Formula> formulas) {
        this.formulas = formulas;
    }

    public Commandes formulas(Set<Formula> formulas) {
        this.setFormulas(formulas);
        return this;
    }

    public Commandes addFormulas(Formula formula) {
        this.formulas.add(formula);
        formula.getCommandesses().add(this);
        return this;
    }

    public Commandes removeFormulas(Formula formula) {
        this.formulas.remove(formula);
        formula.getCommandesses().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Commandes)) {
            return false;
        }
        return id != null && id.equals(((Commandes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Commandes{" +
            "id=" + getId() +
            ", amount=" + getAmount() +
            ", createdDate='" + getCreatedDate() + "'" +
            ", recoveryDate='" + getRecoveryDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
