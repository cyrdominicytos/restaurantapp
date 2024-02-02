package fr.cyr.devs.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class CommandesProductItemTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static CommandesProductItem getCommandesProductItemSample1() {
        return new CommandesProductItem().id(1L).quantity(1);
    }

    public static CommandesProductItem getCommandesProductItemSample2() {
        return new CommandesProductItem().id(2L).quantity(2);
    }

    public static CommandesProductItem getCommandesProductItemRandomSampleGenerator() {
        return new CommandesProductItem().id(longCount.incrementAndGet()).quantity(intCount.incrementAndGet());
    }
}
