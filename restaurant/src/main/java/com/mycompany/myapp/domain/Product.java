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
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "price", nullable = false)
    private Double price;

    @NotNull
    @Column(name = "name", nullable = false)
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

    @Column(name = "is_supplement")
    private Boolean isSupplement;

    @Column(name = "created_date")
    private Instant createdDate;

    @Column(name = "updated_date")
    private Instant updatedDate;

    @ManyToOne
    private ProductCategory category;

    @ManyToOne
    @JsonIgnoreProperties(value = { "products", "commandesses" }, allowSetters = true)
    private Formula formula;

    @ManyToMany(mappedBy = "products")
    @Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    @JsonIgnoreProperties(value = { "commandesFormulaItems", "commandesProductItems", "user", "products", "formulas" }, allowSetters = true)
    private Set<Commandes> commandesses = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Product id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Double getPrice() {
        return this.price;
    }

    public Product price(Double price) {
        this.setPrice(price);
        return this;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getName() {
        return this.name;
    }

    public Product name(String name) {
        this.setName(name);
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPhoto() {
        return this.photo;
    }

    public Product photo(byte[] photo) {
        this.setPhoto(photo);
        return this;
    }

    public void setPhoto(byte[] photo) {
        this.photo = photo;
    }

    public String getPhotoContentType() {
        return this.photoContentType;
    }

    public Product photoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
        return this;
    }

    public void setPhotoContentType(String photoContentType) {
        this.photoContentType = photoContentType;
    }

    public String getImageType() {
        return this.imageType;
    }

    public Product imageType(String imageType) {
        this.setImageType(imageType);
        return this;
    }

    public void setImageType(String imageType) {
        this.imageType = imageType;
    }

    public String getDescription() {
        return this.description;
    }

    public Product description(String description) {
        this.setDescription(description);
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsSupplement() {
        return this.isSupplement;
    }

    public Product isSupplement(Boolean isSupplement) {
        this.setIsSupplement(isSupplement);
        return this;
    }

    public void setIsSupplement(Boolean isSupplement) {
        this.isSupplement = isSupplement;
    }

    public Instant getCreatedDate() {
        return this.createdDate;
    }

    public Product createdDate(Instant createdDate) {
        this.setCreatedDate(createdDate);
        return this;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getUpdatedDate() {
        return this.updatedDate;
    }

    public Product updatedDate(Instant updatedDate) {
        this.setUpdatedDate(updatedDate);
        return this;
    }

    public void setUpdatedDate(Instant updatedDate) {
        this.updatedDate = updatedDate;
    }

    public ProductCategory getCategory() {
        return this.category;
    }

    public void setCategory(ProductCategory productCategory) {
        this.category = productCategory;
    }

    public Product category(ProductCategory productCategory) {
        this.setCategory(productCategory);
        return this;
    }

    public Formula getFormula() {
        return this.formula;
    }

    public void setFormula(Formula formula) {
        this.formula = formula;
    }

    public Product formula(Formula formula) {
        this.setFormula(formula);
        return this;
    }

    public Set<Commandes> getCommandesses() {
        return this.commandesses;
    }

    public void setCommandesses(Set<Commandes> commandes) {
        if (this.commandesses != null) {
            this.commandesses.forEach(i -> i.removeProducts(this));
        }
        if (commandes != null) {
            commandes.forEach(i -> i.addProducts(this));
        }
        this.commandesses = commandes;
    }

    public Product commandesses(Set<Commandes> commandes) {
        this.setCommandesses(commandes);
        return this;
    }

    public Product addCommandess(Commandes commandes) {
        this.commandesses.add(commandes);
        commandes.getProducts().add(this);
        return this;
    }

    public Product removeCommandess(Commandes commandes) {
        this.commandesses.remove(commandes);
        commandes.getProducts().remove(this);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Product)) {
            return false;
        }
        return id != null && id.equals(((Product) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Product{" +
            "id=" + getId() +
            ", price=" + getPrice() +
            ", name='" + getName() + "'" +
            ", photo='" + getPhoto() + "'" +
            ", photoContentType='" + getPhotoContentType() + "'" +
            ", imageType='" + getImageType() + "'" +
            ", description='" + getDescription() + "'" +
            ", isSupplement='" + getIsSupplement() + "'" +
            ", createdDate='" + getCreatedDate() + "'" +
            ", updatedDate='" + getUpdatedDate() + "'" +
            "}";
    }
}
