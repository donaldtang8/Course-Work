#########################################################
##  Name: Donald Tang
##  Pledge: I pledge my honor I have abided by the Stevens Honor System.  
##
#########################################################

#########################################################
##  Step 0: Clear the environment and load the data
##           
##
#########################################################



rm(list=ls())

dsn<-
  read.csv("data/IBM_Employee_Attrition_V2.csv")

### remove all the records with missing value

dsn<-na.omit(dsn)

library('C50')
View(dsn)

index <- seq (1,nrow(dsn),by=5)
test<-dsn[index,]
training<-dsn[-index,]
?C5.0
mytree <- C5.0(factor(Attrition)~.,data=training)

summary(mytree)
dev.off()
plot(mytree)
prediction<-predict(mytree,test)
#table(actual=test[3,],prediction)
#wrong<- (test[3,]!=prediction)
#rate<-sum(wrong)/length(wrong)


