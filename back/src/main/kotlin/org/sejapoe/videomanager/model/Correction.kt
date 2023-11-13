package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "corrections")
class Correction(
    @Column(name = "start_time_code")
    var startTimeCode: Int, // in seconds

    @Column(name = "end_time_code")
    var endTimeCode: Int, // in seconds

    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    @JoinColumn(name = "request_id")
    var request: Request,

    @Column(name = "is_closed", nullable = false)
    var closed: Boolean = false,

    @OneToMany(
        mappedBy = "correction",
        cascade = [CascadeType.PERSIST, CascadeType.MERGE],
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    var comments: List<Comment> = emptyList(),

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "corrections_seq")
    @SequenceGenerator(name = "corrections_seq", sequenceName = "corrections_seq", allocationSize = 1)
    var id: Long = -1,
)