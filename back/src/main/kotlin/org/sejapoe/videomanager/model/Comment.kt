package org.sejapoe.videomanager.model

import jakarta.persistence.*
import java.time.Instant

@Entity
@Table(name = "comments")
class Comment(
    @Column(name = "timestamp", nullable = false)
    var timestamp: Instant,

    @JoinColumn(name = "author_id", nullable = false)
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    var author: User,

    @JoinColumn(name = "correction_id", nullable = false)
    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    var correction: Correction,

    @Column(name = "text", nullable = false, length = 1023)
    var text: String,

    @OneToMany(
        mappedBy = "lastViewedComment",
        cascade = [CascadeType.PERSIST, CascadeType.MERGE],
        orphanRemoval = true
    )
    val lastViews: List<LastView> = emptyList(),

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "comments_id_seq")
    @Column(name = "id", nullable = false)
    @SequenceGenerator(name = "comments_id_seq", sequenceName = "comments_id_seq", allocationSize = 1)
    var id: Long = -1L,
)
