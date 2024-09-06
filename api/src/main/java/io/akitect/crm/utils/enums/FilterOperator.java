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
    NOT_IN("not in");

    public String operator;

    private FilterOperator(String operator) {
        this.operator = operator;
    };
}
