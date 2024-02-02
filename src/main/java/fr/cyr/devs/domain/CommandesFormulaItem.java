package fr.cyr.devs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.io.Serializable;

/**
 * A CommandesFormulaItem.
 */
@Entity
@Table(name = "commandes_formula_item")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class CommandesFormulaItem implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "quantity")
    private Integer quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnoreProperties(value = { "commandesFormulaItems", "commandesProductItems", "user", "products", "formulas" }, allowSetters = true)
    private Commandes commandes;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public CommandesFormulaItem id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantity() {
        return this.quantity;
    }

    public CommandesFormulaItem quantity(Integer quantity) {
        this.setQuantity(quantity);
        return this;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Commandes getCommandes() {
        return this.commandes;
    }

    public void setCommandes(Commandes commandes) {
        this.commandes = commandes;
    }

    public CommandesFormulaItem commandes(Commandes commandes) {
        this.setCommandes(commandes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof CommandesFormulaItem)) {
            return false;
        }
        return getId() != null && getId().equals(((CommandesFormulaItem) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "CommandesFormulaItem{" +
            "id=" + getId() +
            ", quantity=" + getQuantity() +
            "}";
    }
}
