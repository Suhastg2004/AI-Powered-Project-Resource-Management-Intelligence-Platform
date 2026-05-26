package com.seveneleven.platform.repository;

import com.seveneleven.platform.entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectRepository extends JpaRepository<Project, Long> {}
