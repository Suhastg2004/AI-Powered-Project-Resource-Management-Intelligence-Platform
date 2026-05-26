package com.seveneleven.platform.repository;

import com.seveneleven.platform.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {}
