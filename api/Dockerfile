# ===== Stage 1: build =====
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# Copia só o pom primeiro para cachear as dependências
COPY pom.xml .
RUN mvn -B dependency:go-offline

# Copia o código e empacota o jar (sem rodar testes)
COPY src ./src
RUN mvn -B clean package -DskipTests

# ===== Stage 2: runtime =====
FROM eclipse-temurin:17-jre AS runtime
WORKDIR /app

# Copia apenas o jar executável gerado no stage de build
COPY --from=build /app/target/api-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
