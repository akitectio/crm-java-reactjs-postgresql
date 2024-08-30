package io.akitect.crm.model.enums;

import lombok.Getter;

@Getter
public enum StatusOfUser {
    ACTIVATED("Activated"),
    DEACTIVATED("Deactivated");

    private final String statusOfUser;

    StatusOfUser(String statusOfUser) {
        this.statusOfUser = statusOfUser;
    }

    @Override
    public String toString() {
        return this.statusOfUser;
    }
}
