package com.seveneleven.platform.repository;

import com.seveneleven.platform.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findBySprint_SprintId(Long sprintId);
    List<Task> findByAssigneeId(Long assigneeId);
}
