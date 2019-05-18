############################################## ###
#  Company    : Stevens 
#  Project    : HW 3
#  Purpose    : external data
#  First Name : Donald
#  Last Name  : Tang
#  Id			    : 10410463
#  Date       :
#  Comments   : I pledge my honor I have abided by the Stevens Honor System.

rm(list=ls())
############################################## ###
##   Step:
## 
##      load data into R
##      create test by choosing random sample of 25% from dataset
##      create training dataset from remaining records
##
##
##
##
################### ###

BCW<-
  read.csv("data/breast-cancer-wisconsin.data.csv")
View(BCW)
is.data.frame(BCW)
index <- sample(1:nrow(BCW), nrow(BCW)/4)
test <- BCW[index,]
training <- BCW[-index,]




