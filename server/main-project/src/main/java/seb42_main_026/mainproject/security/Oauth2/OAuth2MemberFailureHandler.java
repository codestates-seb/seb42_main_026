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

@Slf4j
public class OAuth2MemberFailureHandler extends SimpleUrlAuthenticationFailureHandler  {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request,
                                        HttpServletResponse response,
                                        AuthenticationException exception) throws IOException {

        exception.printStackTrace();
        log.error("# Authentication failed: {}", exception.getMessage());

        redirect(request, response, exception);

        //sendErrorResponse(response, exception); //  출력 스트림에 Error 정보를 담고 있다.
    }

    private void sendErrorResponse(HttpServletResponse response,AuthenticationException e) throws IOException{
        Gson gson = new Gson(); // Error 정보가 담긴 객체(ErrorResponse)를 JSON 문자열로 변환하는데 사용되는 Gson 라이브러리의 인스턴스를 생성한다.

        if( e.getMessage().equals("MEMBER_EXIST.")){
            ErrorResponse errorResponse = ErrorResponse.of(ExceptionCode.MEMBER_EXISTS);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.setStatus(HttpStatus.NOT_ACCEPTABLE.value());
            response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class));

        }else {
            ErrorResponse errorResponse = ErrorResponse.of(HttpStatus.UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE); // response의 Content Type이 “application/json” 이라는 것을 클라이언트에게 알려줄 수 있도록 MediaType.APPLICATION_JSON_VALUE를 HTTP Header에 추가하는 작업이다.
            response.setStatus(HttpStatus.UNAUTHORIZED.value());  //  response의 status가 401임을 클라이언트에게 알려줄 수 있도록 HttpStatus.UNAUTHORIZED.value()을 HTTP Header에 추가한다.
            response.getWriter().write(gson.toJson(errorResponse, ErrorResponse.class)); //Gson을 이용해 ErrorResponse 객체를 JSON 포맷 문자열로 변환 후, 출력 스트림을 생성한다.
        }



    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException{
        String uri = createURI(exception.getMessage()).toString();

        response.setHeader("Exception", exception.getMessage());

        getRedirectStrategy().sendRedirect(request, response, uri);

    }



    private URI createURI(String exception){
        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();
        queryParams.add("Exception", exception );


        return UriComponentsBuilder //  Port 설정을 하지 않으면 기본값은 80 포트
                .newInstance()
                //.scheme("https")
                //.host("andanghae.com") // 서버용
                //.path("login/callback") // 서버용
                .scheme("http")
                .host("localhost")
                .port(3000)
                //.path("receive-token.html")
                .path("login/callback")
                .queryParams(queryParams)
                .build()
                .toUri();
    }
}

