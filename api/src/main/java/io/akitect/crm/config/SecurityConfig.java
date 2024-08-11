//package io.akitect.crm.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.oauth2.jwt.Jwt;
//import org.springframework.security.oauth2.jwt.JwtDecoder;
//import org.springframework.security.oauth2.jwt.JwtTimestampValidator;
//import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
//import org.springframework.security.oauth2.jwt.JwtValidators;
//import org.springframework.security.oauth2.core.OAuth2TokenValidator;
//import org.springframework.security.oauth2.core.OAuth2TokenValidatorResult;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
//
//
//@EnableWebSecurity
//@Configuration
//public class SecurityConfig {
//
//    @Value("${spring.security.oauth2.resourceserver.jwt.jwk-set-uri}")
//    private  String JWK_SET_URI;
//
//    @Value("${spring.security.oauth2.resourceserver.jwt.issuer-uri}")
//    private  String ISSUER_URI;
//
//    @Bean
//    public JwtDecoder jwtDecoder() {
//        NimbusJwtDecoder jwtDecoder = NimbusJwtDecoder.withJwkSetUri(JWK_SET_URI).build();
//
//        OAuth2TokenValidator<Jwt> withIssuer = JwtValidators.createDefaultWithIssuer(ISSUER_URI);
//        OAuth2TokenValidator<Jwt> withTimestamp = new JwtTimestampValidator();
//        OAuth2TokenValidator<Jwt> validator = jwt -> {
//            // Tùy chỉnh thêm các kiểm tra bổ sung tại đây
//            return OAuth2TokenValidatorResult.success();
//        };
//
//        jwtDecoder.setJwtValidator(jwt -> {
//            OAuth2TokenValidatorResult result = withIssuer.validate(jwt);
//            if (result.hasErrors()) {
//                return result;
//            }
//            result = withTimestamp.validate(jwt);
//            if (result.hasErrors()) {
//                return result;
//            }
//            return validator.validate(jwt);
//        });
//
//        return jwtDecoder;
//    }
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(AbstractHttpConfigurer::disable)
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/hello").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .oauth2ResourceServer(oauth2 -> oauth2
//                        .jwt(jwt -> jwt.decoder(jwtDecoder()))
//                );
//        return http.build();
//    }
//}
