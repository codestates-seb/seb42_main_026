package seb42_main_026.mainproject.cloud.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import seb42_main_026.mainproject.exception.StorageException;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Objects;
import java.util.UUID;

@RequiredArgsConstructor
@Service
public class S3StorageService implements StorageService {

    private final AmazonS3Client amazonS3Client;

    //test 후에 .yml 환경변수 설정하여 숨기기 - todo
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    /* 요청받은 미디어 파일(이미지+오디오)을 S3 버킷에 저장하는 메서드_230317
     * NOTE : 이미지 파일만 저장하도록 메서드 분리(추상화)_230323
     */    @Override
    public void imageStore(MultipartFile imageFile, String encodedFileName){
        try {
            if (imageFile.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            if (!Objects.equals(imageFile.getContentType(), "image/jpeg") &&
            !Objects.equals(imageFile.getContentType(), "image/png") &&
            !Objects.equals(imageFile.getContentType(), "image/gif")) {
                throw new StorageException("Invalid file type. Only JPEG, PNG, GIF are allowed");
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(imageFile.getContentType());
            metadata.setContentLength(imageFile.getSize());

            amazonS3Client.putObject(new PutObjectRequest(bucket, encodedFileName, imageFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        } catch (IOException e) {
            throw new StorageException("Failed to store file.", e);
        }
    }

    /* 요청받은 미디어 파일(이미지+오디오)을 S3 버킷에 저장하는 메서드_230317
     * NOTE : 오디오 파일만 저장하도록 메서드 분리(추상화)_230323
     * NOTE : 파일 확장자 제한조건 추가_230328
     */
    @Override
    public void voiceStore(MultipartFile voiceFile, String encodedFileName){
        try {
            if (voiceFile.isEmpty()) {
                throw new StorageException("Failed to store empty file.");
            }

            //if (!Objects.equals(voiceFile.getContentType(), "audio/mp4") &&
            if (!Objects.equals(voiceFile.getContentType(), "audio/webm") &&
            !Objects.equals(voiceFile.getContentType(), "audio/mpeg") &&
            !Objects.equals(voiceFile.getContentType(), "audio/ogg") &&
            !Objects.equals(voiceFile.getContentType(), "audio/mp3")) {
                throw new StorageException("Invalid file type. Only MP4, MPEG, OGG are allowed");
            }

            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(voiceFile.getContentType());
            metadata.setContentLength(voiceFile.getSize());

            amazonS3Client.putObject(new PutObjectRequest(bucket, encodedFileName, voiceFile.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        }catch (IOException e){
            throw new StorageException("Failed to store file.", e);
        }
    }

    // 미디어 파일 저장 URL 생성 메서드 (파일명 한글일때, 깨짐 방지)_230320
    public String getFileUrl(String encodedFileName){
        return URLDecoder.decode(amazonS3Client.getUrl(bucket,encodedFileName).toString(),StandardCharsets.UTF_8);
    }

    // 파일명 중복 이슈를 해결하기 위해 파일명을 "UUID + "-" + {fileName}" 으로 바꿔주는 메서드_230320
    public String encodeFileName(MultipartFile mediaFile){
        String fileName = mediaFile.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();

        return uuid + "-" + fileName;
    }
}
