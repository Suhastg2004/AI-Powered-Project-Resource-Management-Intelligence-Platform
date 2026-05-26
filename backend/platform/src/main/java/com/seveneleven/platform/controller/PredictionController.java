package com.seveneleven.platform.controller;

import com.seveneleven.platform.entity.Prediction;
import com.seveneleven.platform.service.PredictionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/predict")
@CrossOrigin(origins = "*")
public class PredictionController {

    @Autowired
    private PredictionService predictionService;

    @PostMapping("/{projectId}")
    public Prediction predict(@PathVariable Long projectId) {
        // Placeholder implementation for Day-2: Persist a dummy prediction record.
        Prediction p = new Prediction();
        p.setProjectId(projectId);
        p.setDelayProbability(0);
        p.setRiskStatus("UNKNOWN");
        p.setRecommendation("N/A");
        return predictionService.savePrediction(p);
    }
}
