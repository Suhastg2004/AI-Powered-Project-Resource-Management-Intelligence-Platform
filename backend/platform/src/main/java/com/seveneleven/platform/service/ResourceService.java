package com.seveneleven.platform.service;

import com.seveneleven.platform.entity.Resource;
import com.seveneleven.platform.repository.ResourceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {

    @Autowired
    private ResourceRepository resourceRepository;

    public List<Resource> getAllResources() {
        return resourceRepository.findAll();
    }

    public Resource getResourceById(Long id) {
        return resourceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Resource not found"));
    }

    public Resource createResource(Resource resource) {
        return resourceRepository.save(resource);
    }

    public Resource updateResource(Long id, Resource updated) {
        Resource existing = getResourceById(id);
        existing.setUserId(updated.getUserId());
        existing.setProjectId(updated.getProjectId());
        existing.setUtilizationPct(updated.getUtilizationPct());
        existing.setAvailability(updated.getAvailability());
        return resourceRepository.save(existing);
    }
}
