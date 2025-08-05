package com.aptibattle;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@SpringBootApplication
@EnableWebSocket
@EnableAsync
public class AptiBattleApplication {

    public static void main(String[] args) {
        SpringApplication.run(AptiBattleApplication.class, args);
    }
}