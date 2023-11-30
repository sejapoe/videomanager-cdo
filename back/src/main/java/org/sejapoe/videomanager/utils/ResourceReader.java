package org.sejapoe.videomanager.utils;

import org.springframework.core.io.ClassPathResource;
import org.springframework.util.FileCopyUtils;

import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

public class ResourceReader {
    public static String readFileToString(String path) throws IOException {
        ClassPathResource classPathResource = new ClassPathResource(path);
        try (InputStreamReader reader = new InputStreamReader(classPathResource.getInputStream(), StandardCharsets.UTF_8)) {
            return FileCopyUtils.copyToString(reader);
        }
    }
}