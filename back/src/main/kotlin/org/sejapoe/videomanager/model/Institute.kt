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
        fetch = FetchType.LAZY,
    )
    @OrderBy("id asc")
    var departments: List<Department> = emptyList(),

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "institutes_id_seq")
    @SequenceGenerator(name = "institutes_id_seq", sequenceName = "institutes_id_seq", allocationSize = 1)
    var id: Long = -1,
)
