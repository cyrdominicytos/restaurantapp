package com.mycompany.myapp.domain;

import static org.assertj.core.api.Assertions.assertThat;

import com.mycompany.myapp.web.rest.TestUtil;
import org.junit.jupiter.api.Test;

class CommandesProductItemTest {

    @Test
    void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CommandesProductItem.class);
        CommandesProductItem commandesProductItem1 = new CommandesProductItem();
        commandesProductItem1.setId(1L);
        CommandesProductItem commandesProductItem2 = new CommandesProductItem();
        commandesProductItem2.setId(commandesProductItem1.getId());
        assertThat(commandesProductItem1).isEqualTo(commandesProductItem2);
        commandesProductItem2.setId(2L);
        assertThat(commandesProductItem1).isNotEqualTo(commandesProductItem2);
        commandesProductItem1.setId(null);
        assertThat(commandesProductItem1).isNotEqualTo(commandesProductItem2);
    }
}
