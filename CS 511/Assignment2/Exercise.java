/*
    Names: Donald Tang, Wenkang Su
    Pledge: I pledge my honor I have abided by the Stevens Honor System.
 */

import java.util.*;
import java.io.*;

public class Exercise {
    private ApparatusType at;
    private Map<WeightPlateSize, Integer> weight;
    private int duration;


    public Exercise(ApparatusType at, Map<WeightPlateSize, Integer> weight, int duration) {
        this.at = at;
        this.weight = weight;
        this.duration = duration;
    }

    //generates random exercise for client using maximum number of plates from arguments
    public static Exercise generateRandom(Map<WeightPlateSize, Integer> weight) {
        Random random = new Random();
        //choose a random apparatus from list of enum ApparatusType for exercise
        ApparatusType apparatus = ApparatusType.values()[random.nextInt(ApparatusType.values().length)];
        //choose a random duration from 10 to 15 ms;
        int duration = random.nextInt(15-10) + 10;
        //create random exercise using random apparatus, given weight plates, and random duration
        Exercise newExercise = new Exercise(apparatus, weight, duration);
        return newExercise;
    }

    //returns apparatus needed to perform exercise
    public ApparatusType getApparatusForExercise() {
        return this.at;
    }

    //returns the amount of plates needed for respective exercise
    public Map<WeightPlateSize, Integer> getWeightsForExercise() {
        return this.weight;
    }

    //returns duration of time exercise will take to perform
    public int getDuration() { return this.duration; }

}
