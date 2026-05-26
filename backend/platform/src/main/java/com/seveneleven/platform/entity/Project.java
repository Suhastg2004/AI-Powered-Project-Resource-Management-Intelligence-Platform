package com.seveneleven.platform.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "project_id")
    private Long projectId;

    @Column(nullable = false)
    private String name;

    @Column(name = "manager_id")
    private Long managerId;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    @Column(nullable = false)
    private String status; // e.g., "PLANNED", "ACTIVE", "ARCHIVED"

    @Column(name = "delay_risk_score")
    private Double delayRiskScore = 0.0;

    public Project() {
    }

    public Project(Long projectId, String name, Long managerId, LocalDate startDate, LocalDate endDate, String status,
            Double delayRiskScore) {
        this.projectId = projectId;
        this.name = name;
        this.managerId = managerId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.status = status;
        this.delayRiskScore = delayRiskScore;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Double getDelayRiskScore() {
        return delayRiskScore;
    }

    public void setDelayRiskScore(Double delayRiskScore) {
        this.delayRiskScore = delayRiskScore;
    }
}