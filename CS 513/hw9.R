#################################################
#  Name       : Donald Tang
#  Purpose    : HW 9
#  Comments   : I pledge my honor I have abided by the Stevens Honor System.


rm(list=ls())

filename<-file.choose() 
dsn<-  read.csv(filename)
dsn2<-na.omit(dsn)

norm <-function(x,minx,maxx) {z<-((x-minx)/(maxx-minx))
return(z) 
}

norm(5,0,10)
x<-0:10
norm(x,min(x),max(x))

dsn2_normalized<-as.data.frame (         
  cbind( TotalWorkingYears=norm(dsn2[,13],min(dsn2[,13]),max(dsn2[,13]))
         ,Education=norm(dsn2[,5],min(dsn2[,5]),max(dsn2[,5]))
         ,Gender=ifelse(dsn2$Gender=="Male",0,1)
         ,Attrition=factor(dsn2[,2])
  )
)

dsn2_normalized_dist<-dist(dsn2_normalized[,c(-4)])
hclust_resutls<-hclust(dsn2_normalized_dist,method ="average" )
hclust_2<-cutree(hclust_resutls,2)
table(Hclust=hclust_2,Actual=dsn2_normalized[,4])

?kmeans

kmeans_2<- kmeans(dsn2_normalized[,c(-4)],2,nstart = 10)
str(kmeans_2)
kmeans_2$cluster
table(kmeans_2$cluster,dsn2_normalized[,4])



