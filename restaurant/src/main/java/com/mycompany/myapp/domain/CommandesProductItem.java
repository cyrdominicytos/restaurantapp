package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A CommandesProductItem.
 */
@Entity
@Table(name = "commandes_product_item")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommandesProductItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @JsonIgnoreProperties(value = { "category", "formula", "commandesses" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Product product;

    @ManyToOne
    @JsonIgnoreProperties(value = { "commandesFormulaItems", "commandesProductItems", "user", "products", "formulas" }, allowSetters = true)
    private Commandes commandes;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CommandesProductItem id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public CommandesProductItem quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return this.product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public CommandesProductItem product(Product product) {
        this.setProduct(product);
        return this;
    }

    public Commandes getCommandes() {
        return this.commandes;
    }

    public void setCommandes(Commandes commandes) {
        this.commandes = commandes;
    }

    public CommandesProductItem commandes(Commandes commandes) {
        this.setCommandes(commandes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommandesProductItem)) {
            return false;
        }
        return id != null && id.equals(((CommandesProductItem) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommandesProductItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
