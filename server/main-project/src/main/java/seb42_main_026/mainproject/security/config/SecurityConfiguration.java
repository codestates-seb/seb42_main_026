package seb42_main_026.mainproject.security.config;


import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import seb42_main_026.mainproject.domain.member.repository.MemberRepository;
import seb42_main_026.mainproject.domain.member.repository.RefreshRepository;
import seb42_main_026.mainproject.security.Oauth2.CustomOAuth2UserService;
import seb42_main_026.mainproject.security.Oauth2.OAuth2MemberFailureHandler;
import seb42_main_026.mainproject.security.Oauth2.OAuth2MemberSuccessHandler;
import seb42_main_026.mainproject.security.filter.JwtAuthenticationFilter;
import seb42_main_026.mainproject.security.filter.JwtVerificationFilter;
import seb42_main_026.mainproject.security.handler.MemberAccessDeniedHandler;
import seb42_main_026.mainproject.security.handler.MemberAuthenticationEntryPoint;
import seb42_main_026.mainproject.security.handler.MemberAuthenticationFailureHandler;
import seb42_main_026.mainproject.security.handler.MemberAuthenticationSuccessHandler;
import seb42_main_026.mainproject.security.jwt.JwtTokenizer;
import seb42_main_026.mainproject.security.utils.CustomAuthorityUtils;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
//@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {
    @Value("${spring.security.oauth2.client.registration.google.client-id}")
    private String googleClientId;
    @Value("${spring.security.oauth2.client.registration.google.client-secret}")
    private String googleClientSecret;

    @Value("${spring.security.oauth2.client.registration.naver.client-id}")
    private String naverClientId;
    @Value("${spring.security.oauth2.client.registration.naver.client-secret}")
    private String naverClientSecret;

    @Value("${spring.security.oauth2.client.registration.kakao.client-id}")
    private String kakaoClientId;
    @Value("${spring.security.oauth2.client.registration.kakao.client-secret}")
    private String kakaoClientSecret;


    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    private final CustomOAuth2UserService customOAuth2UserService;

    private final RefreshRepository refreshRepository;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable()
                .cors(withDefaults())
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling()
                .authenticationEntryPoint(new MemberAuthenticationEntryPoint())
                .accessDeniedHandler(new MemberAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer())
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/signUp").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/members/nickname").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/members/profileImage").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/members/password").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/members").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/home/rank").permitAll()
                        .antMatchers(HttpMethod.DELETE, "/members").hasRole("USER")
                        .antMatchers(HttpMethod.POST, "/questions").hasRole("USER")
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                        .antMatchers(HttpMethod.GET, "/home/questions").permitAll()
                        .antMatchers(HttpMethod.GET, "/board/questions").permitAll()
                        .antMatchers(HttpMethod.GET, "/members/questions").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasRole("USER")
                        .anyRequest().permitAll()

                )
                .oauth2Login()
                    .userInfoEndpoint()
                        .userService(customOAuth2UserService)
                .and()
                .successHandler(new OAuth2MemberSuccessHandler(jwtTokenizer, authorityUtils, memberRepository))
                .failureHandler(new OAuth2MemberFailureHandler());

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Arrays.asList(
                "http://localhost:3000/",
                "http://seb42-main-026-fe.s3-website.ap-northeast-2.amazonaws.com/",
                "https://andanghae.com/"));

        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }


    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{
        @Override
        public void configure(HttpSecurity builder) throws Exception{

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer, memberRepository, refreshRepository );

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);

            builder
                    .addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
        }
    }

    @Bean
    public ClientRegistrationRepository clientRegistrationRepository(){
        var googleClientRegistration = clientRegistration();

        var naverClientRegistration = naverClientRegistration();

        var kakaoClientRegistration = kakaoClientRegistration();

        return new InMemoryClientRegistrationRepository(googleClientRegistration, naverClientRegistration, kakaoClientRegistration); // ClientRegistrationRepository 인터페이스의 구현 클래스인InMemoryClientRegistrationRepository의 인스턴스를 생성한다.
    }

    private ClientRegistration clientRegistration(){
        return ClientRegistration.withRegistrationId("google")
                .clientId(googleClientId)
                .clientSecret(googleClientSecret)
                .clientAuthenticationMethod(ClientAuthenticationMethod.CLIENT_SECRET_BASIC)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                .redirectUri("http://ppongmangchi.net:8080/login/oauth2/code/google") // 서버용
                //.redirectUri("http://localhost:8080/login/oauth2/code/google")
                .scope("profile", "email")
                .authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
                .tokenUri("https://www.googleapis.com/oauth2/v4/token")
                .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
                .userNameAttributeName(IdTokenClaimNames.SUB)
                .jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
                .clientName("Google")
                .build();

    }

    private ClientRegistration naverClientRegistration(){
        return ClientRegistration.withRegistrationId("naver")
                .clientId(naverClientId)
                .clientSecret(naverClientSecret)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                //.redirectUri("http://localhost:8080/login/oauth2/code/naver")        // 로컬용
                .redirectUri("http://ppongmangchi.net:8080/login/oauth2/code/naver")
                .scope("name", "email")
                .authorizationUri("https://nid.naver.com/oauth2.0/authorize")
                .tokenUri("https://nid.naver.com/oauth2.0/token")
                .userInfoUri("https://openapi.naver.com/v1/nid/me")
                .userNameAttributeName("response")
                .clientName("Naver")
                .build();
    }

    private ClientRegistration kakaoClientRegistration(){
        return ClientRegistration.withRegistrationId("kakao")
                .clientId(kakaoClientId)
                .clientSecret(kakaoClientSecret)
                .clientAuthenticationMethod(ClientAuthenticationMethod.POST)
                .authorizationGrantType(AuthorizationGrantType.AUTHORIZATION_CODE)
                //.redirectUri("http://localhost:8080/login/oauth2/code/kakao")        // 로컬용
                .redirectUri("http://ppongmangchi.net:8080/login/oauth2/code/naver") // 도메인
                .scope("profile_nickname", "account_email")
                .authorizationUri("https://kauth.kakao.com/oauth/authorize")
                .tokenUri("https://kauth.kakao.com/oauth/token")
                .userInfoUri("https://kapi.kakao.com/v2/user/me")
                .userNameAttributeName("id")
                .clientName("Kakao")
                .build();
    }






}
