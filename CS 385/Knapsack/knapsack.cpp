/*******************************************************************************
 * Name        : knapsack.cpp
 * Author      : Donald Tang
 * Version     : 1.0
 * Date        : 4/29/17
 * Description : Returns the maximum value of items based on capacity of the items stored in knapsack.
 * Pledge      : I pledge my honor I have abided by the Stevens Honor System.
 ******************************************************************************/
#include <iostream>
#include <algorithm>
#include <sstream>
#include <vector>
#include <cstdio>
#include <cctype>
#include <cstring>
#include <fstream>
#include <stack>

using namespace std;

struct Item {
	unsigned int item_number, weight, value;
	string description;

	explicit Item(const unsigned int item_number,
				const unsigned int weight,
				const unsigned int value,
				const string &description) :
                          item_number(item_number),
                          weight(weight),
                          value(value),
                          description(description) { }

	friend std::ostream& operator<<(std::ostream& os, const Item &item) {
		os << "Item " << item.item_number << ": " << item.description
			<< " (" << item.weight
			<< (item.weight == 1 ? " pound" : " pounds") << ", $"
			<< item.value << ")";
		os.flush();
		return os;
	}
};

//int knapsack(int item, int cap, vector <vector <int> > &sack, int Weights[], int Values[], int value) {
//	if (item < 0) {
//		return 0;
//	}
//	if (sack[item][cap] < 0) {
//		if (cap < Weights[item]) {
//			value = knapsack(item-1, cap, sack, Weights, Values, value);
//		} else {
//			value = max(knapsack(item-1, cap, sack, Weights, Values, value), Values[item] + knapsack(item-1, cap-Weights[item], sack, Weights, Values, value));
//		}
//		sack[item][cap] = value;
//	}
//	return sack[item][cap];
//}

vector <Item> itemList;

int knapsack(int items, int cap, int **sack){
	int i = sack[items][cap];
	int weighto = itemList[items - 1].weight;
	int valueo = itemList[items - 1].value;

	if (sack[items][cap] < 0){
		if (cap < weighto){
			i = knapsack(items - 1,cap, sack);
		}
		else {
			i = max(knapsack(items - 1,cap,sack), valueo +
					knapsack(items - 1,cap - weighto ,sack));
		}
		sack[items][cap] = i;
	}

	return i;
}

void backtrack(int x, int y, int **sack, stack<int> &posres){
	if (x <= 0 || y <= 0) {
		return;
	}

	if (sack[x][y] > sack[x - 1][y]) {
		posres.push(x - 1);
		backtrack(x - 1 , y - itemList[x - 1].weight, sack, posres);
	} else if (sack[x][y] == sack[x - 1][y]) {
		backtrack(x - 1, y, sack, posres);
	}
}

int main(int argc, const char *argv[]) {
    if (argc != 3) {
        cerr << "Usage: " << argv[0] << " <capacity> <filename>" << endl;
        return 1;
    }
    int capacity;
    istringstream iss(argv[1]);
    if (!(iss >> capacity) || (capacity < 0) ) {
        cerr << "Error: Bad value '" << argv[1] << "' for capacity." << endl;
        return 1;
    }
    iss.clear();
    fstream myFile(argv[2]);
    if (!myFile.is_open()) {
    	cerr << "Error: Cannot open file '" << argv[2] << "'." << endl;
    	return 1;
    }

	string line;
	int linecount = 0;

	while (myFile){
		string line;
		linecount++;
		int value;
		int weight;
		int inputcounter = 0;

		if (!getline(myFile,line)) {
			break;
		}

		istringstream ss(line);
		vector<string> currline;

		while (ss){
			string separator;

			if(!getline(ss,separator,',')) {
				break;
			}
			currline.push_back(separator);
			inputcounter++;
		}
		if(inputcounter != 3) {
			cerr << "Error: Line number "<< linecount <<" does not contain 3 fields." << endl;
			return 1;
		}

		if((!(istringstream(currline[1]) >> weight)) || (weight <= 0)) {
			cerr << "Error: Invalid weight '" << currline[1] <<"' on line number "<< linecount <<"." << endl;
			return 1;
		}
		if((!(istringstream(currline[2]) >> value)) || (value < 0)) {
			cerr << "Error: Invalid value '" << currline[2] <<"' on line number "<< linecount <<"." << endl;
			return 1;

		}
		itemList.push_back(Item(linecount, weight, value, currline[0]));
	}

	int **sack = new int*[linecount];

	for (int i = 0; i < linecount; i++) {
	  sack[i] = new int[capacity + 1];
	  for (int j = 1 ; j < capacity + 1; j++) {
		sack[i][j] = -1;
	  }
	}
	//set top and left column to 0
	for (int i = 0; i < linecount; i++) {
		sack[i][0] = 0;
	}
	for (int i = 1; i < capacity + 1; i++) {
		sack[0][i] = 0;
	}

	int currWeight = 0;
	int currValue = 0;
	stack<int> res;
	knapsack(linecount - 1, capacity, sack);
	backtrack(linecount - 1, capacity, sack, res);

	cout << "Candidate items to place in knapsack:" << endl;

	//print all possible items
	for (int i = 0 ; i < linecount - 1; i++){
		cout << "   " << itemList[i] << endl;
	}
	//base case 1
	if(capacity == 1) {
		cout << "Capacity: 1 pound" << endl;
		cout << "Items to place in knapsack:" << (res.empty() ? " None":"") << endl;
	} else {
		cout << "Capacity: "<< capacity << " pounds" << endl;
		cout << "Items to place in knapsack:" << (res.empty() ? " None":"") << endl;
	}

	//while results existing
	while(!res.empty()) {
		Item &currPath = itemList[res.top()];
		currWeight += currPath.weight;
		currValue += currPath.value;
		cout << "   " << currPath << endl;
		res.pop();
	}

	if(currWeight == 1) {
		cout << "Total weight: 1 pound" << endl;
		cout << "Total value : $" << currValue << endl;
	} else {
		cout << "Total weight: " << currWeight << " pounds"<< endl;
		cout << "Total value : $" << currValue << endl;
	}
	//remove sack off the heap
	delete[] sack;
	return 0;
}

