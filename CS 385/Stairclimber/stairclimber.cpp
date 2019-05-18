/*******************************************************************************
 * Name        : stairclimber.cpp
 * Author      :  Donald Tang
 * Date        :  2/20/17
 * Description : Lists the number of ways to climb n stairs.
 * Pledge      : I pledge my honor I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <vector>
#include <algorithm>
#include <sstream>
#include <iomanip>

using namespace std;

vector<int> way;
vector< vector<int> > result;

vector< vector<int> > get_ways(int num_stairs) {
    // TODO: Return a vector of vectors of ints representing
    // the different combinations of ways to climb num_stairs
    // stairs, moving up either 1, 2, or 3 stairs at a time.

	//base case, reached last+
	if (num_stairs <= 0) {
		result.push_back(way);
	} else {
		for (int i=1; i<4; i++) {
			if (num_stairs>=i) {
				//if more stairs to climb, climb stair add solution and do recursion after a new step is climbed
				way.push_back(i);
				get_ways(num_stairs-i);
				//remove extra element after getting solution from recursion
				way.pop_back();
			}
		}
	}
	return result;

	/*if (num_stairs <= 0) {
		ways.push_back([]);
	} else {
		for (int i=1; i<4; i++) {
			if (num_stairs >= i) {
				result.push_back(num_stairs-i);
				for (int j=0; j<result.size()-1; j++) {
					result[j].push_back(i);
				}
				ways+=result;
			}
		}
	}
	return ways;*/

	//pseudocode
	/*function getways(num_stairs)
	{
		ways = []
				if num_stairs <= 0
					ways.append([])
				else
					for i <- 1 to 3
						if num_stairs >= i
							result <- get_ways(num_stairs -i)
							for (j <-0 to length(result) -1)
									result[j].append(i)
							ways+=result

				return ways
	}*/

}

void display_ways(const vector< vector<int> > &ways) {
    // TODO: Display the ways to climb stairs by iterating over
    // the vector of vectors and printing each combination.

	//loop through outer solution
	for (unsigned int i=0; i<ways.size(); i++) {
		//if more than 10 solutions set to highest label
		if (ways.size() >= 10){
			cout << setw(2) << i+1 << ". " << "[";
		}
		//else set width to first
		else {
			cout << setw(1) << i+1 << ". " << "[";
		}
		//loop through nested solutions
		for (unsigned int j=0; j<ways[i].size(); j++) {
			if (j==ways[i].size()-1) {
				cout << ways[i][j];
			} else {
				cout << ways[i][j] << ", ";
			}
		}
		cout << "]" << endl;
	}
}

int main(int argc, char * const argv[]) {
	int num;
	istringstream iss;

	//if no argument or too much argument
	if(argc != 2){
		cerr << "Usage: " << argv[0] << " <number of stairs>" << endl;
		return 1;
	}
	iss.str(argv[1]);
	//if argument is not an int
	if(!(iss >> num)){
		cerr << "Error: Number of stairs must be a positive integer." << endl;
		return 1;
	}
	//if num is not positive
	if(num <= 0){
		cerr << "Error: Number of stairs must be a positive integer." << endl;
		return 1;
	}
	iss >> num;
	vector< vector<int> > resultWays = get_ways(num);
	int amount = resultWays.size();
	//display num ways
	if(num == 1){
		cout << "1 way to climb 1 stair." << endl;
	} else {
		cout << amount << " ways to climb " << num << " stairs." << endl;
	}
	//display the solutions
	display_ways(resultWays);

}
