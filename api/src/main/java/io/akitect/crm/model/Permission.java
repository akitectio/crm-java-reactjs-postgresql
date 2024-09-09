package io.akitect.crm.model;

import java.sql.Timestamp;
import java.util.Set;

import io.akitect.crm.dto.response.PermissionResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "permissions")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Permission {
    @Id
    @Setter(value = AccessLevel.PRIVATE)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String key;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private Timestamp deletedAt;

    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private Set<Role> roles;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    public PermissionResponse convertSelf() {
        return PermissionResponse.builder().id(this.id).key(this.key).name(this.name).description(this.description)
                .createdAt(createdAt).updatedAt(updatedAt).deletedAt(deletedAt).build();
    }
}
