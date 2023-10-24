package org.sejapoe.videomanager.model

import jakarta.persistence.*
import java.util.*

@Entity
@Table(name = "user_activations")
class UserActivation(
    @Column(name = "uuid")
    var uuid: UUID,

    @OneToOne(cascade = [CascadeType.PERSIST, CascadeType.MERGE], fetch = FetchType.EAGER, orphanRemoval = false)
    @JoinColumn(name = "user_id")
    var user: User,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_activations_seq")
    @SequenceGenerator(name = "user_activations_seq", sequenceName = "user_activators_seq", allocationSize = 1)
    var id: Long = -1,
)