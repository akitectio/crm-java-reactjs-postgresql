package io.akitect.crm.utils;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.Getter;

import java.util.List;
import java.util.Map;
import java.util.Optional;

public class QueryHelper<T> {

    @Getter
    private final EntityManager entityManager;
    private final Class<T> entityClass;

    public QueryHelper(EntityManager entityManager, Class<T> entityClass) {
        this.entityManager = entityManager;
        this.entityClass = entityClass;
    }


    @Transactional
    public T saveOrUpdate(T entity) {
        if (entityManager.contains(entity)) {
            return entity;
        } else {
            return entityManager.merge(entity);
        }
    }

    @Transactional
    public void delete(T entity) {
        if (entityManager.contains(entity)) {
            entityManager.remove(entity);
        } else {
            entityManager.remove(entityManager.merge(entity));
        }
    }

    @Transactional
    public void deleteById(Object id) {
        T entity = entityManager.find(entityClass, id);
        if (entity != null) {
            entityManager.remove(entity);
        }
    }

    public Optional<T> findById(Object id) {
        return Optional.ofNullable(entityManager.find(entityClass, id));
    }

    public List<T> findAll() {
        String queryStr = "SELECT e FROM " + entityClass.getSimpleName() + " e";
        return entityManager.createQuery(queryStr, entityClass).getResultList();
    }
    public List<T> findWithConditions(Map<String, Object> conditions) {
        StringBuilder queryStr = new StringBuilder("SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        conditions.forEach((key, value) -> queryStr.append(" AND e.").append(key).append(" = :").append(key));

        // Log the generated query
        System.out.println("Generated Query: " + queryStr.toString());
        System.out.println("Parameters: " + conditions);

        var query = entityManager.createQuery(queryStr.toString(), entityClass);
        conditions.forEach(query::setParameter);

        return query.getResultList();
    }


}
