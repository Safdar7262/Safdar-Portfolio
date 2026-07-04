package com.portfolio.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "view_counter")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ViewCounter {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long count;
    private LocalDateTime lastViewed;
}