package com.seveneleven.platform.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.seveneleven.platform.dto.TaskDtos;
import com.seveneleven.platform.entity.Task;
import com.seveneleven.platform.repository.SprintRepository;
import com.seveneleven.platform.repository.TaskRepository;
import com.seveneleven.platform.repository.UserRepository;

@Service
public class TaskService {

	private final TaskRepository taskRepository;
	private final SprintRepository sprintRepository;
	private final UserRepository userRepository;

	public TaskService(TaskRepository taskRepository, SprintRepository sprintRepository, UserRepository userRepository) {
		this.taskRepository = taskRepository;
		this.sprintRepository = sprintRepository;
		this.userRepository = userRepository;
	}

	public List<Task> list(Long sprintId, Long assigneeId) {
		if (sprintId != null) {
			return taskRepository.findBySprint_SprintId(sprintId);
		}
		if (assigneeId != null) {
			return taskRepository.findByAssignee_Id(assigneeId);
		}
		return taskRepository.findAll();
	}

	public Task get(Long id) {
		return taskRepository.findById(id).orElseThrow();
	}

	public Task create(TaskDtos.CreateRequest request) {
		Task t = new Task();
		t.setSprint(sprintRepository.findById(request.sprintId()).orElseThrow());
		if (request.assigneeId() != null) {
			t.setAssignee(userRepository.findById(request.assigneeId()).orElseThrow());
		}
		t.setTitle(request.title());
		if (request.priority() != null) {
			t.setPriority(request.priority());
		}
		if (request.status() != null) {
			t.setStatus(request.status());
		}
		t.setStoryPoints(request.storyPoints());
		return taskRepository.save(t);
	}

	public Task update(Long id, TaskDtos.UpdateRequest request) {
		Task t = get(id);
		if (request.sprintId() != null) {
			t.setSprint(sprintRepository.findById(request.sprintId()).orElseThrow());
		}
		if (request.title() != null && !request.title().isBlank()) {
			t.setTitle(request.title());
		}
		if (request.assigneeId() != null) {
			t.setAssignee(userRepository.findById(request.assigneeId()).orElseThrow());
		}
		if (request.priority() != null) {
			t.setPriority(request.priority());
		}
		if (request.status() != null) {
			t.setStatus(request.status());
		}
		if (request.storyPoints() != null) {
			t.setStoryPoints(request.storyPoints());
		}
		return taskRepository.save(t);
	}

	public void delete(Long id) {
		taskRepository.deleteById(id);
	}
}
