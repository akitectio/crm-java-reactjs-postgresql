package io.akitect.crm.utils.enums;

public enum FilterOperator {
    EQUAL("="),
    NOT_EQUAL("!="),
    LESS_THAN("<"),
    LESS_OR_EQUAL("<="),
    MORE_THAN(">"),
    MORE_OR_EQUAL(">="),
    IS("is"),
    IS_NOT("is not"),
    IN("in"),
    NOT_IN("not in"),
    ILIKE("ilike"),
    LIKE("like");

    public String name;

    private FilterOperator(String name) {
        this.name = name;
    };
}
