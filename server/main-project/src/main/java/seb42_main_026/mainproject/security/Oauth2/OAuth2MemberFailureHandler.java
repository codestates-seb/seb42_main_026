package seb42_main_026.mainproject.security.Oauth2;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.util.UriComponentsBuilder;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ErrorResponse;
import seb42_main_026.mainproject.exception.ExceptionCode;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.util.List;
import java.util.Optional;

@Slf4j
public class OAuth2MemberFailureHandler extends SimpleUrlAuthenticationFailureHandler  {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        exception.printStackTrace();
        log.error("# Authentication failed: {}", exception.getMessage());

        redirect(request, response, exception);

    }


    private void redirect(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException{

        if (exception.getMessage().equals("MEMBER_EXIST")){
            String uri = createURI(new CustomException(ExceptionCode.MEMBER_EXISTS)).toString();
            getRedirectStrategy().sendRedirect(request, response, uri);
        }else {
            String uri = createURI(exception).toString();
            getRedirectStrategy().sendRedirect(request, response, uri);
        }
    }



    private URI createURI(CustomException exception){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Message", exception.getExceptionCode().getMessage());
        queryParams.add("HttpStatus", exception.getExceptionCode().name());
        queryParams.add("field", exception.getExceptionCode().getField());


        return UriComponentsBuilder //  Port 설정을 하지 않으면 기본값은 80 포트
                .newInstance()
                .scheme("https")
                .host("andanghae.com") // 서버용
                .path("login/callback") // 서버용
                /*.scheme("http")
                .host("localhost")
                .port(3000)*/
                //.path("receive-token.html")
                //.path("login/callback")
                .queryParams(queryParams)
                .build()
                .toUri();
    }

    private URI createURI(Exception exception){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Message", exception.getMessage());



        return UriComponentsBuilder //  Port 설정을 하지 않으면 기본값은 80 포트
                .newInstance()
                .scheme("https")
                .host("andanghae.com") // 서버용
                .path("login/callback")
                //.scheme("http")
                //.host("localhost")
                //.port(3000)
                //.path("receive-token.html")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}

