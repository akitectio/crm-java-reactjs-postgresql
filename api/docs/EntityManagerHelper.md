### 1. Giới thiệu

`EntityManagerHelper` là một lớp tiện ích nhằm đơn giản hóa việc quản lý các thao tác CRUD đối với các thực thể (entities) trong ứng dụng Java sử dụng JPA và Hibernate. Lớp này cung cấp các phương thức chung cho việc tạo mới, đọc, cập nhật, và xóa dữ liệu trong cơ sở dữ liệu.

### 2. Cài đặt

Trước tiên, hãy chắc chắn rằng bạn đã cấu hình đúng các dependency cho Hibernate và JPA trong `pom.xml` của dự án:

```xml
<dependencies>
    <!-- Hibernate Core (ORM) -->
    <dependency>
        <groupId>org.hibernate.orm</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>6.2.8.Final</version>
    </dependency>

    <!-- Hibernate Validator -->
    <dependency>
        <groupId>org.hibernate.validator</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>8.0.1.Final</version>
    </dependency>

    <!-- JPA API -->
    <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
    </dependency>

    <!-- PostgreSQL JDBC Driver -->
    <dependency>
        <groupId>org.postgresql</groupId>
        <artifactId>postgresql</artifactId>
        <version>42.6.0</version>
    </dependency>

    <!-- Spring Boot Starter Data JPA -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
        <version>3.1.2</version>
    </dependency>

    <!-- Spring Boot Starter Validation -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
        <version>3.1.2</version>
    </dependency>

    <!-- Lombok -->
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <version>1.18.28</version>
        <scope>provided</scope>
    </dependency>
</dependencies>
```

### 3. Cấu trúc và các phương thức chính

`EntityManagerHelper<T>` được thiết kế để hoạt động với bất kỳ thực thể JPA nào bằng cách sử dụng kiểu tổng quát (generic). Dưới đây là các phương thức chính của lớp này:

- **create(T entity):** Tạo mới một thực thể và lưu vào cơ sở dữ liệu.
- **update(T entity):** Cập nhật một thực thể hiện có trong cơ sở dữ liệu.
- **delete(T entity):** Xóa một thực thể khỏi cơ sở dữ liệu.
- **deleteById(Object id):** Xóa một thực thể dựa trên ID.
- **findById(Object id):** Tìm một thực thể theo ID.
- **findAll():** Lấy danh sách tất cả các thực thể từ cơ sở dữ liệu.
- **findWithConditions(Map<String, Object> conditions):** Tìm kiếm thực thể với các điều kiện cụ thể.

### 4. Sử dụng EntityManagerHelper

#### 4.1. Khởi tạo EntityManagerHelper

Để sử dụng `EntityManagerHelper`, bạn cần khởi tạo nó với một `EntityManager` và một class của thực thể mà bạn muốn thao tác.

```java
@Autowired
private EntityManager entityManager;

EntityManagerHelper<Language> languageHelper = new EntityManagerHelper<>(entityManager, Language.class);
```

#### 4.2. Thao tác Create (Tạo mới)

Bạn có thể tạo một thực thể mới và lưu nó vào cơ sở dữ liệu bằng phương thức `create`.

```java
Language newLanguage = new Language();
newLanguage.setName("English");
newLanguage.setLocale("en_US");
newLanguage.setCode("EN");
newLanguage.setIsDefault(true);

languageHelper.create(newLanguage);
```

#### 4.3. Thao tác Read (Đọc dữ liệu)

Bạn có thể đọc dữ liệu từ cơ sở dữ liệu bằng cách sử dụng `findById` hoặc `findAll`.

- **Tìm kiếm theo ID:**

```java
Optional<Language> language = languageHelper.findById(1L);
```

- **Lấy tất cả các thực thể:**

```java
List<Language> languages = languageHelper.findAll();
```

#### 4.4. Thao tác Update (Cập nhật)

Để cập nhật một thực thể hiện có, bạn có thể sử dụng phương thức `update`.

```java
Language existingLanguage = languageHelper.findById(1L).orElseThrow(() -> new RuntimeException("Language not found"));
existingLanguage.setName("Updated Language Name");

languageHelper.update(existingLanguage);
```

#### 4.5. Thao tác Delete (Xóa)

Bạn có thể xóa một thực thể bằng cách sử dụng `delete` hoặc `deleteById`.

- **Xóa một thực thể trực tiếp:**

```java
languageHelper.delete(existingLanguage);
```

- **Xóa bằng ID:**

```java
languageHelper.deleteById(1L);
```

#### 4.6. Tìm kiếm dữ liệu theo điều kiện

Sử dụng phương thức `findWithConditions` để tìm kiếm thực thể với các điều kiện tùy chỉnh.

```java
Map<String, Object> conditions = new HashMap<>();
conditions.put("locale", "en_US");
conditions.put("isDefault", true);

List<Language> defaultLanguages = languageHelper.findWithConditions(conditions);
```

### 5. Ví dụ triển khai

Dưới đây là một ví dụ về cách triển khai `EntityManagerHelper` trong một lớp service để quản lý thực thể `Language`.

```java
@Service
public class LanguageService {

    private final EntityManagerHelper<Language> languageHelper;

    @Autowired
    public LanguageService(EntityManager entityManager) {
        this.languageHelper = new EntityManagerHelper<>(entityManager, Language.class);
    }

    public Language createLanguage(Language language) {
        return languageHelper.create(language);
    }

    public Optional<Language> getLanguageById(Long id) {
        return languageHelper.findById(id);
    }

    public List<Language> getAllLanguages() {
        return languageHelper.findAll();
    }

    public Language updateLanguage(Long id, Language updatedLanguage) {
        Language existingLanguage = languageHelper.findById(id).orElseThrow(() -> new RuntimeException("Language not found"));
        existingLanguage.setName(updatedLanguage.getName());
        existingLanguage.setLocale(updatedLanguage.getLocale());
        existingLanguage.setCode(updatedLanguage.getCode());
        existingLanguage.setIsDefault(updatedLanguage.getIsDefault());
        return languageHelper.update(existingLanguage);
    }

    public void deleteLanguage(Long id) {
        languageHelper.deleteById(id);
    }

    public List<Language> findLanguagesByCriteria(String locale, Boolean isDefault) {
        Map<String, Object> conditions = new HashMap<>();
        conditions.put("locale", locale);
        conditions.put("isDefault", isDefault);
        return languageHelper.findWithConditions(conditions);
    }
}
```

### 6. Kết luận

`EntityManagerHelper` cung cấp một cách tiếp cận tổng quát và linh hoạt để quản lý các thực thể JPA trong một ứng dụng Java sử dụng Hibernate. Bằng cách sử dụng lớp này, bạn có thể giảm thiểu mã lặp lại và đơn giản hóa việc thực hiện các thao tác CRUD trong ứng dụng của mình.