package io.akitect.crm.repository.impl;

import io.akitect.crm.utils.EntityManagerHelper;
import io.akitect.crm.model.Setting;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;

@Repository
public class SettingRepositoryImpl {

    private final EntityManagerHelper<Setting> entityManagerHelper;

    @PersistenceContext
    private EntityManager entityManager;

    public SettingRepositoryImpl(EntityManager entityManager) {
        this.entityManagerHelper = new EntityManagerHelper<>(entityManager, Setting.class);
    }

    // Sử dụng EntityManagerHelper để thực hiện các thao tác CRUD cơ bản
    public List<Setting> findAll() {
        return entityManagerHelper.findAll();
    }

    public Optional<Setting> findById(Long id) {
        return entityManagerHelper.findById(id);
    }

    public Setting save(Setting setting) {
        if (setting.getId() == null) {
            return entityManagerHelper.create(setting);
        } else {
            return entityManagerHelper.update(setting);
        }
    }

    public void deleteById(Long id) {
        entityManagerHelper.deleteById(id);
    }

    // Thêm phương thức tùy chỉnh để tìm kiếm Setting theo key
    public Optional<Setting> findByKey(String key) {
        String jpql = "SELECT s FROM Setting s WHERE s.key = :key";
        List<Setting> settings = entityManager.createQuery(jpql, Setting.class)
                .setParameter("key", key)
                .getResultList();
        if (settings.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(settings.get(0));
    }
}
