package io.akitect.crm.utils.enums;

public enum FilterOperator {
    EQUAL("="),
    NOT_EQUAL("!="),
    LESS_THAN("<"),
    LESS_OR_EQUAL("<="),
    MORE_THAN(">"),
    MORE_OR_EQUAL(">="),
    IS("IS"),
    IS_NOT("IS NOT"),
    IN("IN"),
    NOT_IN("NOT IN"),
    ILIKE("ILIKE"),
    LIKE("LIKE");

    public String name;

    private FilterOperator(String name) {
        this.name = name;
    };
}
