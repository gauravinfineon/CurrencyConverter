package com.example.currencyconverter;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Allow requests from the React frontend running on port 3000
        registry.addMapping("/**")                // Allow all endpoints in the backend
                .allowedOrigins("http://localhost:3000")  // Allow the React app's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Allow these HTTP methods
                .allowedHeaders("*")             // Allow all headers
                .allowCredentials(true);         // Allow credentials (optional)
    }
}
