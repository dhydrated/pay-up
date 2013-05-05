import sbt._
import Keys._
import PlayProject._

object ApplicationBuild extends Build {

    val appName         = "pay-up"
    val appVersion      = "1.0"

    val appDependencies = Seq(
      javaCore,
      javaJdbc,
      javaEbean,
      // Add your project dependencies here,
      "postgresql" % "postgresql" % "8.2-504.jdbc4"
    )

    val main = PlayProject(appName, appVersion, appDependencies, mainLang = JAVA).settings(
      // Add your own project settings here      
    )

}
            
