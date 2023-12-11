package org.sejapoe.videomanager.model

import jakarta.persistence.*

@Entity
@Table(name = "refresh_tokens")
class RefreshToken(
    @OneToOne
    @JoinColumn(name = "user_id", nullable = false)
    var user: User,

    @Column(name = "token", nullable = false)
    var token: String,

    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "refresh_tokens_id_seq")
    @SequenceGenerator(name = "refresh_tokens_id_seq", sequenceName = "refresh_tokens_id_seq", allocationSize = 1)
    val id: Long = -1,
)