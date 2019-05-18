/*

Names: Donald Tang, Wenkang Su
Pledge: I pledge my honor I have abided by the Stevens Honor System.

*/

import java.util.*;
import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class PrimeFinder implements Runnable {
    private Integer start;
    private Integer end;
    private List<Integer> primes;

    public PrimeFinder (Integer startNum, Integer endNum) {
        // Constructs a PrimeFinder
        this.start = startNum;
        this.end = endNum;
        this.primes = new ArrayList<Integer>();
    }

    public List<Integer> getPrimesList() {
        // Returns the value of the attribute primes
        return this.primes;
    }

    public Boolean isPrime(int s) {
        // Determines whether its argument is prime or not
        boolean isPrime = false;
        //negative, zero, or one is not a prime number, return false;
        if (s <= 1) {
            return isPrime;
        }
        //loop from 2 (lowest prime number) up to s, if s is divisible by any number it is not a prime number, return false
        for (int i = 2; i < s; i++) {
            if (s%i == 0) {
                return isPrime;
            }
        }
        //if s is not divisible by any number other than 1 and itself, then it is a prime number, return true
        isPrime = true;
        return isPrime;
    }

    public void run() {
        // Adds all primes in [ this . start , this . end ) to the attribute primes
        //loop through range of interval, check each number in range if it is prime, if so, add to respective interval's prime list
        for (int i = this.start; i < this.end; i++) {
            if (isPrime(i)) {
                this.primes.add(i);
            }
        }
    }

}
