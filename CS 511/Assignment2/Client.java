/*
    Names: Donald Tang, Wenkang Su
    Pledge: I pledge my honor I have abided by the Stevens Honor System.
 */

import java.util.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.*;

public class Client implements Runnable {
    private int id;
    private List<Exercise> routine;

    public Client(int id) {
        this.id = id;
        routine = new ArrayList<Exercise>();
    }

    public void addExercise(Exercise e) {
        routine.add(e);
    }

    // Generates a random client with given id
    public static Client generateRandom(int id, Map<WeightPlateSize, Integer> noOfWeightPlates) {
        // create new client object
        Client newClient = new Client(id);
        // initialize Random() to choose random number of exercises between 15 to 20 per client
        Random random = new Random();
        // use boolean to check that there is at least one plate needed for exercise
        boolean atLeastOne = false;
        int numExercise = random.nextInt((20-15) + 1) + 15;
        Map<WeightPlateSize, Integer> randomWeight = new HashMap<WeightPlateSize, Integer>();
        // now we need to choose a random amount of weight plates for exercise to be generated
        // to be realistic, we will choose a random value between 1 to 5
        // loop through noOfWeightPlates
        // for each weight plate, pick a random amount from 0-10
        // store random number of each plate along with its associated plate size into the new map "randomWeight"
        for (Map.Entry<WeightPlateSize, Integer> entry : noOfWeightPlates.entrySet()) {
            //get current plate size
            WeightPlateSize key = entry.getKey();
            //randomize number of plates to be used in exercise
            Integer value = random.nextInt(10);
            //store in new map
            randomWeight.put(key, value);
            // if there is at least one plate needed for exercise, set boolean to true
            if (value > 0) {
                atLeastOne = true;
            }
        }
        // if exercise uses no weight plates, we have to generate a new client that utilizes at least one plate
        if (atLeastOne == false) {
            generateRandom(id, noOfWeightPlates);
        }
        //for each random num exercises, use generate function in exercise and add exercises to routine
        for (int i = 0; i < numExercise; i++) {
            newClient.addExercise(Exercise.generateRandom(randomWeight));
        }
        return newClient;
    }

    // given a client id and exercise object, function will execute the exercise given and will either execute or wait depending
    // on the availability of apparatus and weight plates
    public void exerciseInGym(int id, Exercise exerciseToDo) {
        // since apparatus and weight plates are both shared resources, we first need to identify which apparatus
        // and how many of each plates we need to perform the exercise
        ApparatusType a = exerciseToDo.getApparatusForExercise();
        // store the weights needed for exercise in variable "weightsNeeded"
        Map<WeightPlateSize, Integer> weightsNeeded = exerciseToDo.getWeightsForExercise();
        // Using map weightsNeeded, we put each quantity needed per plate into variables smallPlatesNeeded, mediumPlatesNeeded
        // and largePlatesNeeded
        int smallPlatesNeeded = weightsNeeded.get(WeightPlateSize.SMALL_3KG);
        int mediumPlatesNeeded = weightsNeeded.get(WeightPlateSize.MEDIUM_5KG);
        int largePlatesNeeded = weightsNeeded.get(WeightPlateSize.LARGE_10KG);
        //debugging
        System.out.println("Client " + id + " needs - small: " + smallPlatesNeeded + " medium: " + mediumPlatesNeeded + " large: " + largePlatesNeeded);
        //a client must wait for all the required weight plates to be available.
        System.out.println("Client " + id + " attempting to grab weights");
        try {
            // attempt to grab the semaphore for respective apparatus
            Gym.appSemMap.get(a).acquire();
            System.out.println("Client " + id + " is now using apparatus " + a);
            // attempt to grab semaphore for grabbing weights all at once
            Gym.GRABWEIGHTS.acquire();
            // if successfully grab, acquire permissions to grab plates
            if (smallPlatesNeeded > 0) {
                // grab "smallPlatesNeeded" permissions for small weights
                for (int i = 0; i < smallPlatesNeeded; i++) {
                    try {
                        Gym.SMALLWEIGHT.acquire();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Client " + id + " has successfully grabbed " + smallPlatesNeeded + " small weights (3kg)!");
            }
            if (mediumPlatesNeeded > 0) {
                for (int j = 0; j < mediumPlatesNeeded; j++) {
                    try {
                        Gym.MEDIUMWEIGHT.acquire();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Client " + id + " has successfully grabbed " + mediumPlatesNeeded + " medium weights (5kg)!");
            }
            if (largePlatesNeeded > 0) {
                for (int k = 0; k < largePlatesNeeded; k++) {
                    try {
                        Gym.LARGEWEIGHT.acquire();
                    } catch (InterruptedException e) {
                        e.printStackTrace();
                    }
                }
                System.out.println("Client " + id + " has successfully grabbed " + largePlatesNeeded + " large weights (10kg)!");
            }
            // once client has grabbed all required weights, release grab weights mutex
            Gym.GRABWEIGHTS.release();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        //exercise for duration
        System.out.println("Client " + id + " is now going to workout!");
        try {
            Thread.sleep(exerciseToDo.getDuration());
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("Client " + id + " has finished exercising!");
        //release apparatus back to resource pool
        Gym.appSemMap.get(a).release();
        System.out.println("Client has finished using apparatus " + a + " ... returning weights now");
        //release apparatus and all weight plates used
        //*** CAN MAKE SEPARATE HELPER FUNCTIONS TO ACQUIRE AND RELEASE WEIGHTS
        if (smallPlatesNeeded > 0) {
            for (int l = 0; l < smallPlatesNeeded; l++) {
                Gym.SMALLWEIGHT.release();
            }
        }
        if (mediumPlatesNeeded > 0) {
            for (int m = 0; m < mediumPlatesNeeded; m++) {
                Gym.MEDIUMWEIGHT.release();
            }
        }
        if (largePlatesNeeded > 0) {
            for (int n = 0; n < largePlatesNeeded; n++) {
                Gym.LARGEWEIGHT.release();
            }
        }
        System.out.println("Client has successfully returned weights");
    }

    //execute exercise process
    @Override
    public void run() {
        // Execute each exercise in client's routine
        for (int i = 0; i < routine.size(); i++) {
            System.out.println("Client " + id + " is now doing exercise number " + i);
            exerciseInGym(id, routine.get(i));
            System.out.println("Client " + id + " is now finished doing exercise number " + i);

        }
    }
}
