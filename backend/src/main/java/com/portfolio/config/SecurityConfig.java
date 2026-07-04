package com.portfolio.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;
    private final CorsConfig corsConfig;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(AbstractHttpConfigurer::disable)

                .cors(cors ->
                        cors.configurationSource(corsConfig.corsConfigurationSource())
                )

                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                .authorizeHttpRequests(auth -> auth

                        // OPTIONS
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Root
                        .requestMatchers("/", "/index.html", "/favicon.ico").permitAll()

                        // Public APIs
                        .requestMatchers("/api/v1/auth/**").permitAll()
                        .requestMatchers("/api/v1/profile").permitAll()
                        .requestMatchers("/api/v1/skills").permitAll()
                        .requestMatchers("/api/v1/projects").permitAll()
                        .requestMatchers("/api/v1/experience").permitAll()
                        .requestMatchers("/api/v1/contact").permitAll()
                        .requestMatchers("/api/v1/views").permitAll()
                        .requestMatchers("/api/v1/views/increment").permitAll()
                        .requestMatchers("/api/v1/resume/download").permitAll()
                        .requestMatchers("/api/v1/resume/exists").permitAll()
                        .requestMatchers("/api/v1/test/**").permitAll()

                        // Admin
                        .requestMatchers("/api/v1/admin/**").authenticated()

                        // Everything else
                        .anyRequest().authenticated()
                )

                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}