package io.akitect.crm.utils.enums;

public enum FilterOperation {
    EQUAL("="),
    NOT_EQUAL("!="),
    LESS_THAN("<"),
    LESS_OR_EQUAL("<="),
    MORE_THAN(">"),
    MORE_OR_EQUAL(">="),
    IS("is"),
    IS_NOT("is not"),
    IN("in");

    public String operator;

    private FilterOperation(String operator) {
        this.operator = operator;
    };
}
