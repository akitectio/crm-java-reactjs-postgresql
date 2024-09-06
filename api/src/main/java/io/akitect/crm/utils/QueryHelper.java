package io.akitect.crm.utils;

import java.util.List;
import java.util.Optional;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import lombok.Getter;

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

    public List<T> findWithConditions(List<FilterMap> conditions) {
        StringBuilder queryStr = new StringBuilder("SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        conditions.forEach(
                filter -> queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator + " :")
                        .append(filter.paramName));

        // Log the generated query
        System.out.println("Generated Query: " + queryStr.toString());
        System.out.println("Parameters: " + conditions);

        var query = entityManager.createQuery(queryStr.toString(), entityClass);
        conditions.forEach(filter -> query.setParameter(filter.paramName, filter.value));

        return query.getResultList();
    }

}
