package io.akitect.crm.utils;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.support.PageableExecutionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
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
            entityManager.merge(entity);
            return entity;
        } else {
            entityManager.persist(entity);
            return entity;
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
                filter -> queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator.name + " :")
                        .append(filter.paramName));

        // Log the generated query
        System.out.println("Generated Query: " + queryStr.toString());
        System.out.println("Parameters: " + conditions);

        var query = entityManager.createQuery(queryStr.toString(), entityClass);
        conditions.forEach(filter -> query.setParameter(filter.paramName, filter.value));

        return query.getResultList();
    }

    public <K> Page<K> paginatedWithConditions(Class<K> dtoClass, Pageable pageable, List<FilterMap> filters) {
        StringBuilder queryStr = new StringBuilder(
                "SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        filters.forEach(
                filter -> queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator.name + " :")
                        .append(filter.paramName));
        TypedQuery<K> query = entityManager.createQuery(queryStr.toString(),
                dtoClass);
        filters.forEach(filter -> query.setParameter(filter.paramName, filter.value));

        TypedQuery<Long> countQuery = entityManager.createQuery(getCountQueryString(filters), Long.class);

        query.setMaxResults(pageable.getPageSize());
        query.setFirstResult((int) pageable.getOffset());

        var results = query.getResultList().stream().map(result -> new ObjectMapper().convertValue(result, dtoClass))
                .collect(Collectors.toList());

        return PageableExecutionUtils.getPage(results, pageable,
                countQuery::getSingleResult);

    }

    private String getCountQueryString(List<FilterMap> filters) {
        StringBuilder queryStr = new StringBuilder(
                "SELECT COUNT(e.id) AS COUNTER FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        filters.forEach(
                filter -> queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator.name + " :")
                        .append(filter.paramName));
        return queryStr.toString();
    }

}
