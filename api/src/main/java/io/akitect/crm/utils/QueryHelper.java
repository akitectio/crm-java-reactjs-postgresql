package io.akitect.crm.utils;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.Optional;

//@Component
public class QueryHelper<T> {

    @PersistenceContext
    private EntityManager entityManager;

    private final Class<T> entityClass;

    public QueryHelper(Class<T> entityClass) {
        this.entityClass = entityClass;
    }

    @Transactional
    public T create(T entity) {
        entityManager.persist(entity);
        return entity;
    }

    @Transactional
    public T update(T entity) {
        return entityManager.merge(entity);
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
        TypedQuery<T> query = entityManager.createQuery(queryStr, entityClass);
        return query.getResultList();
    }

    public List<T> findWithConditions(Map<String, Object> conditions) {
        StringBuilder queryStr = new StringBuilder("SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        conditions.forEach((key, value) -> queryStr.append(" AND e.").append(key).append(" = :").append(key));

        TypedQuery<T> query = entityManager.createQuery(queryStr.toString(), entityClass);
        conditions.forEach(query::setParameter);

        return query.getResultList();
    }
}