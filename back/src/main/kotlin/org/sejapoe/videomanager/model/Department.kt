package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "departments")
class Department(
    @Column(name = "name")
    var name: String,

    @ManyToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER)
    @JoinColumn(name = "institute_id")
    var institute: Institute,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "departments_id_seq")
    @SequenceGenerator(name = "departments_id_seq", sequenceName = "departments_id_seq", allocationSize = 1)
    var id: Long = -1,
)
