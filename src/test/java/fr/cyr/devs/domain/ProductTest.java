package fr.cyr.devs.domain;

import static fr.cyr.devs.domain.CommandesProductItemTestSamples.*;
import static fr.cyr.devs.domain.CommandesTestSamples.*;
import static fr.cyr.devs.domain.FormulaTestSamples.*;
import static fr.cyr.devs.domain.ProductCategoryTestSamples.*;
import static fr.cyr.devs.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.cyr.devs.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class ProductTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Product.class);
        Product product1 = getProductSample1();
        Product product2 = new Product();
        assertThat(product1).isNotEqualTo(product2);

        product2.setId(product1.getId());
        assertThat(product1).isEqualTo(product2);

        product2 = getProductSample2();
        assertThat(product1).isNotEqualTo(product2);
    }

    @Test
    void categoryTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        ProductCategory productCategoryBack = getProductCategoryRandomSampleGenerator();

        product.setCategory(productCategoryBack);
        assertThat(product.getCategory()).isEqualTo(productCategoryBack);

        product.category(null);
        assertThat(product.getCategory()).isNull();
    }

    @Test
    void commandessTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        Commandes commandesBack = getCommandesRandomSampleGenerator();

        product.addCommandess(commandesBack);
        assertThat(product.getCommandesses()).containsOnly(commandesBack);
        assertThat(commandesBack.getProducts()).containsOnly(product);

        product.removeCommandess(commandesBack);
        assertThat(product.getCommandesses()).doesNotContain(commandesBack);
        assertThat(commandesBack.getProducts()).doesNotContain(product);

        product.commandesses(new HashSet<>(Set.of(commandesBack)));
        assertThat(product.getCommandesses()).containsOnly(commandesBack);
        assertThat(commandesBack.getProducts()).containsOnly(product);

        product.setCommandesses(new HashSet<>());
        assertThat(product.getCommandesses()).doesNotContain(commandesBack);
        assertThat(commandesBack.getProducts()).doesNotContain(product);
    }

    @Test
    void formulaTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        Formula formulaBack = getFormulaRandomSampleGenerator();

        product.setFormula(formulaBack);
        assertThat(product.getFormula()).isEqualTo(formulaBack);

        product.formula(null);
        assertThat(product.getFormula()).isNull();
    }

    @Test
    void commandesProductItemTest() throws Exception {
        Product product = getProductRandomSampleGenerator();
        CommandesProductItem commandesProductItemBack = getCommandesProductItemRandomSampleGenerator();

        product.setCommandesProductItem(commandesProductItemBack);
        assertThat(product.getCommandesProductItem()).isEqualTo(commandesProductItemBack);
        assertThat(commandesProductItemBack.getProduct()).isEqualTo(product);

        product.commandesProductItem(null);
        assertThat(product.getCommandesProductItem()).isNull();
        assertThat(commandesProductItemBack.getProduct()).isNull();
    }
}
