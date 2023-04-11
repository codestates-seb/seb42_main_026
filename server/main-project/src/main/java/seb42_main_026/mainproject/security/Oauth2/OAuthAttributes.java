package seb42_main_026.mainproject.security.Oauth2;


import lombok.Builder;
import lombok.Getter;
import java.util.Map;
import java.util.UUID;

@Getter
@Builder
public class OAuthAttributes {
    private Map<String, Object> attributes;
    private String nameAttributeKey;
    private String name;
    private String email;

    public static OAuthAttributes of(String registrationId, String userNameAttributeName, Map<String, Object> attributes){
        if ("naver".equals(registrationId)){
            return ofNaver("id",attributes);
        }else if("kakao".equals(registrationId)){
            return ofKakao("id", attributes);
        }else {
            return ofGoogle(userNameAttributeName, attributes);
        }
    }

    private static OAuthAttributes ofGoogle(String userNameAttributeName, Map<String, Object> attributes){
        String str = (String) attributes.get("name");
        UUID uuid = UUID.randomUUID();
        String cut = uuid.toString().substring(0,3);

        return OAuthAttributes.builder()
                .name("Google@"+cut+"_"+str.replaceAll(" ",""))
                .email((String) attributes.get("email"))
                .attributes(attributes)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofNaver(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> response = (Map<String, Object>) attributes.get("response");
        UUID uuid = UUID.randomUUID();
        String cut = uuid.toString().substring(0,3);

        return OAuthAttributes.builder()
                .name("Naver@"+cut+"_"+(String) response.get("name"))
                .email((String) response.get("email"))
                .attributes(response)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }

    private static OAuthAttributes ofKakao(String userNameAttributeName, Map<String, Object> attributes){
        Map<String, Object> name = (Map<String, Object>) attributes.get("properties");
        Map<String, Object> attribute = (Map<String, Object>) attributes.get("kakao_account");
        UUID uuid = UUID.randomUUID();
        String cut = uuid.toString().substring(0,3);

        return OAuthAttributes.builder()
                .name("Kakao@"+cut+"_"+(String) name.get("nickname"))
                .email((String) attribute.get("email"))
                .attributes(attribute)
                .nameAttributeKey(userNameAttributeName)
                .build();
    }



}
