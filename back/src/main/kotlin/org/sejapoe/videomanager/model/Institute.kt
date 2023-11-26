package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "institutes")
class Institute(
    @Column(name = "name")
    var name: String,

    @OneToMany(
        mappedBy = "institute",
        cascade = [CascadeType.PERSIST, CascadeType.MERGE],
        orphanRemoval = true,
        fetch = FetchType.LAZY
    )
    @OrderBy("id asc")
    var departments: Set<Department> = emptySet(),

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "institutes_seq")
    @SequenceGenerator(name = "institutes_seq", sequenceName = "institutes_seq", allocationSize = 1)
    var id: Long = -1,
)