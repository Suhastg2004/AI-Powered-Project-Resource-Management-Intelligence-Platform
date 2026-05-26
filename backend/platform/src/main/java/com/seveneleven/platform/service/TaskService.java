package com.seveneleven.platform.service;

import com.seveneleven.platform.entity.Task;
import com.seveneleven.platform.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public List<Task> getTasksBySprint(Long sprintId) {
        return taskRepository.findBySprint_SprintId(sprintId);
    }

    public List<Task> getTasksByAssignee(Long assigneeId) {
        return taskRepository.findByAssigneeId(assigneeId);
    }

    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));
    }

    public Task createTask(Task task) {
        return taskRepository.save(task);
    }

    public Task updateTask(Long id, Task updated) {
        Task existing = getTaskById(id);
        existing.setTitle(updated.getTitle());
        existing.setPriority(updated.getPriority());
        existing.setStatus(updated.getStatus());
        existing.setStoryPoints(updated.getStoryPoints());
        existing.setAssigneeId(updated.getAssigneeId());
        if (updated.getSprint() != null) {
            existing.setSprint(updated.getSprint());
        }
        return taskRepository.save(existing);
    }

    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
