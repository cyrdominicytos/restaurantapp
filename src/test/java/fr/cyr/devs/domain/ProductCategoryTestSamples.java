package fr.cyr.devs.domain;

import java.util.Random;
import java.util.UUID;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class ProductCategoryTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static ProductCategory getProductCategorySample1() {
        return new ProductCategory().id(1L).name("name1").ordre(1);
    }

    public static ProductCategory getProductCategorySample2() {
        return new ProductCategory().id(2L).name("name2").ordre(2);
    }

    public static ProductCategory getProductCategoryRandomSampleGenerator() {
        return new ProductCategory().id(longCount.incrementAndGet()).name(UUID.randomUUID().toString()).ordre(intCount.incrementAndGet());
    }
}
