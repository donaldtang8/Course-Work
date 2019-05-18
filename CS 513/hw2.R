############################################## ###
#  Company    : Stevens 
#  Project    : HW 2
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
##      read.csv file
##      min, max, mean
##      Identify missing values
##      Replace missing values with "mean" of column
##      Display frequency table of "Class" vs. F6
##      Scatter Plot of F1 to F6, one pair at a time
##      Show histogram box plot for columns F7 to F9
##
################### ###

##       read.csv   ####
?read.csv()


BCW<-
  read.csv("data/breast-cancer-wisconsin.csv")
View(BCW)
is.data.frame(BCW)
# colMean1 <- colMeans(BCW[c('F1', 'F2', 'F3', 'F4', 'F5')], na.rm=TRUE)
# colMean2 <- as.numeric(as.character(BCW$F6))
# mean(colMean2, na.rm=TRUE)
# colMean3 <- as.numeric(as.character(BCW$F7))
# mean(colMean3, na.rm=TRUE)
# colMean4 <- as.numeric(as.character(BCW$F8))
# mean(colMean4, na.rm=TRUE)
# colMean5 <- as.numeric(as.character(BCW$F9))
# mean(colMean5, na.rm=TRUE)

#set up dataframe
BCWFrame = data.frame(Sample=BCW$Sample, 
                      F1=BCW$F1, 
                      F2=BCW$F2, 
                      F3=BCW$F3,
                      F4=BCW$F4,
                      F5=BCW$F5,
                      F6=BCW$F6,
                      F7=BCW$F7,
                      F8=BCW$F8,
                      F9=BCW$F9,
                      Class=BCW$Class)
View(BCWFrame)

#1 - Each column - min, max, mean
  
  #col1
  min(BCW$F1)
  max(BCW$F1)
  mean(BCW$F1, na.rm=TRUE)
  
  #col2
  min(BCW$F2)
  max(BCW$F2)
  mean(BCW$F2, na.rm=TRUE)
  
  #col3
  min(BCW$F3)
  max(BCW$F3)
  mean(BCW$F3, na.rm=TRUE)
  
  #col4
  min(BCW$F4)
  max(BCW$F4)
  mean(BCW$F4, na.rm=TRUE)
  
  #col5
  min(BCW$F5)
  max(BCW$F5)
  mean(BCW$F5, na.rm=TRUE)
  
  #col6
  col6 <- as.numeric(as.character(BCW$F6))
  min(col6, na.rm=TRUE)
  max(col6, na.rm=TRUE)
  mean6 = mean(col6, na.rm=TRUE)
  
  #col7
  col7 <- as.numeric(as.character(BCW$F7))
  min(col7, na.rm=TRUE)
  max(col7, na.rm=TRUE)
  mean7 = mean(col7, na.rm=TRUE)
  
  #col8
  col8 <- as.numeric(as.character(BCW$F8))
  min(col8, na.rm=TRUE)
  max(col8, na.rm=TRUE)
  mean8 = mean(col8, na.rm=TRUE)
  
  #col9
  col9 <- as.numeric(as.character(BCW$F9))
  min(col9, na.rm=TRUE)
  max(col9, na.rm=TRUE)
  mean9 = mean(col9, na.rm=TRUE)
  

#3 - Replace missing values with mean of column
  
  #F6
  for(i in seq(from=1, to=length(BCWFrame$F6), by=1)){
    if(is.na(as.numeric(as.character(BCWFrame$F6[i]))))
      BCWFrame$F6[i] <- mean6;
  }
  
  #F7
  for(i in seq(from=1, to=length(BCWFrame$F7), by=1)){
    if(is.na(as.numeric(as.character(BCWFrame$F7[i]))))
      BCWFrame$F7[i] <- mean7;
  }
  
  #F8
  for(i in seq(from=1, to=length(BCWFrame$F8), by=1)){
    if(is.na(as.numeric(as.character(BCWFrame$F8[i]))))
      BCWFrame$F8[i] <- mean8;
  }
  
  #F9
  for(i in seq(from=1, to=length(BCWFrame$F9), by=1)){
    if(is.na(as.numeric(as.character(BCWFrame$F9[i]))))
      BCWFrame$F9[i] <- mean9;
  }
  
