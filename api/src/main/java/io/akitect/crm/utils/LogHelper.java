package io.akitect.crm.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class LogHelper {

    private static final Logger logger = LoggerFactory.getLogger(LogHelper.class);

    // Inject the logging enable/disable flag from configuration
    @Value("${logging.io.akitect.enabled}")
    private boolean isLoggingEnabled;

    public void info(String message) {
        if (isLoggingEnabled) {
            logger.info(message);
        }
    }

    public void debug(String message) {
        if (isLoggingEnabled) {
            logger.debug(message);
        }
    }

    public void error(String message) {
        if (isLoggingEnabled) {
            logger.error(message);
        }
    }

}
