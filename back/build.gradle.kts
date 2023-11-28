import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("java")
    id("org.springframework.boot") version "3.1.4"
    id("io.spring.dependency-management") version "1.1.3"
    kotlin("jvm") version "1.8.22"
    kotlin("plugin.spring") version "1.8.22"
    kotlin("plugin.jpa") version "1.8.22"
    kotlin("kapt") version "1.3.72"
    id("org.liquibase.gradle") version "2.0.4"
}

group = "org.sejapoe"
version = "0.0.1-SNAPSHOT"

java {
    sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
    mavenCentral()
}

dependencies {
    // kotlin
    implementation("org.jetbrains.kotlin:kotlin-reflect")

    // spring boot
    ext["spring-security.version"] = "6.1.5"
    implementation("org.springframework.boot:spring-boot-starter")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-mail")
    testImplementation("org.springframework.boot:spring-boot-starter-test")

    // db
    runtimeOnly("org.postgresql:postgresql")
    runtimeOnly("com.h2database:h2")
    implementation("org.hibernate.validator:hibernate-validator:8.0.0.Final")

    // jackson
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")

    // jwt
    implementation("io.jsonwebtoken:jjwt:0.9.1")

    // openapi docs
    implementation("org.springdoc:springdoc-openapi-starter-webmvc-ui:2.1.0")
    implementation("javax.xml.bind:jaxb-api:2.3.1")

    // apache commons
    implementation("commons-io:commons-io:2.11.0")

    // mapstruct
    implementation("org.mapstruct:mapstruct:1.5.5.Final")
    kapt("org.mapstruct:mapstruct-processor:1.5.5.Final")

    // query dsl
    implementation("com.querydsl:querydsl-jpa:5.0.0:jakarta")
    kapt("com.querydsl:querydsl-apt:5.0.0:jakarta")

    // liquibase
    implementation("org.liquibase:liquibase-core:4.24.0")
}

kapt {
    javacOptions {
        option("querydsl.entityAccessors", true)
    }
    arguments {
        arg("plugin", "com.querydsl.apt.jpa.JPAAnnotationProcessor")
    }
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs += "-Xjsr305=strict"
        jvmTarget = "17"
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}
