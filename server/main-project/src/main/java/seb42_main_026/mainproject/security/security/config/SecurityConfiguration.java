package seb42_main_026.mainproject.security.security.config;


import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import seb42_main_026.mainproject.security.security.filter.JwtAuthenticationFilter;
import seb42_main_026.mainproject.security.security.filter.JwtVerificationFilter;
import seb42_main_026.mainproject.security.security.handler.MemberAuthenticationFailureHandler;
import seb42_main_026.mainproject.security.security.handler.MemberAuthenticationSuccessHandler;
import seb42_main_026.mainproject.security.security.jwt.JwtTokenizer;
import seb42_main_026.mainproject.security.security.utils.CustomAuthorityUtils;

import java.lang.reflect.Array;
import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity(debug = true)
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;



    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http
                .headers().frameOptions().sameOrigin() // h2 웹 콘솔을 정상적으로 사용할 수 있게 함. .frameOptions().sameOrigin() 을 호출하면 동일 출처로부터 들어오는 request만 페이지 렌더링을 허용한다.
                .and()
                .csrf().disable()  // CSRF(Cross-Site Request Forgery) 공격에 대한 Spring Security에 대한 설정을 비활성화합니다. 로컬에서 진행하므로 필요없다.
                .cors(withDefaults()) // cors(withDefaults()) 일 경우, corsConfigurationSource라는 이름으로 등록된 Bean을 이용한다. CORS를 처리하는 가장 쉬운 방법은 CorsFilter를 사용하는 것인데 CorsConfigurationSource Bean을 제공함으로써 CorsFilter를 적용할 수 있습니다.
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션을 생성하지 않도록 설정한다.
                .and()
                .formLogin().disable() // SSR(Server Side Rendering) 애플리케이션에서 주로 사용하는 폼 로그인 방식입니다. CSR(Client Side Rendering) 방식에서 주로 사용하는 JSON 포맷으로 Username과 Password를 전송하는 방식을 사용할 것이므로 (4)와 같이 폼 로그인 방식을 비활성화한다.
                .httpBasic().disable() // HTTP Basic 인증은 request를 전송할 때마다 Username/Password 정보를 HTTP Header에 실어서 인증을 하는 방식으로 우리 코스에서는 사용하지 않으므로 (5)와 같이 HTTP Basic 인증 방식을 비활성화합니다.
                .apply(new CustomFilterConfigurer()) //  Custom Configurer는 쉽게 말해서 Spring Security의 Configuration을 개발자 입맛에 맞게 정의할 수 있는 기능이다.
                .and()
                .authorizeHttpRequests(authorize -> authorize
                        .antMatchers(HttpMethod.POST, "/*/members").permitAll()
                        .antMatchers(HttpMethod.PATCH, "/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.GET, "/*/members").hasRole("USER") // 모든 회원 정보의 목록
                        //.antMatchers(HttpMethod.GET, "/*/members/**").hasAnyRole("USER", "ADMIN") // 특정 회원 정보
                        .antMatchers(HttpMethod.GET, "/*/members/**").hasRole("USER")
                        .antMatchers(HttpMethod.DELETE, "/*/members/**").hasRole("USER")
                        .anyRequest().permitAll()              // JWT를 적용하기 전이므로 우선은 모든 HTTP request 요청에 대해서 접근을 허용하도록 설정했다.
                );

        return http.build();
    }

    @Bean // PasswordEncoder Bean 객체를 생성한다.
    public PasswordEncoder passwordEncoder(){
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean // CorsConfigurationSource Bean 생성을 통해 구체적인 CORS 정책을 설정한다.
    CorsConfigurationSource corsConfigurationSource(){
        CorsConfiguration configuration = new CorsConfiguration();
//        configuration.setAllowedOrigins(Arrays.asList("*")); // 모든 출처(Origin)에 대해 스크립트 기반의 HTTP 통신을 허용하도록 설정한다. 이 설정은 운영 서버 환경에서 요구사항에 맞게 변경이 가능하다.
//        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PATCH", "DELETE")); // 파라미터로 지정한 HTTP Method에 대한 HTTP 통신을 허용한다.
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("*"));
        configuration.setExposedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(); // CorsConfigurationSource 인터페이스의 구현 클래스인 UrlBasedCorsConfigurationSource 클래스의 객체를 생성한다.
        source.registerCorsConfiguration("/**", configuration);         // 모든 URL에 앞에서 구성한 CORS 정책(CorsConfiguration)을 적용한다.

        return source;
    }


    // Custom Configurer인 CustomFilterConfigurer 클래스이다. CustomFilterConfigurer는 구현한 JwtAuthenticationFilter를 등록하는 역할을 한다.
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>{  // AbstractHttpConfigurer를 상속해서 Custom Configurer를 구현할 수 있다.
                                                                                                               // AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity>와 같이 AbstractHttpConfigurer 를 상속하는 타입과 HttpSecurityBuilder 를 상속하는 타입을 제너릭 타입으로 지정할 수 있다.

        @Override
        public void configure(HttpSecurity builder) throws Exception{  // configure() 메서드를 오버라이드해서 Configuration을 커스터마이징할 수 있다.

            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class); // getSharedObject() 를 통해서 AuthenticationManager의 객체를 얻을 수 있다. 그리고 Spring Security의 설정을 구성하는 SecurityConfigurer 간에 공유되는 객체를 얻을 수 있다.

            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer ); // JwtAuthenticationFilter에서 사용되는 AuthenticationManager와 JwtTokenizer를 DI 해준다.
            //jwtAuthenticationFilter.setFilterProcessesUrl("/auth/login"); // Login url
            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new MemberAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new MemberAuthenticationFailureHandler());

            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils); // JwtVerificationFilter의 인스턴스를 생성하면서 JwtVerificationFilter에서 사용되는 객체들을 생성자로 DI 해준다.

            builder
                    .addFilter(jwtAuthenticationFilter) //  JwtAuthenticationFilter를 Spring Security Filter Chain에 추가한다.
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class); // JwtVerificationFilter가 JwtAuthenticationFilter가 수행된 바로 다음에 동작하도록 JwtAuthenticationFilter 뒤에 추가한다.

        }
    }
}
