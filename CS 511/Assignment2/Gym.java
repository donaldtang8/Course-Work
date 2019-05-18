/*
    Names: Donald Tang, Wenkang Su
    Pledge: I pledge my honor I have abided by the Stevens Honor System.
 */

import java.util.*;
import java.io.*;
import java.util.concurrent.*;

public class Gym implements Runnable{
    private static final int GYM_SIZE = 30;
    private static final int GYM_REGISTERED_CLIENTS = 10000;
    private Map<WeightPlateSize, Integer> noOfWeightPlates = new HashMap<WeightPlateSize, Integer>();
    private Set<Integer> clients = new HashSet<Integer>(); // for generating fresh client ids
    private ExecutorService executor;
    // Definitions - There are 5 of each apparatus, 110 small weights, 90 medium weights, and 75 large weights
    private static final int NUM_APPARATUS = 5;
    private static int NUM_SMALL = 110;
    private static int NUM_MEDIUM = 90;
    private static int NUM_LARGE = 75;
    //Semaphore for each apparatus in gym
    // various semaphores - declaration omitted
    // SHARED RESOURCES: APPARATUS AND WEIGHTS, make semaphores for each
    static Semaphore LEGPRESSMACHINE = new Semaphore(NUM_APPARATUS);
    static Semaphore BARBELL = new Semaphore(NUM_APPARATUS);
    static Semaphore HACKSQUATMACHINE = new Semaphore(NUM_APPARATUS);
    static Semaphore LEGEXTENSIONMACHINE = new Semaphore(NUM_APPARATUS);
    static Semaphore LEGCURLMACHINE = new Semaphore(NUM_APPARATUS);
    static Semaphore LATPULLDOWNMACHINE = new Semaphore(NUM_APPARATUS);
    static Semaphore PECDECKMACHINE = new Semaphore(NUM_APPARATUS);
    static Semaphore CABLECROSSOVERMACHINE = new Semaphore(NUM_APPARATUS);
    // GRABWEIGHTS is a semaphore to make the action of grabbing all the weights atomic, which will prevent against multiple clients
    // attempting to grab weights and will prevent deadlock
    static Semaphore GRABWEIGHTS = new Semaphore(1);
    //Semaphores for each type of plate, permissions set to quantity of each weight plate
    static Semaphore SMALLWEIGHT = new Semaphore(NUM_SMALL);
    static Semaphore MEDIUMWEIGHT = new Semaphore(NUM_MEDIUM);
    static Semaphore LARGEWEIGHT = new Semaphore(NUM_LARGE);
    // appSemMap is a hash map that will allow us to call the semaphore of the apparatus being used directly in client class
    // without having to check what apparatus it is. Each apparatus will be mapped to its respective semaphore
    public static Map<ApparatusType, Semaphore> appSemMap= new HashMap<ApparatusType, Semaphore>();
    //debugging
    int clientsFinished = 0;

    public Gym () {
        executor = Executors.newFixedThreadPool(GYM_SIZE);
        // when gym constructor is called, we will initialize the map of predetermined quantities of each weight
        noOfWeightPlates.put(WeightPlateSize.SMALL_3KG, NUM_SMALL);
        noOfWeightPlates.put(WeightPlateSize.MEDIUM_5KG, NUM_MEDIUM);
        noOfWeightPlates.put(WeightPlateSize.LARGE_10KG, NUM_LARGE);
        // for each apparatus, we need to map it to it's respective semaphore, and we store this in the Map "appSemMap"
        appSemMap.put(ApparatusType.LEGPRESSMACHINE, LEGPRESSMACHINE);
        appSemMap.put(ApparatusType.BARBELL, BARBELL);
        appSemMap.put(ApparatusType.HACKSQUATMACHINE, HACKSQUATMACHINE);
        appSemMap.put(ApparatusType.LEGEXTENSIONMACHINE, LEGEXTENSIONMACHINE);
        appSemMap.put(ApparatusType.LEGCURLMACHINE, LEGCURLMACHINE);
        appSemMap.put(ApparatusType.LATPULLDOWNMACHINE, LATPULLDOWNMACHINE);
        appSemMap.put(ApparatusType.PECDECKMACHINE, PECDECKMACHINE);
        appSemMap.put(ApparatusType.CABLECROSSOVERMACHINE, CABLECROSSOVERMACHINE);
    }

    // Create a new ID for each client and checks that the ID is not already in the set of clients to make sure it is unique
    public int uniqueID() {
        Random R = new Random();
        int newID = R.nextInt(GYM_REGISTERED_CLIENTS) + 1;
        //System.out.println("Current Client List");
        /*for (Iterator<Integer> it = clients.iterator(); it.hasNext(); ) {
            Integer i = it.next();
            System.out.println(i);
        }*/
        while (clients.contains(newID)) {
            newID = R.nextInt(GYM_REGISTERED_CLIENTS) + 1;
        }
        clients.add(newID);
        return newID;
    }

    // execute client process, will execute GYM_REGISTERED_CLIENTS times
    public void run() {
        for(int i = 0; i < GYM_REGISTERED_CLIENTS; i++) {
            Client newClient;
            int newID = uniqueID();
            newClient = Client.generateRandom(newID, noOfWeightPlates);
            executor.execute(newClient);
            clientsFinished++;
        }
        System.out.println("Clients Finished: " + clientsFinished);
        executor.shutdown();
    }
}