package com.seveneleven.platform.service;

import com.seveneleven.platform.entity.Sprint;
import com.seveneleven.platform.repository.SprintRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SprintService {

    @Autowired
    private SprintRepository sprintRepository;

    public List<Sprint> getAllSprints() {
        return sprintRepository.findAll();
    }

    public List<Sprint> getSprintsByProject(Long projectId) {
        return sprintRepository.findByProject_ProjectId(projectId);
    }

    public Sprint getSprintById(Long id) {
        return sprintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sprint not found"));
    }

    public Sprint createSprint(Sprint sprint) {
        return sprintRepository.save(sprint);
    }

    public Sprint updateSprint(Long id, Sprint updated) {
        Sprint existing = getSprintById(id);
        existing.setSprintName(updated.getSprintName());
        existing.setVelocity(updated.getVelocity());
        existing.setStartDate(updated.getStartDate());
        existing.setEndDate(updated.getEndDate());
        existing.setStatus(updated.getStatus());
        return sprintRepository.save(existing);
    }
}
