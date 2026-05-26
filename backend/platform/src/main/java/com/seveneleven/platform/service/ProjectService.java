package com.seveneleven.platform.service;

import com.seveneleven.platform.entity.Project;
import com.seveneleven.platform.repository.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectService {

    @Autowired
    private ProjectRepository projectRepository;

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found"));
    }

    public Project createProject(Project project) {
        return projectRepository.save(project);
    }

    public Project updateProject(Long id, Project updatedProject) {
        Project existing = getProjectById(id);
        existing.setName(updatedProject.getName());
        existing.setManagerId(updatedProject.getManagerId());
        existing.setStartDate(updatedProject.getStartDate());
        existing.setEndDate(updatedProject.getEndDate());
        existing.setStatus(updatedProject.getStatus());
        existing.setDelayRiskScore(updatedProject.getDelayRiskScore());
        return projectRepository.save(existing);
    }

    public void deleteProject(Long id) {
        projectRepository.deleteById(id);
    }
}
