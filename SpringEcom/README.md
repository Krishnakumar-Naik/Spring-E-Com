# SpringEcom Backend

This folder contains the backend service for the Spring E-commerce application.

## Overview

- Java 21
- Spring Boot 4
- Spring Web MVC
- Spring Data JPA
- PostgreSQL

## Prerequisites

- Java 21 or later
- Maven or the included Maven wrapper
- PostgreSQL running on `localhost:5432`

## Configuration


Update the database settings as needed for your local environment, especially:

- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`

## Run the application

From this folder, run:

```bash
./mvnw spring-boot:run
```

On Windows PowerShell:

```powershell
./mvnw.cmd spring-boot:run
```

## Build

```bash
./mvnw clean package
```

## Project structure

```text
src/
  main/
    java/
    resources/
  test/
```

## Notes

This backend is designed to serve the e-commerce APIs and connect to PostgreSQL for persistence.
