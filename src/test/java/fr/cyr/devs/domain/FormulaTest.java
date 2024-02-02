package fr.cyr.devs.domain;

import static fr.cyr.devs.domain.CommandesTestSamples.*;
import static fr.cyr.devs.domain.FormulaTestSamples.*;
import static fr.cyr.devs.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.cyr.devs.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class FormulaTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Formula.class);
        Formula formula1 = getFormulaSample1();
        Formula formula2 = new Formula();
        assertThat(formula1).isNotEqualTo(formula2);

        formula2.setId(formula1.getId());
        assertThat(formula1).isEqualTo(formula2);

        formula2 = getFormulaSample2();
        assertThat(formula1).isNotEqualTo(formula2);
    }

    @Test
    void productsTest() throws Exception {
        Formula formula = getFormulaRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        formula.addProducts(productBack);
        assertThat(formula.getProducts()).containsOnly(productBack);
        assertThat(productBack.getFormula()).isEqualTo(formula);

        formula.removeProducts(productBack);
        assertThat(formula.getProducts()).doesNotContain(productBack);
        assertThat(productBack.getFormula()).isNull();

        formula.products(new HashSet<>(Set.of(productBack)));
        assertThat(formula.getProducts()).containsOnly(productBack);
        assertThat(productBack.getFormula()).isEqualTo(formula);

        formula.setProducts(new HashSet<>());
        assertThat(formula.getProducts()).doesNotContain(productBack);
        assertThat(productBack.getFormula()).isNull();
    }

    @Test
    void commandessTest() throws Exception {
        Formula formula = getFormulaRandomSampleGenerator();
        Commandes commandesBack = getCommandesRandomSampleGenerator();

        formula.addCommandess(commandesBack);
        assertThat(formula.getCommandesses()).containsOnly(commandesBack);
        assertThat(commandesBack.getFormulas()).containsOnly(formula);

        formula.removeCommandess(commandesBack);
        assertThat(formula.getCommandesses()).doesNotContain(commandesBack);
        assertThat(commandesBack.getFormulas()).doesNotContain(formula);

        formula.commandesses(new HashSet<>(Set.of(commandesBack)));
        assertThat(formula.getCommandesses()).containsOnly(commandesBack);
        assertThat(commandesBack.getFormulas()).containsOnly(formula);

        formula.setCommandesses(new HashSet<>());
        assertThat(formula.getCommandesses()).doesNotContain(commandesBack);
        assertThat(commandesBack.getFormulas()).doesNotContain(formula);
    }
}
