FROM openjdk:17-jdk-alpine
ARG JAR_FILE=SpringAPI-0.0.1.jar
COPY ./target/${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
