package com.seveneleven.platform.service;

import com.seveneleven.platform.entity.Prediction;
import com.seveneleven.platform.repository.PredictionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PredictionService {

    @Autowired
    private PredictionRepository predictionRepository;

    public Prediction savePrediction(Prediction prediction) {
        return predictionRepository.save(prediction);
    }
}
