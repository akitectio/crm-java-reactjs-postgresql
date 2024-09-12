package io.akitect.crm.model;

import java.sql.Timestamp;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import io.akitect.crm.dto.response.PermissionResponse;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    private String key;

    private Timestamp createdAt;

    private Timestamp updatedAt;

    private Timestamp deletedAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "permissions", fetch = FetchType.LAZY)
    private List<Role> roles;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    private Permission parent;

    @JsonIgnore
    @OneToMany(mappedBy = "parent")
    private List<Permission> children;

    @PrePersist
    protected void onCreate() {
        createdAt = new Timestamp(System.currentTimeMillis());
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Timestamp(System.currentTimeMillis());
    }

    public void delete() {
        this.deletedAt = new Timestamp(System.currentTimeMillis());
        for (Permission permission : children) {
            permission.delete();
        }
    }

    public void update(String oldName, String newName) {
        this.key = this.key.replace(oldName.toLowerCase(), newName.toLowerCase());
        if (this.name == oldName)
            this.name = newName;
        for (Permission permission : children) {
            permission.update(oldName, newName);
        }
    }

    public PermissionResponse convertSelf() {
        PermissionResponse converted = PermissionResponse.builder().id(this.id).key(this.key).name(this.name)
                .createdAt(createdAt).updatedAt(updatedAt).deletedAt(deletedAt).build();
        converted.setChildren(children);
        return converted;
    }
}
