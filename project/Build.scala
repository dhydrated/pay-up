import sbt._
import Keys._
import play.Project._

object ApplicationBuild extends Build {

    val appName         = "pay-up"
    val appVersion      = "1.0"

    val appDependencies = Seq(
      javaCore,
      javaJdbc,
      javaEbean,
      // Add your project dependencies here,
      "postgresql" % "postgresql" % "9.1-901.jdbc4",
      "commons-io" % "commons-io" % "2.0.1"
    )

	val main = play.Project(appName, appVersion, appDependencies).settings(
      // Add your own project settings here      
    )

}
            
