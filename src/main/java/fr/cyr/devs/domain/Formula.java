package fr.cyr.devs.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;

/**
 * A Formula.
 */
@Entity
@Table(name = "formula")
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Formula implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @Column(name = "name")
    private String name;

    @Lob
    @Column(name = "photo")
    private byte[] photo;

    @Column(name = "photo_content_type")
    private String photoContentType;

    @Column(name = "image_type")
    private String imageType;

    @Column(name = "description")
    private String description;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "formula")
    @JsonIgnoreProperties(value = { "category", "commandesses", "formula", "commandesProductItem" }, allowSetters = true)
    private Set<Product> products = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "formulas")
    @JsonIgnoreProperties(value = { "commandesFormulaItems", "commandesProductItems", "user", "products", "formulas" }, allowSetters = true)
    private Set<Commandes> commandesses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Formula id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return this.price;
    }

    public Formula price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getName() {
        return this.name;
    }

    public Formula name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Formula photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Formula photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getImageType() {
        return this.imageType;
    }

    public Formula imageType(String imageType) {
        this.setImageType(imageType);
        return this;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getDescription() {
        return this.description;
    }

    public Formula description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Formula createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return this.updatedDate;
    }

    public Formula updatedDate(Instant updatedDate) {
        this.setUpdatedDate(updatedDate);
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public Set<Product> getProducts() {
        return this.products;
    }

    public void setProducts(Set<Product> products) {
        if (this.products != null) {
            this.products.forEach(i -> i.setFormula(null));
        }
        if (products != null) {
            products.forEach(i -> i.setFormula(this));
        }
        this.products = products;
    }

    public Formula products(Set<Product> products) {
        this.setProducts(products);
        return this;
    }

    public Formula addProducts(Product product) {
        this.products.add(product);
        product.setFormula(this);
        return this;
    }

    public Formula removeProducts(Product product) {
        this.products.remove(product);
        product.setFormula(null);
        return this;
    }

    public Set<Commandes> getCommandesses() {
        return this.commandesses;
    }

    public void setCommandesses(Set<Commandes> commandes) {
        if (this.commandesses != null) {
            this.commandesses.forEach(i -> i.removeFormulas(this));
        }
        if (commandes != null) {
            commandes.forEach(i -> i.addFormulas(this));
        }
        this.commandesses = commandes;
    }

    public Formula commandesses(Set<Commandes> commandes) {
        this.setCommandesses(commandes);
        return this;
    }

    public Formula addCommandess(Commandes commandes) {
        this.commandesses.add(commandes);
        commandes.getFormulas().add(this);
        return this;
    }

    public Formula removeCommandess(Commandes commandes) {
        this.commandesses.remove(commandes);
        commandes.getFormulas().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Formula)) {
            return false;
        }
        return getId() != null && getId().equals(((Formula) o).getId());
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Formula{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", name='" + getName() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", imageType='" + getImageType() + "'" +
            ", description='" + getDescription() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
