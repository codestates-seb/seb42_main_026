package seb42_main_026.mainproject.security.Oauth2;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;
import seb42_main_026.mainproject.exception.CustomException;
import seb42_main_026.mainproject.exception.ExceptionCode;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;

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

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("andanghae.com")
                .path("login/callback")
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

        return UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("andanghae.com")
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

