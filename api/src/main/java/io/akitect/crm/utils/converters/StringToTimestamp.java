package io.akitect.crm.utils.converters;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

public class StringToTimestamp {
    public static Timestamp convert(String input, String format) {
        if (format == null || format.isEmpty())
            format = "yyyy-MM-dd HH:mm:ss.SSS";
        try {
            SimpleDateFormat formatter = new SimpleDateFormat(format);
            Date date = formatter.parse(input);
            Timestamp timestamp = new Timestamp(date.getTime());

            return timestamp;
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }

    }
}
