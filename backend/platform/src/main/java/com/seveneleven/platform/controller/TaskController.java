package com.seveneleven.platform.controller;

import com.seveneleven.platform.entity.Task;
import com.seveneleven.platform.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "*")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAll() {
        return taskService.getAllTasks();
    }

    @GetMapping("/sprint/{sprintId}")
    public List<Task> getBySprint(@PathVariable Long sprintId) {
        return taskService.getTasksBySprint(sprintId);
    }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return taskService.createTask(task);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Task> update(@PathVariable Long id, @RequestBody Task task) {
        return ResponseEntity.ok(taskService.updateTask(id, task));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok().build();
    }
}
