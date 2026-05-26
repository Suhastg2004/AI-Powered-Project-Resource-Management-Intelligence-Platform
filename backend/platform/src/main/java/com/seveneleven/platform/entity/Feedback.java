package com.seveneleven.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "feedback")
public class Feedback {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "feedback_id")
    private Long feedbackId;

    @Column(name = "manager_id", nullable = false)
    private Long managerId;

    @Column(name = "developer_id", nullable = false)
    private Long developerId;

    @Column(nullable = false)
    private String comments;

    public Feedback() {
    }

    public Feedback(Long feedbackId, Long managerId, Long developerId, String comments) {
        this.feedbackId = feedbackId;
        this.managerId = managerId;
        this.developerId = developerId;
        this.comments = comments;
    }

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public Long getManagerId() {
        return managerId;
    }

    public void setManagerId(Long managerId) {
        this.managerId = managerId;
    }

    public Long getDeveloperId() {
        return developerId;
    }

    public void setDeveloperId(Long developerId) {
        this.developerId = developerId;
    }

    public String getComments() {
        return comments;
    }

    public void setComments(String comments) {
        this.comments = comments;
    }
}
