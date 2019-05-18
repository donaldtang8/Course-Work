############################################## ###
#  Company    : Stevens 
#  Project    : HW 4
#  Purpose    : external data
#  First Name : Donald
#  Last Name  : Tang
#  Id			    : 10410463
#  Date       :
#  Comments   : I pledge my honor I have abided by the Stevens Honor System.

rm(list=ls())
##       read.csv   ####
?read.csv()

BCW<-
  read.csv("data/breast-cancer-wisconsin.csv")
View(BCW)

# Remove the rows with missing values
BCWFrame <- BCW[!(BCW$F6=='?'),]
View(BCWFrame)

##1st way
#	Store every fifth record in a "test" dataset starting with the first record
##test <- BCWFrame[seq(from=1, to=nrow(BCWFrame), by=5),]
# Store the rest in the "training" dataset
##training <- BCWFrame[-seq(from=1, to=nrow(BCWFrame), by=5),]

##2nd way
index <- seq(1, nrow(BCWFrame), by=5)
test <- BCWFrame[index,]
training <- BCWFrame[-index,]

library(class)

# Use knn with k=1 and classify the test dataset
predict <- knn(train = training, test = test, cl = training[,11], k=1)

# Repeat the above steps with k=2, k=5, k=10

# k = 2
predict <- knn(train = training, test = test, cl = training[,11], k=2)

# k = 5
predict <- knn(train = training, test = test, cl = training[,11], k=5)

# k = 10
predict <- knn(train = training, test = test, cl = training[,11], k=10)