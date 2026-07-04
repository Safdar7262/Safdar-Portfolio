package com.portfolio.repository;

import com.portfolio.model.ViewCounter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewCounterRepository extends JpaRepository<ViewCounter, Long> {
}