//package seb42_main_026.mainproject.cloud.config;
//
//import com.amazonaws.auth.AWSStaticCredentialsProvider;
//import com.amazonaws.auth.BasicAWSCredentials;
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.AmazonS3ClientBuilder;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class S3Config {
//    /** test 기간에는 환경변수 설정(.yml) 안하고 바로 써서 하기
//     * test 끝나면 해당 키 노출 안되게 변경 - todo
//     */
//
////    @Value("${cloud.aws.credentials.access-key")
//    private String accessKey = "<발급받은 accessKey>";
//
////    @Value("${cloud.aws.credentials.secret-key")
//    private String secretKey = "<발급받은 secretKey>";
//
////    @Value("${cloud.aws.region.static")
//    private String regieon = "ap-northeast-2";
//
//    @Bean
//    public AmazonS3Client amazonS3Client(){
//        BasicAWSCredentials basicAWSCredentials = new BasicAWSCredentials(accessKey, secretKey);
//
//        return (AmazonS3Client) AmazonS3ClientBuilder.standard()
//                .withRegion(regieon)
//                .withCredentials(new AWSStaticCredentialsProvider(basicAWSCredentials))
//                .build();
//    }
//}
