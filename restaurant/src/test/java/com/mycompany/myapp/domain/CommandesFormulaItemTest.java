package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommandesFormulaItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandesFormulaItem.class);
        CommandesFormulaItem commandesFormulaItem1 = new CommandesFormulaItem();
        commandesFormulaItem1.setId(1L);
        CommandesFormulaItem commandesFormulaItem2 = new CommandesFormulaItem();
        commandesFormulaItem2.setId(commandesFormulaItem1.getId());
        assertThat(commandesFormulaItem1).isEqualTo(commandesFormulaItem2);
        commandesFormulaItem2.setId(2L);
        assertThat(commandesFormulaItem1).isNotEqualTo(commandesFormulaItem2);
        commandesFormulaItem1.setId(null);
        assertThat(commandesFormulaItem1).isNotEqualTo(commandesFormulaItem2);
    }
}
