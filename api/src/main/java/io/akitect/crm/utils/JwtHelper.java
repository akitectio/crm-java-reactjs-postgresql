package io.akitect.crm.utils;

import java.util.Base64;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;

public class JwtHelper {
    public static final JwtHelper __instance = new JwtHelper();
    public final ObjectMapper objectMapper = SpringContext.getBean(ObjectMapper.class);
    public static final String ADMIN_ROLE = "admin";

    public enum ValidateMode {
        ANY_MATCH,
        ALL_MATCH
    }

    private JwtHelper() {

    }

    public static HttpServletRequest getCurrentHttpRequest() {
        RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
        if (requestAttributes instanceof ServletRequestAttributes) {
            HttpServletRequest request = ((ServletRequestAttributes) requestAttributes).getRequest();
            return request;
        }
        return null;
    }

    public static String getCurrentToken() {
        var y = Optional.ofNullable(getCurrentHttpRequest()).map(item -> item.getHeader("Authorization")).orElse(null);
        var x =  Optional.ofNullable(getCurrentHttpRequest())
                .map(request -> request.getHeader("Authorization"));
        return Optional.ofNullable(getCurrentHttpRequest())
                .map(request -> request.getHeader("Authorization"))
                .filter(authHeader -> authHeader.startsWith("Bearer "))
                .map(authHeader -> authHeader.substring(7))  // Remove "Bearer " prefix
                .orElse(null);
    }

    @SuppressWarnings("unchecked")
    private Map<String, Map<String, Object>> decodeToken(String token) {
        if (token == null)
            return Collections.emptyMap();
        token = token.replace("Bearer ", "");
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();
        Map<String, Map<String, Object>> mapper = new HashMap<>();
        try {
            mapper.put("header", objectMapper.readValue(new String(decoder.decode(chunks[0])), Map.class));
            mapper.put("payload", objectMapper.readValue(new String(decoder.decode(chunks[1])), Map.class));

        } catch (Exception e) {

            return  new HashMap<>();
        }
        return mapper;
    }

    public static Map<String, Map<String, Object>> getDecodedToken() {
        return JwtHelper.__instance.decodeToken(JwtHelper.getCurrentToken());
    }

    public static String getCurrentUserId() {
        Map<String, Map<String, Object>> decodedContent = getDecodedToken();
        if (decodedContent == null || decodedContent.size() == 0) {
            return null;
        }
        return decodedContent.get("payload").get("sub").toString();
    }


    public static Object getByKey(String key) {
        Map<String, Map<String, Object>> decodedContent = getDecodedToken();
        if (decodedContent == null || decodedContent.size() == 0) {
            return null;
        }
        return decodedContent.getOrDefault("payload", null).getOrDefault(key, null);
    }

//    @SuppressWarnings("unchecked")
//    public static List<String> getUserRoles() {
//        Map<String, Map<String, Object>> decodedContent = getDecodedToken();
//        if (decodedContent == null || decodedContent.size() == 0) {
//            return new ArrayList<>();
//        }
//        return ((Map<String, List<String>>) decodedContent
//                .getOrDefault("payload", Maps.newHashMap())
//                .getOrDefault("realm", Maps.newHashMap()))
//                .getOrDefault("roles", Lists.newArrayList());
//    }

}
