package com.seveneleven.platform.repository;

import com.seveneleven.platform.entity.Prediction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PredictionRepository extends JpaRepository<Prediction, Long> {}
