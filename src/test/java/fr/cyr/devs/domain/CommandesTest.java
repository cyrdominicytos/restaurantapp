package fr.cyr.devs.domain;

import static fr.cyr.devs.domain.ClientTestSamples.*;
import static fr.cyr.devs.domain.CommandesFormulaItemTestSamples.*;
import static fr.cyr.devs.domain.CommandesProductItemTestSamples.*;
import static fr.cyr.devs.domain.CommandesTestSamples.*;
import static fr.cyr.devs.domain.FormulaTestSamples.*;
import static fr.cyr.devs.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.cyr.devs.web.rest.TestUtil;
import java.util.HashSet;
import java.util.Set;
import org.junit.jupiter.api.Test;

class CommandesTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Commandes.class);
        Commandes commandes1 = getCommandesSample1();
        Commandes commandes2 = new Commandes();
        assertThat(commandes1).isNotEqualTo(commandes2);

        commandes2.setId(commandes1.getId());
        assertThat(commandes1).isEqualTo(commandes2);

        commandes2 = getCommandesSample2();
        assertThat(commandes1).isNotEqualTo(commandes2);
    }

    @Test
    void commandesFormulaItemsTest() throws Exception {
        Commandes commandes = getCommandesRandomSampleGenerator();
        CommandesFormulaItem commandesFormulaItemBack = getCommandesFormulaItemRandomSampleGenerator();

        commandes.addCommandesFormulaItems(commandesFormulaItemBack);
        assertThat(commandes.getCommandesFormulaItems()).containsOnly(commandesFormulaItemBack);
        assertThat(commandesFormulaItemBack.getCommandes()).isEqualTo(commandes);

        commandes.removeCommandesFormulaItems(commandesFormulaItemBack);
        assertThat(commandes.getCommandesFormulaItems()).doesNotContain(commandesFormulaItemBack);
        assertThat(commandesFormulaItemBack.getCommandes()).isNull();

        commandes.commandesFormulaItems(new HashSet<>(Set.of(commandesFormulaItemBack)));
        assertThat(commandes.getCommandesFormulaItems()).containsOnly(commandesFormulaItemBack);
        assertThat(commandesFormulaItemBack.getCommandes()).isEqualTo(commandes);

        commandes.setCommandesFormulaItems(new HashSet<>());
        assertThat(commandes.getCommandesFormulaItems()).doesNotContain(commandesFormulaItemBack);
        assertThat(commandesFormulaItemBack.getCommandes()).isNull();
    }

    @Test
    void commandesProductItemsTest() throws Exception {
        Commandes commandes = getCommandesRandomSampleGenerator();
        CommandesProductItem commandesProductItemBack = getCommandesProductItemRandomSampleGenerator();

        commandes.addCommandesProductItems(commandesProductItemBack);
        assertThat(commandes.getCommandesProductItems()).containsOnly(commandesProductItemBack);
        assertThat(commandesProductItemBack.getCommandes()).isEqualTo(commandes);

        commandes.removeCommandesProductItems(commandesProductItemBack);
        assertThat(commandes.getCommandesProductItems()).doesNotContain(commandesProductItemBack);
        assertThat(commandesProductItemBack.getCommandes()).isNull();

        commandes.commandesProductItems(new HashSet<>(Set.of(commandesProductItemBack)));
        assertThat(commandes.getCommandesProductItems()).containsOnly(commandesProductItemBack);
        assertThat(commandesProductItemBack.getCommandes()).isEqualTo(commandes);

        commandes.setCommandesProductItems(new HashSet<>());
        assertThat(commandes.getCommandesProductItems()).doesNotContain(commandesProductItemBack);
        assertThat(commandesProductItemBack.getCommandes()).isNull();
    }

    @Test
    void userTest() throws Exception {
        Commandes commandes = getCommandesRandomSampleGenerator();
        Client clientBack = getClientRandomSampleGenerator();

        commandes.setUser(clientBack);
        assertThat(commandes.getUser()).isEqualTo(clientBack);

        commandes.user(null);
        assertThat(commandes.getUser()).isNull();
    }

    @Test
    void productsTest() throws Exception {
        Commandes commandes = getCommandesRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        commandes.addProducts(productBack);
        assertThat(commandes.getProducts()).containsOnly(productBack);

        commandes.removeProducts(productBack);
        assertThat(commandes.getProducts()).doesNotContain(productBack);

        commandes.products(new HashSet<>(Set.of(productBack)));
        assertThat(commandes.getProducts()).containsOnly(productBack);

        commandes.setProducts(new HashSet<>());
        assertThat(commandes.getProducts()).doesNotContain(productBack);
    }

    @Test
    void formulasTest() throws Exception {
        Commandes commandes = getCommandesRandomSampleGenerator();
        Formula formulaBack = getFormulaRandomSampleGenerator();

        commandes.addFormulas(formulaBack);
        assertThat(commandes.getFormulas()).containsOnly(formulaBack);

        commandes.removeFormulas(formulaBack);
        assertThat(commandes.getFormulas()).doesNotContain(formulaBack);

        commandes.formulas(new HashSet<>(Set.of(formulaBack)));
        assertThat(commandes.getFormulas()).containsOnly(formulaBack);

        commandes.setFormulas(new HashSet<>());
        assertThat(commandes.getFormulas()).doesNotContain(formulaBack);
    }
}
