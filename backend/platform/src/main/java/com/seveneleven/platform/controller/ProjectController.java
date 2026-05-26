package com.seveneleven.platform.controller;

import com.seveneleven.platform.entity.Project;
import com.seveneleven.platform.service.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @GetMapping
    public List<Project> getAll() {
        return projectService.getAllProjects();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Project> getById(@PathVariable Long id) {
        return ResponseEntity.ok(projectService.getProjectById(id));
    }

    @PostMapping
    public Project create(@RequestBody Project project) {
        return projectService.createProject(project);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Project> update(@PathVariable Long id, @RequestBody Project project) {
        return ResponseEntity.ok(projectService.updateProject(id, project));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        projectService.deleteProject(id);
        return ResponseEntity.ok().build();
    }
}
