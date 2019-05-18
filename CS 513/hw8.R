#  First Name      : Donald
#  Last Name       : Tang
#  Id              : 10410463
#  purpose         : HW8

remove(list=ls())

EA<-
  read.csv("data/IBM_Employee_Attrition_V2.csv",
           na.strings = "?")

View(EA)

### perform EDS

summary(EA)
?apply


### remove all the records with missing value
### see mfv and median for other strategies
?na.omit()
EA<-na.omit(EA)

index <- seq (1,nrow(EA),by=5)
test<-EA[index,]
training<-EA[-index,]
View(training)

install.packages("neuralnet")
library("neuralnet")
?neuralnet()
class(training$Attrition)
m <- model.matrix(~Attrition+Age+BusinessTravel+DistanceFromHome+Education+EnvironmentSatisfaction+Gender+MaritalStatus+MonthlyIncome+NumCompaniesWorked+OverTime+TotalWorkingYears,
  data = training)
head(m)
library(neuralnet)
net_EA <- neuralnet(AttritionYes~Age+BusinessTravelTravel_Frequently+BusinessTravelTravel_Rarely+DistanceFromHome+Education+EnvironmentSatisfaction+GenderMale+MaritalStatusMarried+MaritalStatusSingle+MonthlyIncome
               +NumCompaniesWorked+OverTimeYes+TotalWorkingYears,data=m, hidden=5, threshold=0.01)

n <- model.matrix(~Age+BusinessTravel+DistanceFromHome+Education+EnvironmentSatisfaction+Gender+MaritalStatus+MonthlyIncome+NumCompaniesWorked+OverTime+TotalWorkingYears,
                     data = test)

#Plot the neural network
plot(net_EA)

net_EA_results <-compute(net_EA, n[,-1])
ANN=as.numeric(net_EA_results$net.result)

ANN_round<-round(ANN)
ANN_cat<-ifelse(ANN<2.5,2,4)

table(Actual=test$Attrition,ANN_cat)

wrong<- (test$Attrition!=ANN_cat)
rate<-sum(wrong)/length(wrong)

