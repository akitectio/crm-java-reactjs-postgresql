package io.akitect.crm.utils;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

@Component
public class SpringContext implements ApplicationContextAware {
    private static ApplicationContext context;

    public static <T extends Object> T getBean(Class<T> beanClass) {
        return context.getBean(beanClass);
    }

    public static <T extends Object> T getBean(String qualifier, Class<T> beanClass) {
        return context.getBean(qualifier, beanClass);
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        SpringContext.context = applicationContext;
    }
}
