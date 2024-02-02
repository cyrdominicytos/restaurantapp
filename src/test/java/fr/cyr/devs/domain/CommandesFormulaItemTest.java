package fr.cyr.devs.domain;

import static fr.cyr.devs.domain.CommandesFormulaItemTestSamples.*;
import static fr.cyr.devs.domain.CommandesTestSamples.*;
import static org.assertj.core.api.Assertions.assertThat;

import fr.cyr.devs.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommandesFormulaItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandesFormulaItem.class);
        CommandesFormulaItem commandesFormulaItem1 = getCommandesFormulaItemSample1();
        CommandesFormulaItem commandesFormulaItem2 = new CommandesFormulaItem();
        assertThat(commandesFormulaItem1).isNotEqualTo(commandesFormulaItem2);

        commandesFormulaItem2.setId(commandesFormulaItem1.getId());
        assertThat(commandesFormulaItem1).isEqualTo(commandesFormulaItem2);

        commandesFormulaItem2 = getCommandesFormulaItemSample2();
        assertThat(commandesFormulaItem1).isNotEqualTo(commandesFormulaItem2);
    }

    @Test
    void commandesTest() throws Exception {
        CommandesFormulaItem commandesFormulaItem = getCommandesFormulaItemRandomSampleGenerator();
        Commandes commandesBack = getCommandesRandomSampleGenerator();

        commandesFormulaItem.setCommandes(commandesBack);
        assertThat(commandesFormulaItem.getCommandes()).isEqualTo(commandesBack);

        commandesFormulaItem.commandes(null);
        assertThat(commandesFormulaItem.getCommandes()).isNull();
    }
}
