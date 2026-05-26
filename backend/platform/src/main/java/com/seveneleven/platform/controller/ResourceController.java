package com.seveneleven.platform.controller;

import com.seveneleven.platform.entity.Resource;
import com.seveneleven.platform.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/resources")
@CrossOrigin(origins = "*")
public class ResourceController {

    @Autowired
    private ResourceService resourceService;

    @GetMapping
    public List<Resource> getAll() {
        return resourceService.getAllResources();
    }

    @PostMapping
    public Resource create(@RequestBody Resource resource) {
        return resourceService.createResource(resource);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Resource> update(@PathVariable Long id, @RequestBody Resource resource) {
        return ResponseEntity.ok(resourceService.updateResource(id, resource));
    }
}
