package com.seveneleven.platform.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "task_id")
    private Long taskId;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "sprint_id", nullable = false)
    private Sprint sprint;

    @Column(name = "assignee_id")
    private Long assigneeId; // References User ID

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String priority; // "LOW", "MEDIUM", "HIGH"

    @Column(nullable = false)
    private String status; // "TO_DO", "IN_PROGRESS", "DONE"

    @Column(name = "story_points")
    private Integer storyPoints = 0;

    public Task() {
    }

    public Task(Long taskId, Sprint sprint, Long assigneeId, String title, String priority, String status, Integer storyPoints) {
        this.taskId = taskId;
        this.sprint = sprint;
        this.assigneeId = assigneeId;
        this.title = title;
        this.priority = priority;
        this.status = status;
        this.storyPoints = storyPoints;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public Sprint getSprint() {
        return sprint;
    }

    public void setSprint(Sprint sprint) {
        this.sprint = sprint;
    }

    public Long getAssigneeId() {
        return assigneeId;
    }

    public void setAssigneeId(Long assigneeId) {
        this.assigneeId = assigneeId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Integer getStoryPoints() {
        return storyPoints;
    }

    public void setStoryPoints(Integer storyPoints) {
        this.storyPoints = storyPoints;
    }
}