package com.seveneleven.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "resources")
public class Resource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "resource_id")
    private Long resourceId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "utilization_pct")
    private Integer utilizationPct = 0;

    private String availability;

    public Resource() {
    }

    public Resource(Long resourceId, Long userId, Long projectId, Integer utilizationPct, String availability) {
        this.resourceId = resourceId;
        this.userId = userId;
        this.projectId = projectId;
        this.utilizationPct = utilizationPct;
        this.availability = availability;
    }

    public Long getResourceId() {
        return resourceId;
    }

    public void setResourceId(Long resourceId) {
        this.resourceId = resourceId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Integer getUtilizationPct() {
        return utilizationPct;
    }

    public void setUtilizationPct(Integer utilizationPct) {
        this.utilizationPct = utilizationPct;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}
