@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script, Windows
@REM ----------------------------------------------------------------------------
@echo off
setlocal

set "MAVEN_PROJECTBASEDIR=%~dp0"
if "%MAVEN_PROJECTBASEDIR:~-1%"=="\" set "MAVEN_PROJECTBASEDIR=%MAVEN_PROJECTBASEDIR:~0,-1%"

set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
set "WRAPPER_PROPERTIES=%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.properties"

if exist "%WRAPPER_JAR%" goto runWrapper

echo Maven Wrapper JAR not found: %WRAPPER_JAR%
echo Make sure .mvn\wrapper\maven-wrapper.jar is present.
exit /b 1

:runWrapper
java -classpath "%WRAPPER_JAR%" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%" org.apache.maven.wrapper.MavenWrapperMain %*
