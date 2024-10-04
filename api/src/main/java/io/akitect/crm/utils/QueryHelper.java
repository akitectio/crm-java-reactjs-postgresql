package io.akitect.crm.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.support.PageableExecutionUtils;

import com.fasterxml.jackson.databind.ObjectMapper;

import io.akitect.crm.utils.enums.FilterOperator;
import jakarta.persistence.EntityManager;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import lombok.Getter;

public class QueryHelper<T> {

    public record SortMap(String sortBy, Direction order) {
        public SortMap(String sortBy, Direction order) {
            this.sortBy = sortBy;
            this.order = order;
        }
    }

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
    public List<T> saveOrUpdateAll(List<T> entities) {
        List<T> result = new ArrayList<>();
        for (T entity : entities) {
            if (entityManager.contains(entity)) {
                result.add(entityManager.merge(entity));

            } else {
                entityManager.persist(entity);
                result.add(entity);
            }
        }
        return result;
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

    public List<T> findWithConditions(List<FilterMap> filters) {
        StringBuilder queryStr = new StringBuilder("SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        filters.forEach(
                filter -> {
                    if (List.of(FilterOperator.IS, FilterOperator.IS_NOT).contains(filter.operator)
                            && filter.value == null) {
                        queryStr.append(" AND e.").append(filter.fieldName)
                                .append(" " + filter.operator.name + " NULL");
                    } else {
                        queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator.name + " :")
                                .append(filter.paramName);
                    }

                });
        // Log the generated query
        System.out.println("Generated Query: " + queryStr.toString());
        // System.out.println("Parameters: " + conditions);

        var query = entityManager.createQuery(queryStr.toString(), entityClass);
        filters.forEach(filter -> {
            if (List.of(FilterOperator.IS, FilterOperator.IS_NOT).contains(filter.operator)
                    && filter.value == null) {

            } else {
                query.setParameter(filter.paramName, filter.value);
            }
        });

        return query.getResultList();
    }

    public <K> Page<K> paginatedWithConditions(Class<K> dtoClass, Pageable pageable, List<FilterMap> filters) {
        StringBuilder queryStr = new StringBuilder(
                "SELECT e FROM " + entityClass.getSimpleName() + " e WHERE 1=1");

        filters.forEach(
                filter -> {
                    if (List.of(FilterOperator.IS, FilterOperator.IS_NOT).contains(filter.operator)
                            && filter.value == null) {
                        queryStr.append(" AND e.").append(filter.fieldName)
                                .append(" " + filter.operator.name + " NULL");
                    } else {
                        queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator.name + " :")
                                .append(filter.paramName);
                    }

                });

        queryStr.append(" " + getSortByParam(pageable.getSort()));

        TypedQuery<K> query = entityManager.createQuery(queryStr.toString(), dtoClass);

        TypedQuery<Long> countQuery = entityManager.createQuery(getCountQueryString(filters), Long.class);

        filters.forEach(filter -> {
            if (List.of(FilterOperator.IS, FilterOperator.IS_NOT).contains(filter.operator)
                    && filter.value == null) {

            } else {
                query.setParameter(filter.paramName, filter.value);
                countQuery.setParameter(filter.paramName, filter.value);
            }
        });

        query.setMaxResults(pageable.getPageSize());
        query.setFirstResult((int) pageable.getOffset());

        return PageableExecutionUtils.getPage(
                query.getResultList().stream().map(result -> new ObjectMapper().convertValue(result, dtoClass))
                        .collect(Collectors.toList()),
                pageable,
                countQuery::getSingleResult);

    }

    public String getCountQueryString(List<FilterMap> filters) {
        StringBuilder queryStr = new StringBuilder(
                "SELECT COUNT(e.id) AS COUNTER FROM " + entityClass.getSimpleName() + " e WHERE 1=1");
        filters.forEach(
                filter -> {
                    if (List.of(FilterOperator.IS, FilterOperator.IS_NOT).contains(filter.operator)
                            && filter.value == null) {
                        queryStr.append(" AND e.").append(filter.fieldName)
                                .append(" " + filter.operator.name + " NULL");
                    } else {
                        queryStr.append(" AND e.").append(filter.fieldName).append(" " + filter.operator.name + " :")
                                .append(filter.paramName);
                    }

                });
        return queryStr.toString();
    }

    private String getSortByParam(Sort data) {

        List<Order> sorts = data.toList();

        if (sorts.size() == 0) {
            return "";
        }

        StringBuilder queryStr = new StringBuilder("ORDER BY ");

        sorts.forEach(sort -> queryStr.append(sort.getProperty()).append(" " + sort.getDirection())
                .append(sorts.indexOf(sort) == sorts.size() - 1 ? "" : ", "));

        return queryStr.toString();
    }

}
