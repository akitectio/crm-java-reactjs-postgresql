package io.akitect.crm.model.enums;

import lombok.Getter;

@Getter
public enum Status {
    PUBLISHED("published"),
    DRAFT("draft"),
    ARCHIVED("archived");

    private final String status;

    Status(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return this.status;
    }
}
