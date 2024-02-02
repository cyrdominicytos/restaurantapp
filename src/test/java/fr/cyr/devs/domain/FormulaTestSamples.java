package fr.cyr.devs.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicLong;

public class FormulaTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    public static Formula getFormulaSample1() {
        return new Formula().id(1L).name("name1").imageType("imageType1").description("description1");
    }

    public static Formula getFormulaSample2() {
        return new Formula().id(2L).name("name2").imageType("imageType2").description("description2");
    }

    public static Formula getFormulaRandomSampleGenerator() {
        return new Formula()
            .id(longCount.incrementAndGet())
            .name(UUID.randomUUID().toString())
            .imageType(UUID.randomUUID().toString())
            .description(UUID.randomUUID().toString());
    }
}
