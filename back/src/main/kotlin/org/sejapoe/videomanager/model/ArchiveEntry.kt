package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "archive_entries")
class ArchiveEntry(
    @Column(name = "name")
    var name: String,

    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    @JoinColumn(name = "lecturer_id")
    var lecturer: User,

    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    @JoinColumn(name = "institute_id")
    var institute: Institute,

    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    var department: Department,

    @Column(name = "link_to_video")
    val linkToVideo: String,

    @Column(name = "link_to_moodle")
    val linkToMoodle: String,

    @OneToOne(fetch = FetchType.LAZY, optional = true)
    @JoinColumn(name = "request_id", nullable = true)
    var request: Request?,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "archive_entries_id_seq")
    @SequenceGenerator(name = "archive_entries_id_seq", sequenceName = "archive_entries_id_seq", allocationSize = 1)
    val id: Long = -1,
)
