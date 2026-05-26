package com.seveneleven.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "predictions")
public class Prediction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "prediction_id")
    private Long predictionId;

    @Column(name = "project_id", nullable = false)
    private Long projectId;

    @Column(name = "delay_probability")
    private Integer delayProbability;

    @Column(name = "risk_status")
    private String riskStatus;

    private String recommendation;

    public Prediction() {
    }

    public Prediction(Long predictionId, Long projectId, Integer delayProbability, String riskStatus, String recommendation) {
        this.predictionId = predictionId;
        this.projectId = projectId;
        this.delayProbability = delayProbability;
        this.riskStatus = riskStatus;
        this.recommendation = recommendation;
    }

    public Long getPredictionId() {
        return predictionId;
    }

    public void setPredictionId(Long predictionId) {
        this.predictionId = predictionId;
    }

    public Long getProjectId() {
        return projectId;
    }

    public void setProjectId(Long projectId) {
        this.projectId = projectId;
    }

    public Integer getDelayProbability() {
        return delayProbability;
    }

    public void setDelayProbability(Integer delayProbability) {
        this.delayProbability = delayProbability;
    }

    public String getRiskStatus() {
        return riskStatus;
    }

    public void setRiskStatus(String riskStatus) {
        this.riskStatus = riskStatus;
    }

    public String getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(String recommendation) {
        this.recommendation = recommendation;
    }
}
