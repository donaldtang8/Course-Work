/*
Names: Donald Tang, Wenkang Su
Pledge: I pledge my honor I have abided by the Stevens Honor System.
*/

import java.util.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class AssignmentOne {

    public static List<Integer> lprimes(List<Integer[]> intervals) {
        //parameter: a list of integers
        //creates k threads where each thread i computes the list of primes in the ith interval in the list
        //returns: a list of primes
        List<Integer> primes = new ArrayList<Integer>();
        List<Thread> threads = new ArrayList<Thread>();
        List<PrimeFinder> pFinders = new ArrayList<PrimeFinder>();
        for (int i = 0; i < intervals.size(); i++) {
            //from documentation of threads in java
            //primefinder is a class that extends the runnable interface, that defines the run function utilized by the threads
            //runnable object (newpfinder) is then passed into the thread constructor, and can be started
            //each thread will then return all the primes within the interval it is assigned for
            PrimeFinder newPFinder = new PrimeFinder(intervals.get(i)[0], intervals.get(i)[1]);
            pFinders.add(newPFinder);
            Thread newThread = new Thread(newPFinder);
            newThread.start();
            threads.add(newThread);
        }
        //threads should now contain a list of threads that have executed the runnable object and has the prime numbers for its
        //assigned start-end range
        //according to java documentation of thread, we now need to join the threads which will allow one thread to wait for the
        //completion of another
        for (int j = 0; j < threads.size(); j++) {
            //joining threads may result in an interrupted exception error, so we must use a try/catch block to account for this
            try {
                threads.get(j).join();
            }
            catch (InterruptedException e) {
                System.err.println("Caught Interrupted Exception " + e.getMessage());
            }
        }
        //combine all prime numbers found in each primeFinder runnable object into primes list
        for (int k = 0; k < pFinders.size(); k++) {
            //use helper function in primeFinders class to add the entire list of primes in each primeFinder object into
            //the overall list of primes
            primes.addAll(pFinders.get(k).getPrimesList());
        }
        return primes;
    }

    public static void main(String args[]) {
        //checking if correct amount of arguments have been passed
        if(args.length == 0 || args.length < 2) {
            System.out.println("Error: Please input a list of at least 2 integers.");
            System.exit(1);
        }
        //create a new list of type integer array to pass into lprimes function
        List<Integer[]> intervals = new ArrayList<Integer[]>();
        //loop through numbers passed in argument, convert them to string, and check constraints if greater than 2
        //and in increasing order
        int j, k;
        for (int i = 0; i < args.length-1; i++) {
            j = Integer.parseInt(args[i]);
            k = Integer.parseInt(args[i+1]);
            //check if greater than 2
            if (j < 2) {
                System.out.println("Error: Please input integers greater than or equal to 2.");
                System.exit(1);
            }
            //if previous number is greater than the next, then the list of numbers is not in increasing order
            if (j > k) {
                System.out.println("Error: Please input integers in increasing order.");
                System.exit(1);
            }
            //if it passes check, then we list j and k as a pair and pass them into the list "intervals"
            Integer[] pair = new Integer[2];
            pair[0] = j;
            pair[1] = k;
            intervals.add(pair);
        }
        //test
        AssignmentOne test = new AssignmentOne();
        List<Integer> testPrimes = test.lprimes(intervals);
        System.out.println(testPrimes);
    }


}