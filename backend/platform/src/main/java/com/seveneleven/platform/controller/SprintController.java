package com.seveneleven.platform.controller;

import com.seveneleven.platform.entity.Sprint;
import com.seveneleven.platform.service.SprintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sprints")
@CrossOrigin(origins = "*")
public class SprintController {

    @Autowired
    private SprintService sprintService;

    @GetMapping
    public List<Sprint> getAll() {
        return sprintService.getAllSprints();
    }

    @GetMapping("/project/{projectId}")
    public List<Sprint> getByProject(@PathVariable Long projectId) {
        return sprintService.getSprintsByProject(projectId);
    }

    @PostMapping
    public Sprint create(@RequestBody Sprint sprint) {
        return sprintService.createSprint(sprint);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Sprint> update(@PathVariable Long id, @RequestBody Sprint sprint) {
        return ResponseEntity.ok(sprintService.updateSprint(id, sprint));
    }
}
