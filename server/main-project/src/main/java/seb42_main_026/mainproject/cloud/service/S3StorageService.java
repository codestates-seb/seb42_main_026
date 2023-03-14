//package seb42_main_026.mainproject.cloud.service;
//
//import com.amazonaws.services.s3.AmazonS3Client;
//import com.amazonaws.services.s3.model.ObjectMetadata;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.web.multipart.MultipartFile;
//import seb42_main_026.mainproject.exception.StorageException;
//
//import java.io.IOException;
//
//@RequiredArgsConstructor
//@Service
//public class S3StorageService implements StorageService{
//
//    private final AmazonS3Client amazonS3Client;
//
//    //test 후에 .yml 환경변수 설정하여 숨기기 - todo
////    @Value("${cloud.aws.s3.bucket}")
//    private String bucket = "<S3 버킷 이름>";
//
//    @Override
//    public void store(MultipartFile file){
//        try {
//            String fileName = file.getOriginalFilename();
//            String fileUrl = "https://" + bucket + "<Endpoint>" + fileName;
//            ObjectMetadata metadata = new ObjectMetadata();
//            metadata.setContentType(file.getContentType());
//            metadata.setContentLength(file.getSize());
//
//            amazonS3Client.putObject(bucket, fileName, file.getInputStream(), metadata);
//        } catch (IOException e) {
//            throw new StorageException("Failed to store file.", e);
//        }
//    }
//}
