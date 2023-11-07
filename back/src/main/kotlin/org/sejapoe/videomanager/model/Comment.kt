package org.sejapoe.videomanager.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "comments")
class Comment(
    @Column(name = "timestamp", nullable = false)
    var timestamp: Instant,

    @JoinColumn(name = "request_id", nullable = false)
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    var author: User,

    @JoinColumn(name = "correction_id", nullable = false)
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    var correction: Correction,

    @Column(name = "text", nullable = false)
    var text: String,

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    var id: Long = -1L
)