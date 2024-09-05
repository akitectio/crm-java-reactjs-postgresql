package io.akitect.crm.utils.constants;

public enum FilterOperation {
    // public final String EQUAL = "=";
    // public final String NOT_EQUAL = "!=";
    // public final String LESS_THAN = "<";
    // public final String LESS_OR_EQUAL = "<=";
    // public final String MORE_THAN = ">";
    // public final String MORE_OR_EQUAL = ">=";
    // public final String IS = "is";
    // public final String IS_NOT = "is not";
    // public final String IN = "in";

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