#4 - Create a frequency table of class vs F6
  table(Class = BCWFrame$Class, F6 = BCWFrame$F6)
  
#5 - Create a scatterplot for F1 To F6, one pair at a time
  
  #F1 and F2
  plot(x=BCWFrame$F1,y=BCWFrame$F2,
       xlab = "F1",
       ylab = "F2",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F1 & F2"
  )
  
  #F1 and F3
  plot(x=BCWFrame$F1,y=BCWFrame$F3,
       xlab = "F1",
       ylab = "F3",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F1 & F3"
  )
  
  #F1 and F4
  plot(x=BCWFrame$F1,y=BCWFrame$F4,
       xlab = "F1",
       ylab = "F4",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F1 & F4"
  )
  
  #F1 and F5
  plot(x=BCWFrame$F1,y=BCWFrame$F5,
       xlab = "F1",
       ylab = "F5",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F1 & F5"
  )
  
  #F1 and F6
  plot(x=BCWFrame$F1,y=BCWFrame$F6,
       xlab = "F1",
       ylab = "F6",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F1 & F6"
  )
  
  #F2 and F3
  plot(x=BCWFrame$F2,y=BCWFrame$F3,
       xlab = "F2",
       ylab = "F3",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F2 & F3"
  )
  
  #F2 and F4
  plot(x=BCWFrame$F2,y=BCWFrame$F4,
       xlab = "F2",
       ylab = "F3",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F2 & F3"
  )
  
  #F2 and F5
  plot(x=BCWFrame$F2,y=BCWFrame$F5,
       xlab = "F2",
       ylab = "F5",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F2 & F5"
  )
  
  #F2 and F6
  plot(x=BCWFrame$F2,y=BCWFrame$F6,
       xlab = "F2",
       ylab = "F6",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F2 & F6"
  )
  
  #F3 and F4
  plot(x=BCWFrame$F3,y=BCWFrame$F4,
       xlab = "F3",
       ylab = "F4",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F3 & F4"
  )
  
  #F3 and F5
  plot(x=BCWFrame$F3,y=BCWFrame$F5,
       xlab = "F3",
       ylab = "F5",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F3 & F5"
  )
  
  #F3 and F6
  plot(x=BCWFrame$F3,y=BCWFrame$F6,
       xlab = "F3",
       ylab = "F6",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F3 & F6"
  )
  
  #F4 and F5
  plot(x=BCWFrame$F4,y=BCWFrame$F5,
       xlab = "F4",
       ylab = "F5",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F4 & F5"
  )
  
  #F4 and F6
  plot(x=BCWFrame$F4,y=BCWFrame$F6,
       xlab = "F4",
       ylab = "F6",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F4 & F6"
  )
  
  #F5 and F6
  plot(x=BCWFrame$F5,y=BCWFrame$F6,
       xlab = "F5",
       ylab = "F6",
       xlim = c(1,10),
       ylim = c(1,10),		 
       main = "F5 & F6"
  )

#6
  
  #F7
  boxplot(BCWFrame$F7, horizontal=TRUE,  outline=TRUE,ylim=c(1,10), frame=F, col = "green1")
  hist(BCWFrame$F7, xlim=c(1,10), col = "blue")
  
  #F8
  boxplot(BCWFrame$F8, horizontal=TRUE,  outline=TRUE,ylim=c(1,10), frame=F, col = "green1")
  hist(BCWFrame$F8, xlim=c(1,10), col = "blue")
  
  #F9
  boxplot(BCWFrame$F9, horizontal=TRUE,  outline=TRUE,ylim=c(1,10), frame=F, col = "green1")
  hist(BCWFrame$F9, xlim=c(1,10), col = "blue")

