package fr.cyr.devs.domain;

import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.concurrent.atomic.AtomicLong;

public class CommandesFormulaItemTestSamples {

    private static final Random random = new Random();
    private static final AtomicLong longCount = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));
    private static final AtomicInteger intCount = new AtomicInteger(random.nextInt() + (2 * Short.MAX_VALUE));

    public static CommandesFormulaItem getCommandesFormulaItemSample1() {
        return new CommandesFormulaItem().id(1L).quantity(1);
    }

    public static CommandesFormulaItem getCommandesFormulaItemSample2() {
        return new CommandesFormulaItem().id(2L).quantity(2);
    }

    public static CommandesFormulaItem getCommandesFormulaItemRandomSampleGenerator() {
        return new CommandesFormulaItem().id(longCount.incrementAndGet()).quantity(intCount.incrementAndGet());
    }
}
