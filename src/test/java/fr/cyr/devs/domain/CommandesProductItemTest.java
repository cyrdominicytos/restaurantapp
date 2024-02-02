package fr.cyr.devs.domain;

import static fr.cyr.devs.domain.CommandesProductItemTestSamples.*;
import static fr.cyr.devs.domain.CommandesTestSamples.*;
import static fr.cyr.devs.domain.ProductTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.cyr.devs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommandesProductItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandesProductItem.class);
        CommandesProductItem commandesProductItem1 = getCommandesProductItemSample1();
        CommandesProductItem commandesProductItem2 = new CommandesProductItem();
        assertThat(commandesProductItem1).isNotEqualTo(commandesProductItem2);

        commandesProductItem2.setId(commandesProductItem1.getId());
        assertThat(commandesProductItem1).isEqualTo(commandesProductItem2);

        commandesProductItem2 = getCommandesProductItemSample2();
        assertThat(commandesProductItem1).isNotEqualTo(commandesProductItem2);
    }

    @Test
    void productTest() throws Exception {
        CommandesProductItem commandesProductItem = getCommandesProductItemRandomSampleGenerator();
        Product productBack = getProductRandomSampleGenerator();

        commandesProductItem.setProduct(productBack);
        assertThat(commandesProductItem.getProduct()).isEqualTo(productBack);

        commandesProductItem.product(null);
        assertThat(commandesProductItem.getProduct()).isNull();
    }

    @Test
    void commandesTest() throws Exception {
        CommandesProductItem commandesProductItem = getCommandesProductItemRandomSampleGenerator();
        Commandes commandesBack = getCommandesRandomSampleGenerator();

        commandesProductItem.setCommandes(commandesBack);
        assertThat(commandesProductItem.getCommandes()).isEqualTo(commandesBack);

        commandesProductItem.commandes(null);
        assertThat(commandesProductItem.getCommandes()).isNull();
    }
}
