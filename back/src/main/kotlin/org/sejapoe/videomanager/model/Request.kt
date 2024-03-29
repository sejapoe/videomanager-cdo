package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "requests")
class Request(
    @Column(name = "name")
    var name: String,

    @ManyToOne
    @JoinColumn(name = "lecturer_id")
    var lecturer: User,

    @ManyToOne
    @JoinColumn(name = "institute_id")
    var institute: Institute,

    @ManyToOne
    @JoinColumn(name = "department_id")
    var department: Department,

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    var status: RequestStatus,

    @Column(name = "link_to_moodle", length = 1023)
    var linkToMoodle: String,

    @Column(name = "link_to_video", length = 1023)
    var linkToVideo: String,

    @OneToMany(
        mappedBy = "request",
        cascade = [CascadeType.PERSIST, CascadeType.MERGE],
        orphanRemoval = true,
        fetch = FetchType.LAZY,
    )
    val corrections: List<Correction>,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "requests_id_seq")
    @SequenceGenerator(name = "requests_id_seq", sequenceName = "requests_id_seq", allocationSize = 1)
    var id: Long = -1,
)
