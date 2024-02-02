package fr.cyr.devs.service.impl;

import fr.cyr.devs.domain.Product;
import fr.cyr.devs.repository.ProductRepository;
import fr.cyr.devs.service.ProductService;
import java.util.List;
import java.util.Optional;
import java.util.stream.StreamSupport;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link fr.cyr.devs.domain.Product}.
 */
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    private final Logger log = LoggerFactory.getLogger(ProductServiceImpl.class);

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product save(Product product) {
        log.debug("Request to save Product : {}", product);
        return productRepository.save(product);
    }

    @Override
    public Product update(Product product) {
        log.debug("Request to update Product : {}", product);
        return productRepository.save(product);
    }

    @Override
    public Optional<Product> partialUpdate(Product product) {
        log.debug("Request to partially update Product : {}", product);

        return productRepository
            .findById(product.getId())
            .map(existingProduct -> {
                if (product.getPrice() != null) {
                    existingProduct.setPrice(product.getPrice());
                }
                if (product.getName() != null) {
                    existingProduct.setName(product.getName());
                }
                if (product.getPhoto() != null) {
                    existingProduct.setPhoto(product.getPhoto());
                }
                if (product.getPhotoContentType() != null) {
                    existingProduct.setPhotoContentType(product.getPhotoContentType());
                }
                if (product.getImageType() != null) {
                    existingProduct.setImageType(product.getImageType());
                }
                if (product.getDescription() != null) {
                    existingProduct.setDescription(product.getDescription());
                }
                if (product.getIsSupplement() != null) {
                    existingProduct.setIsSupplement(product.getIsSupplement());
                }
                if (product.getCreatedDate() != null) {
                    existingProduct.setCreatedDate(product.getCreatedDate());
                }
                if (product.getUpdatedDate() != null) {
                    existingProduct.setUpdatedDate(product.getUpdatedDate());
                }

                return existingProduct;
            })
            .map(productRepository::save);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<Product> findAll(Pageable pageable) {
        log.debug("Request to get all Products");
        return productRepository.findAll(pageable);
    }

    /**
     *  Get all the products where CommandesProductItem is {@code null}.
     *  @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<Product> findAllWhereCommandesProductItemIsNull() {
        log.debug("Request to get all products where CommandesProductItem is null");
        return StreamSupport
            .stream(productRepository.findAll().spliterator(), false)
            .filter(product -> product.getCommandesProductItem() == null)
            .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Product> findOne(Long id) {
        log.debug("Request to get Product : {}", id);
        return productRepository.findById(id);
    }

    @Override
    public void delete(Long id) {
        log.debug("Request to delete Product : {}", id);
        productRepository.deleteById(id);
    }
}
