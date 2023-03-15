package seb42_main_026.mainproject.exception;

public class StorageException extends RuntimeException{

    public StorageException(String message){ super(message);}

    public StorageException(String message, Throwable cause){
        super(message, cause);
    }
}
